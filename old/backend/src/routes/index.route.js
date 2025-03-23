const express = require("express");
const bcrypt = require("bcrypt");
const indexRouter = express.Router();
const User = require("../models/user.model");

indexRouter.get("/getRegisteredUser", async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(`Got the email: ${email} to find`);
    try {
        const user = await User.findOne({ email: email });
        console.log("user", user.password);

        validateUser(user, password, user.password, res);
    } catch (err) {
        res.status(500).json({
            message: `User ${user.email}'s auth info is incorrect`,
        });
    }
});

indexRouter.post("/registerNewUser", async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });
    await newUser
        .save()
        .then(data => {
            delete data["password"];
            res.status(200).json({
                message: "New user registered",
            });
            console.log("New user registered" + data);
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to register the new user",
            });
            console.log(err);
        });
});

function validateUser(user, enteredPassword, dbPasswordHash, res) {
    bcrypt
        .compare(enteredPassword, dbPasswordHash)
        .then(userExists => {
            if (userExists) {
                console.log(userExists, "User exists in the collection.");
                res.status(200).json({
                    status: true,
                    user: user,
                });
            } else {
                res.status(500).json({
                    message: `User ${user.email}'s auth info is incorrect`,
                });
            }
        })
        .catch(err => {
            console.error(err.message);
        });
}

module.exports = indexRouter;
