const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const storage = require('electron-storage');
const remote = require('electron').remote;
const fs = require('fs');
const loadJsonFile = require('load-json-file');
var mainWindow = null;

app.on('window-all-closed', function() {

  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {

  mainWindow = new BrowserWindow({width: 395, height: 465});

  mainWindow.loadURL('file://' + __dirname + '/index.html');
mainWindow.webContents.openDevTools();
    
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

ipcMain.on('operator', (event, arg) => {  
    // Print 1
    console.log(arg.operation + '|' + arg.dataA + '|' + arg.dataB);
    // Reply on async message from renderer process
    if(arg.operation != null){
        if(arg.operation == "plus"){
             event.returnValue = parseFloat(arg.dataA) +parseFloat(arg.dataB);
        }
        
         if(arg.operation == "minus"){
             event.returnValue = parseFloat(arg.dataA) - parseFloat(arg.dataB);
        }
        
         if(arg.operation == "multiply"){
             event.returnValue = parseFloat(arg.dataA) * parseFloat(arg.dataB);
        }
        
         if(arg.operation == "divide"){
             event.returnValue = parseFloat(arg.dataA) / parseFloat(arg.dataB);
        }
        
         if(arg.operation == "pow"){
             
             event.returnValue = Math.pow(arg.dataA,arg.dataB)
        }
    }
    // event.sender.send('operator-reply', 'pong')
});


