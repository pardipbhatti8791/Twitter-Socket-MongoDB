const colors = require("colors")
const displayContent = (req, res) => {
    const url = req.url
    const method = req.method

    if(url == "/profile") {
        console.log("Hello Gugu Pari ".green)
        res.setHeader('Content-Type', 'text/html')
        res.write('<h1>This is profile page</h1>')
        return res.end()
    } else if(url === "/") {
        res.setHeader('Content-Type', 'text/html')
        res.write('<h1>Gugu Meri</h1>')
        return res.end()
    }

    res.setHeader('Content-Type', 'text/html')
    res.write('<h1>Page not found</h1>')
    return res.end()
}

module.exports = displayContent
