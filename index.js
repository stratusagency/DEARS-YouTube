const { app, BrowserWindow, clipboard } = require('electron')

const fs = require('fs')
const ytdl = require('ytdl-core')

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

    /*
    const url = clipboard.readText('clipboard')

    if (url.includes('youtube.com')) {
        ytdl(url).pipe(fs.createWriteStream(`${app.getPath('downloads')}/${new Date().getTime()}.mp4`))
    } else {
        app.quit()
    }
    */
    
    window.loadFile('./index.html')
}

app.whenReady().then(init)