const mongoose = require('mongoose');
// bcrypt is used for password hashing
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    },
    password: {
    type: String,
    required: true,
    select: false,
    },
}, 
    {timestamps: true}
);

// Pre-save hook to hash the password before saving the user document
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// Method to compare the entered password with the hashed password in the database
userSchema.methods.comparePassword = async function (entryPassword) {
  return await bcrypt.compare(entryPassword, this.password);
}


const User = mongoose.model('User', userSchema);
module.exports = User;