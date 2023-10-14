const express = require('express');

const app = express();

app.get('/', (req, res) => {
    console.log("Hello user.");
    res.status(200);
    res.json({ message: "Hello from your List app. Test 1."});
    return res;
});

module.exports = app;