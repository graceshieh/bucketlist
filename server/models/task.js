var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TaskSchema = new mongoose.Schema({

	_creator: {type: Schema.Types.ObjectId, ref: 'User'},
	title: {type: String, required: true, minlength: 5},
	description: {type: String, required: true, minlength: 10}, 
	_taggedUser: {type: Schema.Types.ObjectId, ref: 'User'}
	
}, {timestamps: true})

mongoose.model('Task', TaskSchema);
mongoose.Promise = global.Promise;