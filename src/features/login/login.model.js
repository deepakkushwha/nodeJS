import mongoose from 'mongoose';

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    mobile: {
        type: Number,
        required: [true, "Number is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {
    timestamps: true
})

export default mongoose.model('Login', loginSchema);