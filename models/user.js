const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
id : String,
email : String,
mdp : String
})
const user = mongoose.model('user',userSchema);
module.exports = user;