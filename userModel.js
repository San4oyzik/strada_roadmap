const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  projects: [{ type: 'ObjectId', ref: 'Project' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;

