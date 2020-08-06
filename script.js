async function init () {
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

            // Download
           
            const filename = `${new Date().getTime()}.mp4`
            const directory = fs.readFileSync(`${__dirname}/directory.txt`)
            const path = `${directory}/${filename}`

            const video = youtubedl(url, ['--format=18'], { cwd: __dirname })

            video.on('info', async (e) => {
                status.innerHTML = 'Downloading...'

                const div = document.getElementById('informations')

                const jsonURL = `http://www.youtube.com/oembed?url=${url}&format=json`
                const jsonFetch = await fetch(jsonURL)
                const jsonFinal = await jsonFetch.json()

                const thumbnail = document.createElement('img')

                thumbnail.src = jsonFinal.thumbnail_url
                thumbnail.width = jsonFinal.thumbnail_width / 2
                thumbnail.height = jsonFinal.thumbnail_height / 2

                const title = document.createElement('p')
                const author = document.createElement('span')

                title.innerHTML = jsonFinal.title
                author.innerHTML = jsonFinal.author_name

                div.appendChild(thumbnail)
                div.appendChild(title)
                div.appendChild(author)
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