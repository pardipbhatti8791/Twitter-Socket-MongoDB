const express = require('express')
const middleware = require('./middleware')
const app = express()
const port = 3003

const server = app.listen(port, () => console.log(`Server listening on port ${port}`))

app.set("view engine", "pug")
app.set("views", "views")

// Routes
const loginRoute = require('./routes/loginRoute')

app.use("/login", loginRoute)

app.get("/", middleware.requireLogin, (req, res, next) => {
    const payload = {
        pageTitle: "Home"
    }
    res.status(200).render("home", payload)
})

