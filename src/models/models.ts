import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

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

export interface UserModel extends UserCreate, Document {
    comparePassword(password: string): Promise<boolean>;
}

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

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};
export default mongoose.model<UserModel>('User', userSchema);

// export interface UserLogin {
//     email: string;
//     password: string;
// };
