function init () {
    const { clipboard } = require('electron')
    const url = document.getElementById('url')

    url.value = clipboard.readText('clipboard')
}

init()

for (let element of document.getElementsByClassName('submit')) {
    element.onclick = async () => {
        const { shell } = require('electron')

        const fs = require('fs')
        const youtubedl = require('youtube-dl')

        const status = document.getElementById('status')
        const url = document.getElementById('url').value

        if (url.includes('youtube.com')) {
            status.innerHTML = 'Loading...'
           
            const filename = `${new Date().getTime()}.mp4`
            const path = `/Users/corentin/Downloads/${filename}`

            const video = youtubedl(url, ['--format=18'], { cwd: __dirname })

            video.on('info', () => {
                status.innerHTML = 'Downloading...'
            })

            video.on('end', () => {
                status.innerHTML = 'Downloaded 🎉'
                shell.openPath(path)
            })
            
            video.pipe(fs.createWriteStream(path))
        } else {
            status.innerHTML = 'Invalid address'
        }
    }
}