const mongoose = require('mongoose');
const { Schema } = mongoose;



const TaskSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String },
    duration: { type: Number, require: true },
    completed: { type: String }

}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);