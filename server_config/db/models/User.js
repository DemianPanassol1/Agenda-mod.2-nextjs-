import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
});

const User = mongoose.models.users || mongoose.model('users', UserSchema);

export default User;
