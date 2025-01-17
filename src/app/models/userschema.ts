import mongoose, { Document, Schema } from 'mongoose';
const userSchema = new mongoose.Schema(
    {
        UserId: { type: String, unique: true, required: true },
        emailAddress: { type: String, required: true },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User, userScheme');

export default User;