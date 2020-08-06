const { app, BrowserWindow } = require('electron')

const fs = require('fs')

async function init () {
    const width = 850
    const heigth = 550

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