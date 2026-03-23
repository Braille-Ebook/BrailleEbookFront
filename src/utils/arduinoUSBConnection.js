import {
    UsbSerialManager,
    Parity,
} from 'react-native-usb-serialport-for-android';

//안드로이드 기기에만 가능
let port = null;
let listener = null;
let isConnected = false;

const USB_BAUD_RATE = 9600;

const getPayload = (data) => {
    if (data == null) {
        return '';
    }

    const normalized = String(data).replace(/[\r\n]/g, ' ');
    return normalized.length ? normalized[0] : '';
};

export const connectUSB = async () => {
    console.log('connecting usb');
    try {
        const devices = await UsbSerialManager.list();
        if (!devices.length) {
            isConnected = false;
            return false;
        }

        const device = devices[0];

        await UsbSerialManager.tryRequestPermission(device.deviceId);

        if (listener) {
            listener.remove();
            listener = null;
        }

        port = await UsbSerialManager.open(device.deviceId, {
            baudRate: USB_BAUD_RATE,
            parity: Parity.None,
            dataBits: 8,
            stopBits: 1,
        });

        listener = port.onReceived((event) => {
            console.log('Arduino:', event.data);
        });
        isConnected = true;
        return true;
    } catch (err) {
        console.log(err);
        isConnected = false;
        return false;
    }
};

export const sendDataThroughUSB = async (data) => {
    console.log('sending data through usb');
    if (!port || !isConnected) return false;

    const payload = getPayload(data);
    if (!payload.length) {
        return false;
    }

    await port.send(`${payload}\n`);
    return true;
};

export const disconnectUSB = () => {
    console.log('disconnecting usb');
    if (listener) {
        listener.remove();
        listener = null;
    }
    if (port) {
        port.close();
        port = null;
    }
    isConnected = false;
};

export const getUSBConnectionStatus = () => isConnected;
            