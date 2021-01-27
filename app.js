const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const middleware = require('./middleware')
const app = express()
const port = 3003

const server = app.listen(port, () => console.log(`Server listening on port ${port}`))

app.set("view engine", "pug")
app.set("views", "views")
app.use(express.static(path.join(__dirname, "public"), ))
app.use(bodyParser.urlencoded({
    extended: false
}))

// Routes
const loginRoute = require('./routes/loginRoute')
const registerRoute = require('./routes/registerRoute')

app.use("/login", loginRoute)
app.use("/register", registerRoute)

app.get("/", middleware.requireLogin, (req, res, next) => {
    const payload = {
        pageTitle: "Home"
    }
    res.status(200).render("home", payload)
})

