
#include <Arduino.h>
#include <string.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

// =====================================================
// ESP32 BLE Braille Display
// - Based on the user's original braille conversion logic
// - Input: BLE write to RX characteristic, line-based (\n)
// - Output: braille modules + BLE notify response
//
// Device name: BrailleESP32BLE
// Service UUID: 6E400001-B5A3-F393-E0A9-E50E24DCCA9E
// RX UUID     : 6E400002-B5A3-F393-E0A9-E50E24DCCA9E  (WRITE)
// TX UUID     : 6E400003-B5A3-F393-E0A9-E50E24DCCA9E  (NOTIFY)
//
// Recommended app payload examples:
//   가\n
//   A\n
//   <PING>\n
//   <CLR>\n
//
// App note:
// - React Native app sends "one highlighted character + \\n"
// - Arduino/ESP32 reads a full line and processes it
// - Serial monitor may send multiple characters in one line
// =====================================================

static const int dataPin  = 23;
static const int latchPin = 22;
static const int clockPin = 21;
static const int no_module = 3;

static const char* DEVICE_NAME = "BrailleESP32BLE";
static BLEUUID SERVICE_UUID("6E400001-B5A3-F393-E0A9-E50E24DCCA9E");
static BLEUUID RX_UUID("6E400002-B5A3-F393-E0A9-E50E24DCCA9E");
static BLEUUID TX_UUID("6E400003-B5A3-F393-E0A9-E50E24DCCA9E");

BLEServer* pServer = nullptr;
BLECharacteristic* pTxCharacteristic = nullptr;
bool bleDeviceConnected = false;
bool bleOldDeviceConnected = false;

String bleInputBuffer = "";
bool lineReady = false;
char string_buffer[100];
char pending_line[100];
char string_buffer_serial[100][4];
int str_char_count = 0;

#define MAX_BRAILLE_NO 10

class braille {
  public:
    uint8_t data[MAX_BRAILLE_NO];
    braille(int data_pin, int latch_pin, int clock_pin, int no);
    void begin();
    void on(int no, int index);
    void off(int no, int index);
    void refresh();
    void all_off();

  private:
    int braille_no;
    int _dataPin;
    int _latchPin;
    int _clockPin;
};

braille::braille(int data_pin, int latch_pin, int clock_pin, int no) {
  _dataPin = data_pin;
  _latchPin = latch_pin;
  _clockPin = clock_pin;
  braille_no = no;
}

void braille::begin() {
  pinMode(_dataPin, OUTPUT);
  pinMode(_latchPin, OUTPUT);
  pinMode(_clockPin, OUTPUT);
  all_off();
  refresh();
}

void braille::on(int no, int index) {
  if (no < 0 || no >= braille_no || index < 0 || index > 7) return;
  data[braille_no - no - 1] = data[braille_no - no - 1] | (0b00000001 << index);
}

void braille::off(int no, int index) {
  if (no < 0 || no >= braille_no || index < 0 || index > 7) return;
  data[braille_no - no - 1] = data[braille_no - no - 1] & ~(0b00000001 << index);
}

void braille::refresh() {
  digitalWrite(_latchPin, LOW);
  for (int i = 0; i < braille_no; i++) {
    shiftOut(_dataPin, _clockPin, LSBFIRST, data[i]);
  }
  digitalWrite(_latchPin, HIGH);
}

void braille::all_off() {
  for (int i = 0; i < MAX_BRAILLE_NO; i++) data[i] = 0b00000000;
}

braille bra(dataPin, latchPin, clockPin, no_module);

unsigned char get_char_byte(char *pos);
void clear_serial_char_buffer();
void ascii_braille(int code);
void split_han_cho_jung_jong(char byte1, char byte2, char byte3, unsigned int &cho, unsigned int &jung, unsigned int &jong);
void han_braille(int index1, int index2, int index3);
void process_line(const char* line);
void sendBleResponse(const String& msg);
void clear_display();

void clear_serial_char_buffer() {
  for (int i = 0; i < 100; i++) {
    string_buffer_serial[i][0] = 0;
    string_buffer_serial[i][1] = 0;
    string_buffer_serial[i][2] = 0;
    string_buffer_serial[i][3] = 0;
  }
}

