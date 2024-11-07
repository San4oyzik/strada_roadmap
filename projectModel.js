const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
    userId: { type: 'ObjectId', ref: 'User' },
    tasks: [{ type: 'ObjectId', ref: 'Task' }]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;