const express = require("express");

const app = express();

// Logging middleware
function logger(req, res, next) {

    console.log(
        new Date().toLocaleString(),
        req.method,
        req.url
    );

    next();
}

// Use middleware
app.use(logger);

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to my server");
});

app.get("/about", (req, res) => {
    res.send("This is the about page");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
