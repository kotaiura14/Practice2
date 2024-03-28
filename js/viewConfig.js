const path = require('path');

function setupViewEngine(app) {
    app.set('views', path.join(__dirname, 'text'));
    app.set('view engine', 'ejs');
}

module.exports = {
    setupViewEngine
};
