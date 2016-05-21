const mongoose = require('mongoose'),
    validators = require('mongoose-validators'),
    bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    
    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: validators.isEmail()
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },

    avatar: {
        type: String,
        required: true,
        default: 'dist/images/Avatar1.png'
    },

    contacts: [{
       ref: 'User',
       type: mongoose.Schema.Types.ObjectId
    }]

});

UserSchema.set('toJSON', {
    virtuals: true
});

UserSchema.set('toObject', {
    virtuals: true
});

UserSchema.virtual('fullname').get(function() {
    return `${this.firstname} ${this.lastname}`
});

UserSchema.methods.comparePassword = function(candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
            if (error)
                reject(error);
            if (!isMatch)
                reject('Invalid password');

            resolve({
                id: this.id,
                firstname: this.firstname,
                lastname: this.lastname,
                avatar: this.avatar
            });
        })
    });
};

const SALT_WORK_FACTOR = 10;

/**
 * Password hashing
 */
UserSchema.pre('save', function(next) {
    if (!this.isModified('password'))
        return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, (error, salt) => {
        if (error) return next(error);

        bcrypt.hash(this.password, salt, (error, hash) => {
            if (error) return next(error);

            this.password = hash;
            next();
        })
    })
});

module.exports = mongoose.model('User', UserSchema);