void clear_display() {
  bra.all_off();
  bra.refresh();
}

void sendBleResponse(const String& msg) {
  Serial.println(msg);
  if (bleDeviceConnected && pTxCharacteristic != nullptr) {
    pTxCharacteristic->setValue((uint8_t*)msg.c_str(), msg.length());
    pTxCharacteristic->notify();
  }
}

byte hangul_cho[19] = {
  0b00010000,0b00010000,0b00110000,0b00011000,0b00011000,0b00000100,0b00100100,0b00010100,0b00010100,0b00000001,0b00000001,0b00111100,0b00010001,0b00010001,0b00000101,0b00111000,0b00101100,0b00110100,0b00011100
};
byte hangul2_cho[19] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18};

byte hangul_jung[21] = {
  0b00101001,0b00101110,0b00010110,0b00010110,0b00011010,0b00110110,0b00100101,0b00010010,0b00100011,0b00101011,0b00101011,0b00110111,0b00010011,0b00110010,0b00111010,0b00111010,0b00110010,0b00110001,0b00011001,0b00011101,0b00100110
};
byte hangul2_jung[21] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20};

byte hangul_jong[28] = {
  0b00000000,0b00100000,0b00100000,0b00100000,0b00001100,0b00001100,0b00001100,0b00000110,0b00001000,0b00001000,0b00001000,0b00001000,0b00001000,0b00001000,0b00001000,0b00001000,0b00001001,0b00101000,0b00101000,0b00000010,0b00000010,0b00001111,0b00100010,0b00001010,0b00001110,0b00001011,0b00001101,0b00000111
};
byte hangul2_jong[28] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27};

byte ascii_data[127] = {
  0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,
  0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,
  0b00000000,0b00001110,0b00001011,0b00000000,0b00000000,0b00010010,0b00000000,0b00000000,0b00001011,0b00000001,0b00100001,0b00001001,0b00000100,0b00000110,0b00001101,0b00010101,
  0b00011100,0b00100000,0b00101000,0b00110000,0b00110100,0b00100100,0b00111000,0b00111100,0b00101100,0b00011000,0b00000100,0b00000101,0b00000100,0b00001100,0b00000111,0b00001011,
  0b00000000,0b00100000,0b00101000,0b00110000,0b00110100,0b00100100,0b00111000,0b00111100,0b00101100,0b00011000,0b00011100,0b00100010,0b00101010,0b00110010,0b00110110,0b00100110,
  0b00111010,0b00111110,0b00101110,0b00011010,0b00011110,0b00100011,0b00101011,0b00011101,0b00110011,0b00110111,0b00100111,0b00001011,0b00010000,0b00000101,0b00000000,0b00000011,
  0b00000000,0b00100000,0b00101000,0b00110000,0b00110100,0b00100100,0b00111000,0b00111100,0b00101100,0b00011000,0b00011100,0b00100010,0b00101010,0b00110010,0b00110110,0b00100110,
  0b00111010,0b00111110,0b00101110,0b00011010,0b00011110,0b00100011,0b00101011,0b00011101,0b00110011,0b00110111,0b00100111,0b00001011,0b00000000,0b00000100,0b00000000
};

class ServerCallbacks : public BLEServerCallbacks {
  void onConnect(BLEServer* server) override {
    bleDeviceConnected = true;
    Serial.println("BLE connected");
  }
  void onDisconnect(BLEServer* server) override {
    bleDeviceConnected = false;
    Serial.println("BLE disconnected");
  }
};

class RxCallbacks : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic* pCharacteristic) override {
    String rxValue = pCharacteristic->getValue();
    if (rxValue.length() == 0) return;

    for (int i = 0; i  < rxValue.length(); i++) {
      char c = (char)rxValue[i];
      if (c == '\r') continue;
      if (c == '\n') {
        if (!lineReady && bleInputBuffer.length() > 0) {
          bleInputBuffer.toCharArray(pending_line, sizeof(pending_line));
          lineReady = true;
        }
        bleInputBuffer = "";
      } else {
        if (bleInputBuffer.length() < (int)sizeof(pending_line) - 1) bleInputBuffer += c;
      }
    }

