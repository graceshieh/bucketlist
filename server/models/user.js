var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({

	name: {type: String},
	pendingTasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
	finishedTasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
	
}, {timestamps: true})

mongoose.model('User', UserSchema);
mongoose.Promise = global.Promise;