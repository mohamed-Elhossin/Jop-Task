const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserShema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

UserShema.pre('save', function (next) {

    if (!this.isModified('password'))  {
        return next();
      }
      
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.password = hash;
            next();
        });
    });
});


const User = mongoose.model('User', UserShema);


module.exports = User;