    if (!lineReady && bleInputBuffer.length() > 0) {
      if (bleInputBuffer.length() == 1 || bleInputBuffer.length() == 3 ||
          bleInputBuffer == "<PING>" || bleInputBuffer == "<CLR>") {
        bleInputBuffer.toCharArray(pending_line, sizeof(pending_line));
        lineReady = true;
        bleInputBuffer = "";
      }
    }
  }
};

void setup() {
  Serial.begin(115200);
  delay(1000);

  bra.begin();
  clear_display();

  BLEDevice::init(DEVICE_NAME);
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new ServerCallbacks());

  BLEService* pService = pServer->createService(SERVICE_UUID);

  pTxCharacteristic = pService->createCharacteristic(TX_UUID, BLECharacteristic::PROPERTY_NOTIFY);
  pTxCharacteristic->addDescriptor(new BLE2902());

  BLECharacteristic* pRxCharacteristic = pService->createCharacteristic(
    RX_UUID, BLECharacteristic::PROPERTY_WRITE | BLECharacteristic::PROPERTY_WRITE_NR
  );
  pRxCharacteristic->setCallbacks(new RxCallbacks());

  pService->start();

  BLEAdvertising* pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();

  Serial.println("ESP32 BLE Braille ready");
  Serial.print("Device name: ");
  Serial.println(DEVICE_NAME);
}

void loop() {
  if (!bleDeviceConnected && bleOldDeviceConnected) {
    delay(300);
    pServer->startAdvertising();
    Serial.println("BLE advertising restarted");
    bleOldDeviceConnected = bleDeviceConnected;
  }

  if (bleDeviceConnected && !bleOldDeviceConnected) bleOldDeviceConnected = bleDeviceConnected;

  if (lineReady) {
    strncpy(string_buffer, pending_line, sizeof(string_buffer) - 1);
    string_buffer[sizeof(string_buffer) - 1] = 0;
    pending_line[0] = 0;
    lineReady = false;

    process_line(string_buffer);
    string_buffer[0] = 0;
  }

  delay(5);
}

void process_line(const char* line) {
  if (line == nullptr || line[0] == 0) return;

  if (strcmp(line, "<PING>") == 0) {
    sendBleResponse("PONG");
    return;
  }

  if (strcmp(line, "<CLR>") == 0) {
    clear_display();
    sendBleResponse("OK:CLEARED");
    return;
  }

  static char last_line[100] = {0};
  strncpy(string_buffer, line, sizeof(string_buffer) - 1);
  string_buffer[sizeof(string_buffer) - 1] = 0;

  {
    int new_len = strlen(string_buffer);
    int old_len = strlen(last_line);
    if (old_len > new_len && new_len > 0 && new_len <= 3 &&
        strncmp(string_buffer, last_line + old_len - new_len, new_len) == 0) {
      return;
    }
  }

  strncpy(last_line, string_buffer, sizeof(last_line) - 1);
  last_line[sizeof(last_line) - 1] = 0;

  clear_serial_char_buffer();
  str_char_count = 0;

  {
    int ind = 0;
    int len = strlen(string_buffer);
    int index = 0;

    while (ind < len && index < 100) {
      int bytes = get_char_byte(string_buffer + ind);

      if (bytes == 1) {
        string_buffer_serial[index][0] = *(string_buffer + ind);
        string_buffer_serial[index][1] = 0;
        string_buffer_serial[index][2] = 0;
        string_buffer_serial[index][3] = 0;
        index++;
      } else if (bytes == 3 && (ind + 2) < len) {
        string_buffer_serial[index][0] = *(string_buffer + ind);
        string_buffer_serial[index][1] = *(string_buffer + ind + 1);
        string_buffer_serial[index][2] = *(string_buffer + ind + 2);
        string_buffer_serial[index][3] = 0;
        index++;
      }

      ind += bytes;
    }

    str_char_count = index;
  }

  if (str_char_count == 0) {
    sendBleResponse("ERR:EMPTY_OR_UNSUPPORTED");
    return;
  }

  for (int i = 0; i < str_char_count; i++) {
    bool isLast = (i == str_char_count - 1);

    if (string_buffer_serial[i][1] == 0) {
      int code = (unsigned char)string_buffer_serial[i][0];
      ascii_braille(code);

      Serial.print("출력하는 텍스트: ");
      Serial.print((char)code);
      Serial.print(" : ASCII 코드=");
      Serial.println(code);

      if (!isLast) delay(350);
    } else {
      unsigned int cho, jung, jong;

      split_han_cho_jung_jong(
        string_buffer_serial[i][0],
        string_buffer_serial[i][1],
        string_buffer_serial[i][2],
        cho, jung, jong
      );

      han_braille(cho, jung, jong);

      char output_text[4];
      output_text[0] = string_buffer_serial[i][0];
      output_text[1] = string_buffer_serial[i][1];
      output_text[2] = string_buffer_serial[i][2];
      output_text[3] = 0;

      Serial.print("출력하는 텍스트: ");
      Serial.print(output_text);
      Serial.print(" : 초성코드=");
      Serial.print(cho);
      Serial.print(", 중성코드=");
      Serial.print(jung);
      Serial.print(", 종성코드=");
      Serial.print(jong);
      Serial.print(" | UTF-8=");
      Serial.print((unsigned char)string_buffer_serial[i][0], DEC);
      Serial.print(",");
      Serial.print((unsigned char)string_buffer_serial[i][1], DEC);
      Serial.print(",");
      Serial.println((unsigned char)string_buffer_serial[i][2], DEC);

      if (!isLast) delay(350);
    }
  }

  sendBleResponse("OK");
}

