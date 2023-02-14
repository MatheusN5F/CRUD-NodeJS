const express = require('express');
const app = require ('./src/app')

app.listen(3344, function () {
    return console.log('SERVER HTTP ONLINE: http://localhost:3344');
})