var SERVICE_UUID = "713d0000-503e-4c75-ba94-3148f18d941e";
var CHAR_NUM_MOTORS = "713d0001-503e-4c75-ba94-3148f18d941e";
var CHAR_MAX_UPDATE_FREQ = "713d0002-503e-4c75-ba94-3148f18d941e";
var CHAR_WRITE_MOTORS = "713d0003-503e-4c75-ba94-3148f18d941e";

var deviceID = 0;
var vibrationIntensity = new Uint8Array(4);
var found = false;
var okPressed = false;

function connect() {
    print("Start scanning...");
    ble.scan([], 5, function(device) {
        if (device.name === "TECO Wearable 5") {
            print("Device found: " + device.name); 
            deviceID = device.id;
            ble.connect(device.id, function(event) {
                found = true; 
                console.log("Connected");
            }, function(e) {
                found = false;
                print("BLE CON-ERROR: " + e.message);
                alert("Connecting failed!");
            });
        }
    }, function() {
        found = false;
        print("Device not found");
    });
}

function startAllMotors(intensity) {
    ble.isConnected(deviceID, function() {
        print("connected, beginning to write data...");
        vibrationIntensity[0] = intensity;
        vibrationIntensity[1] = intensity;
        vibrationIntensity[2] = intensity;
        vibrationIntensity[3] = intensity;
        ble.writeWithoutResponse(deviceID, SERVICE_UUID, CHAR_WRITE_MOTORS, vibrationIntensity.buffer,
            function() {
                print("write success!");
        console.log(vibrationIntensity);
            },
            function() {
                print("write failure!");
            });
    }, function() {
        print("Could not write, not connected!");
    found = false;
    });
 
}

function startMotor(motorIndex, intensity) {
    ble.isConnected(deviceID, function() {
        print("connected, beginning to write data...");
        vibrationIntensity[motorIndex] = intensity;
        ble.writeWithoutResponse(deviceID, SERVICE_UUID, CHAR_WRITE_MOTORS, vibrationIntensity.buffer,
            function() {
                print("write success!");
            },
            function() {
                print("write failure!");
            });
    }, function() {
        print("Could not write, not connected!");
    found = false;
    });
}

function reconnectLoop() {
   ble.isConnected(deviceID, function() {
              print("Still connected");
        }, function() {
           print("Not connected!");
       connect();
        }); 
}

function print(str) {
    if (str && str.trim() != "" && str.trim()) { 
        document.getElementById("debug").innerHTML = "<p style='margin: 0 auto'>" + str + "</p>" + document.getElementById("debug").innerHTML;
        console.log(str);
    }
}
window.setInterval(reconnectLoop, 5000);
connect();

function showPopup() {
    //document.getElementsByTagName("body")[0].style.background = "#454545";
    document.querySelector(".alert").style.display = "block";
    document.querySelector("#popupText").innerHTML = "ALARM RINGS!!! <br/> Press OK to stop.";
}

function hidePopup() {               
    document.querySelector(".alert").style.display = "none";
}

function popupButtonPressed() {
    hidePopup();
    okPressed = true;
}

function startVibrationMode() {
    print("startVibrationMode");
    //alert("ALARM IS RINGING. Press OK to stop");
    showPopup();
    print("show popup");

    print("start mode 1");
    vibrationMode(100, 2000, 5, 4000); 
    setTimeout(function() {
        if (!okPressed) {
            print("start mode 2");
            vibrationMode(150, 1500, 7, 3000)}
        }, 20000 );  
    setTimeout(function() {
        if (!okPressed) {
            print("start mode 3");
            vibrationMode(200, 1000, 10, 2000)}
        }, 41000);
    setTimeout(function() {
        if (!okPressed) {
            print("start mode 4");
            vibrationMode(250, 500, 13, 1000)}
    }, 61000);
    okPressed = false;
}

function vibrationMode(intensity, pauseTime, maxRounds, repeatTime) {
    var rounds = 0;
    var mode = setInterval(function(){
        rounds++;
        if (rounds >= maxRounds || okPressed) {
            clearInterval(mode);
            startAllMotors(0);
        } else {
            startAllMotors(intensity);
            setTimeout(function() {
            startAllMotors(0);
            }, pauseTime);
        }
    }, repeatTime);
}


