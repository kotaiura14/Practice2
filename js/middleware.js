const bodyParser = require('body-parser');

function setupMiddleware(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}

module.exports = {
    setupMiddleware
};
