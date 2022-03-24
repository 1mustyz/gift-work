const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplainSchema = Schema({
    email: { type: String, required: true, unique: [ true, 'ID Number already exist' ] },
    fullName: { type: String, required: true},
    message: { type: String, required: true},

}, { timestamps: true });

const Complain = mongoose.model('complain', ComplainSchema)
module.exports = Complain;