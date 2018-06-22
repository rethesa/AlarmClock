 var SERVICE_UUID = "713d0000-503e-4c75-ba94-3148f18d941e";
 var CHAR_NUM_MOTORS = "713d0001-503e-4c75-ba94-3148f18d941e";
 var CHAR_MAX_UPDATE_FREQ = "713d0002-503e-4c75-ba94-3148f18d941e";
 var CHAR_WRITE_MOTORS = "713d0003-503e-4c75-ba94-3148f18d941e";

 var deviceID = 0;
 var vibrationIntensity = new Uint8Array(4);
 var found = false;

 function connect() {
     print("Start scanning...");
     ble.scan([], 5, function(device) {
         if (device.name === "TECO Wearable 5") {
             print("Device found: " + device.name);
             found = true;
             deviceID = device.id;
             ble.connect(device.id, function(event) {
                 found = true;
                 alert("start motor");
                 startMotor(1, 125);

             }, function(e) {
                 found = false;
                 print("BLE CON-ERROR: " + e.message);
             });
         }
     }, function() {
         found = false;
         print("Device not found");
         reconnectLoop();
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
     });
 }

 function reconnectLoop() {
     window.setTimeout(reconnectLoop, 6000);
     if (!found) {
         print("Trying reconnect");
         connect();
     }
 }

 function print(str) {
     if (str.trim() != "" && str.trim() != "CC-RT-BLE") {
         alert(str);
         console.log(str);
     }
 }


































/*var SERVICE_UUID = "713d0000-503e-4c75-ba94-3148f18d941e";
var CHAR_NUM_MOTORS = "713d0001-503e-4c75-ba94-3148f18d941e";
var CHAR_MAX_UPDATE_FREQ = "713d0002-503e-4c75-ba94-3148f18d941e";
var CHAR_WRITE_MOTORS = "713d0003-503e-4c75-ba94-3148f18d941e";

var deviceID = 0;

function connect() {
    console.log("Start scanning...");
    alert("Start scanning...");
    ble.scan([], 5, function(device) {
        alert(device.name);
        if (device.name === "TECO Wearable 5") {
            console.log("Device found!");
            alert("found");
            ble.connect(device.id, function(event) {
                console.log(event);


            }, function(e) {
                console.log("BLE CON-ERROR: " + e.message);
                alert("Connecting failed!");
            });
        }
    }, function() {
        console.log("Device not found");
        alert("Device not found!");
    });
}
connect(); 

//Service 
var SERVICE_UUID = "713d0000-503e-4c75-ba94-3148f18d941e"; 
//Characteristics of Service
var CHAR_NUM_MOTORS = "713d0001-503e-4c75-ba94-3148f18d941e"; //number of available motors (4)
var CHAR_MAX_UPDATE_FREQ = "713d0002-503e-4c75-ba94-3148f18d941e"; //update frequenz of motors
var CHAR_WRITE_MOTORS = "713d0003-503e-4c75-ba94-3148f18d941e"; //power mode of motors
//0x00 00 FF 00 00 schaltet nur den mittleren Motor an auf maximale Stärke

var peripheralId = 0;

document.addEventListener('deviceready', onDeviceReady, false);
console.log("funktioniert");

function scanAndConnect() {
    ble.isEnabled(bleEnabled, bleDisabled);
    console.log("scan and connect");
}

function bleEnabled() {
    ble.scan([], 5, function(device) {
        if(device.name == "TECO Wearable 5") {
            alert("Device found.");
            console.log("Device found.");
            ble.connect(device.id, connectSucces, connectFailure);
            alert("Device connected");
        }
    }, function() {
        console.log("Couldn't find device.");
        alert("Couldn't find device.");
    }); 
}

function bleDisabled() {
    alert("Please enable Bluetooth first.");
}

function connectSuccess(peripheral) {
    console.log("Connection successful.");
    alert("Connection successful.");
    peripheralId = peripheral.id;
    console.log("Peripheral ID: " + peripheralId);
}

function connectFailure(peripheral) {
    console.log("Connection failed.");
    alert("Connection failed.");
}


 
/*app.connectSuccess = function(peripheral) {
                console.log("Connected successfully!");
                peripheralId = peripheral.id;
                console.log("Peripheral ID: " + peripheralId);
           }
           app.bleEnabled = function() {
                logThis("Start scanning...");
                ble.scan([], 5, function(device) {
                     console.log(device.name);

                     if (device.name === "TECO Wearable 5") {
                          console.log("Device found!");
                          ble.connect(device.id, app.connectSuccess, function(e) {
                               console.log("BLE CON-ERROR: " + e.message);
                               alert("Connecting failed!");
                          });
                          //window.addEventListener('deviceorientation', app.headingWatch, false);
                          //console.log("Re-enabled listener for orientation!");
                     }
                }, function() {
                     alert("Device not found!");
                });
           }
           app.bleDisabled = function() {
                alert("Please enable bluetooth first!");
                ble.enable();
           }
           app.bleButton = function(opt_options) {
                var options = opt_options || {}
                var button = document.createElement("button");
                button.innerHTML = "B";
                var this_ = this;
                var functionToBeTriggered = function() {
                     console.log("BLE button pressed!");
                     ble.isConnected(peripheralId, function() {
                          console.log("disconnecting...");
                          ble.disconnect(peripheralId, function() {
                               console.log("disconnected!");
                          }, function() {
                               console.log("disconnecting failed!");
                          });
                     }, function() {
                          ble.isEnabled(app.bleEnabled, app.bleDisabled);
                     })
                }
                button.addEventListener("click", functionToBeTriggered, false);
                var element = document.createElement("div");
                element.className = "ble-scan ol-unselectable ol-control";

                element.appendChild(button);
                ol.control.Control.call(this, {
                     element: element,
                     target: options.target
                });
           } */
