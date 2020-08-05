const { app, BrowserWindow } = require('electron')

const fs = require('fs')

function init () {
    const width = 750
    const heigth = 500

    const window = new BrowserWindow({
        width: width,
        height: heigth,
        minWidth: width,
        minHeight: heigth,
        webPreferences: {
            nodeIntegration: true
        }
    })
    
    window.loadFile('./index.html')

    fs.writeFileSync(`${__dirname}/directory.txt`, app.getPath('downloads'))
}

app.whenReady().then(init)