// 필수 패키지 설치:
//   npm i react-native-ble-plx buffer
// 설치 후 Android 네이티브 빌드 필요:
//   npx react-native run-android

import { BleManager, State } from 'react-native-ble-plx';
import { PermissionsAndroid, Platform } from 'react-native';
import { Buffer } from 'buffer';

// Android BLE only
// ESP32 BLE settings must match the Arduino sketch.
const DEVICE_NAME = 'BrailleESP32BLE';
const SERVICE_UUID = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';
const RX_CHARACTERISTIC_UUID = '6E400002-B5A3-F393-E0A9-E50E24DCCA9E'; // app -> ESP32 (write)
const TX_CHARACTERISTIC_UUID = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E'; // ESP32 -> app (notify)

const SCAN_TIMEOUT_MS = 10000;

const bleManager = new BleManager();

let connectedDevice = null;
let notifySubscription = null;
let isConnected = false;
let onReceiveCallback = null;

const getPayload = (data) => {
  if (data == null) {
    return '';
  }

  const normalized = String(data).replace(/[\r\n]/g, ' ');
  return normalized.length ? normalized[0] : '';
};

const encodeBase64 = (value) => Buffer.from(value, 'utf8').toString('base64');
const decodeBase64 = (value) => Buffer.from(value, 'base64').toString('utf8');

const waitForBluetoothPoweredOn = async () => {
  const currentState = await bleManager.state();
  if (currentState === State.PoweredOn) {
    return true;
  }

  return new Promise((resolve) => {
    const subscription = bleManager.onStateChange((nextState) => {
      if (nextState === State.PoweredOn) {
        subscription.remove();
        resolve(true);
      }
    }, true);

    setTimeout(() => {
      subscription.remove();
      resolve(false);
    }, 5000);
  });
};

const requestBLEPermissions = async () => {
  if (Platform.OS !== 'android') {
    return false;
  }

  if (Platform.Version >= 31) {
    const result = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ]);

    return (
      result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED &&
      result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED
    );
  }

  const locationResult = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  return locationResult === PermissionsAndroid.RESULTS.GRANTED;
};

const findDeviceByName = async (targetName = DEVICE_NAME) => {
  return new Promise((resolve, reject) => {
    let found = false;

    const timer = setTimeout(() => {
      bleManager.stopDeviceScan();
      if (!found) {
        reject(new Error(`BLE device not found: ${targetName}`));
      }
    }, SCAN_TIMEOUT_MS);

    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        clearTimeout(timer);
        bleManager.stopDeviceScan();
        reject(error);
        return;
      }

      if (!device) {
        return;
      }

      const matched = device.name === targetName || device.localName === targetName;
      if (!matched) {
        return;
      }

      found = true;
      clearTimeout(timer);
      bleManager.stopDeviceScan();
      resolve(device);
    });
  });
};

export const setBLEOnReceive = (callback) => {
  onReceiveCallback = typeof callback === 'function' ? callback : null;
};

export const connectBLE = async () => {
  console.log('connecting ble');

  try {
    if (Platform.OS !== 'android') {
      console.log('BLE connection helper is for Android only');
      isConnected = false;
      return false;
    }

    const hasPermission = await requestBLEPermissions();
    if (!hasPermission) {
      console.log('BLE permissions not granted');
      isConnected = false;
      return false;
    }

    const poweredOn = await waitForBluetoothPoweredOn();
    if (!poweredOn) {
      console.log('Bluetooth is off or unavailable');
      isConnected = false;
      return false;
    }

    if (notifySubscription) {
      notifySubscription.remove();
      notifySubscription = null;
    }

    if (connectedDevice) {
      try {
        await bleManager.cancelDeviceConnection(connectedDevice.id);
      } catch (e) {
        // ignore previous connection cleanup errors
      }
      connectedDevice = null;
    }

    const device = await findDeviceByName(DEVICE_NAME);
    const connected = await device.connect({ autoConnect: false });
    const discovered = await connected.discoverAllServicesAndCharacteristics();

    notifySubscription = discovered.monitorCharacteristicForService(
      SERVICE_UUID,
      TX_CHARACTERISTIC_UUID,
      (error, characteristic) => {
        if (error) {
          console.log('BLE notify error:', error);
          return;
        }

        if (!characteristic?.value) {
          return;
        }

        const message = decodeBase64(characteristic.value);
        console.log('ESP32 BLE:', message);

        if (onReceiveCallback) {
          onReceiveCallback(message);
        }
      },
    );

    connectedDevice = discovered;
    isConnected = true;
    return true;
  } catch (err) {
    console.log('BLE connect error:', err);
    isConnected = false;
    connectedDevice = null;
    return false;
  }
};

export const sendDataThroughBLE = async (data) => {
  console.log('sending data through ble');

  if (!connectedDevice || !isConnected) {
    return false;
  }

  const payload = getPayload(data);
  if (!payload.length) {
    return false;
  }

  try {
    const value = encodeBase64(`${payload}\n`);

    await connectedDevice.writeCharacteristicWithResponseForService(
      SERVICE_UUID,
      RX_CHARACTERISTIC_UUID,
      value,
    );

    return true;
  } catch (err) {
    console.log('BLE send error:', err);
    return false;
  }
};

export const sendRawThroughBLE = async (text) => {
  console.log('sending raw text through ble');

  if (!connectedDevice || !isConnected) {
    return false;
  }

  const value = String(text ?? '');
  if (!value.length) {
    return false;
  }

  try {
    await connectedDevice.writeCharacteristicWithResponseForService(
      SERVICE_UUID,
      RX_CHARACTERISTIC_UUID,
      encodeBase64(value.endsWith('\n') ? value : `${value}\n`),
    );

    return true;
  } catch (err) {
    console.log('BLE raw send error:', err);
    return false;
  }
};

export const disconnectBLE = async () => {
  console.log('disconnecting ble');

  try {
    if (notifySubscription) {
      notifySubscription.remove();
      notifySubscription = null;
    }

    if (connectedDevice) {
      await bleManager.cancelDeviceConnection(connectedDevice.id);
      connectedDevice = null;
    }
  } catch (err) {
    console.log('BLE disconnect error:', err);
  } finally {
    isConnected = false;
  }
};

export const getBLEConnectionStatus = () => isConnected;

export const getBLEDeviceName = () => DEVICE_NAME;
export const getBLEUUIDs = () => ({
  serviceUUID: SERVICE_UUID,
  rxCharacteristicUUID: RX_CHARACTERISTIC_UUID,
  txCharacteristicUUID: TX_CHARACTERISTIC_UUID,
});
