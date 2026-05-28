const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose').default;

const User = new Schema({
    role:{
        type:String,
        required:true
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);