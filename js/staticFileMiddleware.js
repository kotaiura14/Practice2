const express = require('express');
const path = require('path');

function setupStaticFiles(app) {
    app.use(express.static('text'));
    app.use(express.static(path.join(__dirname, 'text')));

    app.use('/style.css', (req, res, next) => {
        res.setHeader('Content-Type', 'text/css');
        next();
    });
}

module.exports = {
    setupStaticFiles
};
