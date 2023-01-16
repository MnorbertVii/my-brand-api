const mongoose=require('mongoose');
const schema = mongoose.Schema({
    email:String,
    Names: String,
    message: String,
})

module.exports = mongoose.model('message', schema);