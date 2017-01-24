var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var switchs = new Schema({
//     heart: Boolean,
//     bread: Boolean,
//     heart1: Boolean,
//     heart2: Boolean,
//     record: Array
// });

var userSchema = new Schema({
    id: String,
    name: String,
    text: String,
});

// mongoose.model('switchs', switchs);
mongoose.model('user', userSchema);
mongoose.connect('mongodb://localhost/reactTest');
