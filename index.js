/**
 * IPC Server for communicating with the arduino
 */

'use strict';

/* Requires ------------------------------------------------------------------*/

const Kalm = require('kalm');
const SerialPort = require('serialport');

/* Arguments -----------------------------------------------------------------*/

const serial_port_path = process.argv[2] || '/dev/tty-usbserial1';
console.log('serial_port_path:', serial_port_path);

/* Init ----------------------------------------------------------------------*/

var port = new SerialPort(serial_port_path, {
  baudRate: 57600
});

var server = new Kalm.Server({
    port: 6000,
    adapter: 'ipc',
    encoder: 'json',
    channels: {
        attitudeChange: function(data) {
            console.log('Changed rotation to ', data);
            port.write('' + data.pitch + ',' + data.yaw + ',' + data.roll + '|');
            // front_end.broadcast(data);
        }
    }
});

// ["channel_name", [{"pitch": 3.24, "yaw": 0, "roll": 90}]]