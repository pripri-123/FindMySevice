const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Jobs = new Schema({
	location:{type: String},
	type_of_work: {type: String},
	field:{type:String},
    applicants:[{
        name: {type: String, required: "Please enter your name" },
        email: {type: String, required: true},
        phone: {type: String, required: "Enter contact number"}
    }]
})

module.exports = mongoose.model('Jobs', Jobs);

