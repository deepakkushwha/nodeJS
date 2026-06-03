import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export default mongoose.model('Users', userSchema);
