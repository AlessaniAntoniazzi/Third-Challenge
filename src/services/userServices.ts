import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repository/repository';
import UserModel, { UserCreate, UserModel as IUserModel} from '../models/models';

export class UserService {
    static async createUser(userProps: UserCreate): Promise<IUserModel> {
        const { password, confirmPassword, ...restUserProps } = userProps;
        const hashedPassword = await bcrypt.hash(userProps.password, 10);
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

        const user = await UserRepository.createUser({
            ...restUserProps,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword,
        });
        return user;
    }

    static async loginUser(email: string, password: string): Promise<string> {
        const user = await UserRepository.findByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = this.generateToken(user);
        return token;
    }

    private static generateToken(user: IUserModel): string {
        const secretKey = 'your-secret-key';
        const expiresIn = '1h';
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn });
        return token;
    }
}

