import mongoose, { Schema, model, Document } from 'mongoose'

export interface UserType extends Document {
    username: string
    email: string
    password: string
    role: string
    isverified: boolean
    resetPasswordToken: string
    resetPasswordTokenExpiry: Date
    verifyToken: string
    verifyTokenExpiry: Date
}

const userSchema = new Schema<UserType>({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unqiue: true,
        trim: true,
        lowercase: true,
        match: [/([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    isverified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'staff'],
        default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
}, { timestamps: true })


const userModel = mongoose.models.users || model<UserType>('users', userSchema)

export default userModel