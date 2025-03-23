require("dotenv").config();
const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/index.route.js");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = 3200;
const mongoDB = `mongodb+srv://${process.env.MONGO_DB_URL_USERNAME}:${process.env.MONGO_DB_URL_PASSWORD}@drug-blockchain.9n2mr.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=drug-blockchain`;

app.use(cookieParser());
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept",
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS",
    );
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

mongoose.set("strictQuery", false);
// Wait for database to connect, logging an error if there is a problem
main()
    .then(res => console.log(`Connected to MongoDB Atlas`))
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

app.listen(PORT, () => {
    console.log(`Express running on port: ${PORT}`);
});

module.exports = app;
