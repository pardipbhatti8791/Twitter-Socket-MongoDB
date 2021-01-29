const express = require('express')
const bcrypt = require("bcrypt")
const User = require("../schema/UserSchema")
const app = express()
const router = express.Router()

app.set("view engine", "pug")
app.set("views", "views")

router.get("/", (req, res, next) => {
    res.status(200).render("login")
})

router.post("/", async (req, res, next) => {

    const payload = req.body

    if(req.body.logUsername && req.body.logPassword) {
        var user = await User.findOne({
            $or: [
                { username: req.body.logUsername },
                { email: req.body.logPassword }
            ]
        })
            .catch((error) => {
                console.log(error);
                payload.errorMessage = "Something went wrong.";
                res.status(200).render("login", payload);
            });

        if(user !== null) {
            const result = await bcrypt.compare(req.body.logPassword, user.password)
            if(result === true) {
                req.session.user = user
                return res.redirect("/")
            }

            payload.errorMessage = "Invalid credentials.";
            return res.status(200).render("login", payload);
        }
    }

    payload.errorMessage = "Invalid credentials.";
    res.status(200).render("login", payload);
})

module.exports = router

