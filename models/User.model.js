module.exports = mongoose => {

    require('mongoose-type-email');

    const bcrypt = require('bcryptjs');
    const uniqueValidator = require('@yastech/mongoose-unique-validator');

    const userSchema = new mongoose.Schema(
        {
            username: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true
            },
            emailAddress: {
                type: mongoose.SchemaTypes.Email,
                required: true,
                uniqueCaseInsensitive: true
            },
            firstName: {
                type: String,
                required: true
            },
            lastName: String,
            postCode: String,
        },
        { timestamps: true }
    );

    userSchema.pre('save', async function (next) {
        let currentUser = this;

        if (!currentUser.isModified('password')) {
            return next();
        }

        try {
            const salt = await bcrypt.genSalt(10);
            currentUser.password = await bcrypt.hash(currentUser.password, salt);
            return next();
        } catch (error) {
            return next(error);
        }

    });

    userSchema.plugin(uniqueValidator);

    const user = mongoose.model('user', userSchema);

    return user;
}