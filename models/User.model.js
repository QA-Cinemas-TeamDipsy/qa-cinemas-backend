module.exports = mongoose => {
    const User = mongoose.model(
        "user",
        mongoose.Schema(
            {
                
                username: String,
                password: String,
                emailAddress: String,
                firstName: String,
                secondName: String,
                postCode: String,
            },
            { timestamps: true }
        )
    );

    return User;
}