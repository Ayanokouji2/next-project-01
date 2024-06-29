import mongoose, { Schema, model, Document } from 'mongoose'

export interface UserType extends Document {
    username: string
    email: string
    password: string
    role: string
    resetPasswordToken: string
    resetPasswordTokenExpiry: Date
    refreshToken: string
    refreshTokenExpiry: Date
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
    role: {
        type: String,
        enum: ['user', 'admin', 'staff'],
        default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiry: Date,
    refreshToken: String,
    refreshTokenExpiry: Date,
}, { timestamps: true })


const userModel = mongoose.models.users || model<UserType>('users', userSchema)

export default userModel