unsigned char get_char_byte(char *pos) {
  unsigned char val = (unsigned char)(*pos);
  if ((val & 0b10000000) == 0) return 1;
  else if ((val & 0b11100000) == 0b11000000) return 2;
  else if ((val & 0b11110000) == 0b11100000) return 3;
  else if ((val & 0b11111000) == 0b11110000) return 4;
  else if ((val & 0b11111100) == 0b11111000) return 5;
  else return 6;
}

void ascii_braille(int code) {
  bra.all_off();
  if (code < 0 || code > 126) {
    bra.refresh();
    return;
  }

  for (int i = 0; i < 6; i++) {
    int on_off = (ascii_data[code] >> (5 - i)) & 0b00000001;
    if (on_off != 0) bra.on(0, i);
    else bra.off(0, i);
  }

  for (int i = 0; i < 6; i++) {
    bra.off(1, i);
    bra.off(2, i);
  }

  bra.refresh();
}

void split_han_cho_jung_jong(char byte1, char byte2, char byte3, unsigned int &cho, unsigned int &jung, unsigned int &jong) {
  unsigned int utf16 =
      (((unsigned char)byte1 & 0b00001111) << 12) |
      (((unsigned char)byte2 & 0b00111111) << 6) |
      ((unsigned char)byte3 & 0b00111111);

  if (utf16 < 0xAC00 || utf16 > 0xD7A3) {
    cho = 0;
    jung = 0;
    jong = 0;
    return;
  }

  unsigned int val = utf16 - 0xAC00;

  unsigned char _jong = val % 28;
  unsigned char _jung = (val % (28 * 21)) / 28;
  unsigned char _cho  = val / (28 * 21);

  cho = 0;
  for (int i = 0; i < 19; i++) if (_cho == hangul2_cho[i]) { cho = i; break; }

  jung = 0;
  for (int i = 0; i < 21; i++) if (_jung == hangul2_jung[i]) { jung = i; break; }

  jong = 0;
  for (int i = 0; i < 28; i++) if (_jong == hangul2_jong[i]) { jong = i; break; }
}

void han_braille(int index1, int index2, int index3) {
  bra.all_off();

  for (int i = 0; i < 6; i++) {
    int on_off = (hangul_cho[index1] >> (5 - i)) & 0b00000001;
    if (on_off != 0) bra.on(0, i);
    else bra.off(0, i);
  }

  for (int i = 0; i < 6; i++) {
    int on_off = (hangul_jung[index2] >> (5 - i)) & 0b00000001;
    if (on_off != 0) bra.on(1, i);
    else bra.off(1, i);
  }

  for (int i = 0; i < 6; i++) {
    int on_off = (hangul_jong[index3] >> (5 - i)) & 0b00000001;
    if (on_off != 0) bra.on(2, i);
    else bra.off(2, i);
  }

  bra.refresh();
}
