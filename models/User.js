const mongoose = require('mongoose');
const { Schema } = mongoose;
const fs = require('fs');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	profilePic: { type: String, default: 'https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png' },
	followers: [Schema.Types.ObjectId],
	following: [Schema.Types.ObjectId]
});

userSchema.pre('save', async function(next) {
	const user = this;

	if(this.isModified('password') || this.isNew){
		try {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(user.password, salt);
			user.password = hash;
		} catch (err) { 
			next(err);
		}

		next();
	}
})

userSchema.methods.isProperPassword = function(clientPassword) {
	return new Promise(async (resolve, reject) => {
		try {
			const isMatch = await bcrypt.compare(clientPassword, this.password);
			resolve(isMatch);
		} catch(err){
			console.log(err, 'Error in BCrypt Password Comparison');
			reject(err);
		}
	})
}

mongoose.model('User', userSchema);

//BCRYPT - Used to Encrypt passwords with Hashing Algorithms.
//Salt is random data, and is used to hash a password.
//We set user's password to hash.