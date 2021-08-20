const express = require('express')
const compression = require('compression')

const requireHTTPS = (req, res, next) => {
    // The 'x-forwarded-proto' check is for Heroku
    (!req.secure
     && (req.get('x-forwarded-proto') !== 'https')
     && (!req.get('host').includes('localhost')))
        ? res.redirect(`https://${req.get('host')}${req.url}`)
        : next()
}

const app = express(),
    port = process.env.PORT || 5300

app.use(compression())

app.use(requireHTTPS)
app.use(express.static(`${__dirname}/dist`))

app.get('*', function (req, res) {
    res.sendFile(`${__dirname}/dist/index.html`)
})

const server = require('http').createServer(app)
server.listen(port)
console.log(`Listening on port ${port}`) // eslint-disable-line no-console
