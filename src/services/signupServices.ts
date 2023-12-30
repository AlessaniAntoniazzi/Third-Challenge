import bcrypt from 'bcrypt';
import UserModel, { UserCreate } from '../models/models';

export class UserService {
    static async createUser(userProps: UserCreate): Promise<typeof UserModel> {
        const { password, confirmPassword, ...restUserProps } = userProps;
        if (password !== confirmPassword) {
            throw new Error('Password and confirmation password do not match');
        }
        const hashedPassword = await bcrypt.hash(userProps.password, 10);
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
        
        const user = await UserModel.create({
            ...userProps,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword,
        });
        await user.save();

        return user.toObject();
    }
}