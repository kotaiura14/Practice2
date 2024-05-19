const mongoose = require('mongoose');

const searchResultSchema = new mongoose.Schema({
    name: {type: String,
        required: true
        },
    level: {type: String, 
        required:true}
});

module.exports = mongoose.model('SearchResult', searchResultSchema);
