const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const middleware = require('./middleware')
const mongoose = require("./database")
const app = express()
const port = 3003



const server = app.listen(port, () => console.log(`Server listening on port ${port}`))

app.set("view engine", "pug")
app.set("views", "views")
app.use(express.static(path.join(__dirname, "public"), ))
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(session({
    secret: "bbq chips",
    resave: true,
    saveUninitialized: false
}))

// Routes
const loginRoute = require('./routes/loginRoute')
const registerRoute = require('./routes/registerRoute')

app.use("/login", loginRoute)
app.use("/register", registerRoute)

app.get("/", middleware.requireLogin, (req, res, next) => {
    const payload = {
        pageTitle: "Home",
        userLoggedIn:  req.session.user
    }
    return res.status(200).render("home", payload)
})

