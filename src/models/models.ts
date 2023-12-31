import mongoose, { Document, Schema } from 'mongoose';

export interface UserCreate {
    firstName: string;
    lastName: string;
    birthDate: Date;
    city: string;
    country: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserModel extends UserCreate, Document {}

const userSchema = new Schema<UserModel>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
});

export default mongoose.model<UserModel>('User', userSchema);

export interface UserLogin {
    email: string;
    password: string;
}
