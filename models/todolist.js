const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
const Schema = mongoose.Schema;
const todolistSchema = new Schema({
id : String,
text : String,
editable : Boolean,
foreignKey : String
})
const todolist = mongoose.model('todolist',todolistSchema);
module.exports = todolist;