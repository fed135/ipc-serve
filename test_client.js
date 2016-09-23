const Kalm = require('kalm');

var client = new Kalm.Client({
    port: 6000,
    adapter: 'ipc',
    encoder: 'json',
    channels: {
        attitudeChange: function(data) {
            console.log('Changed rotation to ', data);
        }
    }
});

client.sendNow('attitudeChange', {"pitch": 3.24, "yaw": 0, "roll": 90});

// ["channel_name", [{"pitch": 3.24, "yaw": 0, "roll": 90}]]