import {
    UsbSerialManager,
    Parity,
    Codes,
} from 'react-native-usb-serialport-for-android';

//안드로이드 기기에만 가능
let port = null;
let listener = null;

export const connectUSB = async () => {
    console.log('connecting usb');
    try {
        const devices = await UsbSerialManager.list();
        if (!devices.length) return;

        const device = devices[0];

        await UsbSerialManager.tryRequestPermission(device.deviceId);

        port = await UsbSerialManager.open(device.deviceId, {
            baudRate: 38400,
            parity: Parity.None,
            dataBits: 8,
            stopBits: 1,
        });

        listener = port.onReceived((event) => {
            console.log('Arduino:', event.data);
        });
    } catch (err) {
        console.log(err);
    }
};

export const sendDataThroughUSB = async (data) => {
    console.log('sending data through usb');
    if (!port) return;

    await port.send(`${data}`);
};

export const disconnectUSB = () => {
    console.log('disconnecting usb');
    if (listener) listener.remove();
    if (port) port.close();
};
