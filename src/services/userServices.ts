import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repository/repository';
import UserModel, { UserCreate, UserModel as IUserModel} from '../models/models';
import { createUserSchema, validatePassword } from '../middleware/createUserSchema';

export class UserService {
    static async createUser(userProps: UserCreate): Promise<IUserModel> {
        const validatedUserProps = await createUserSchema.validateAsync(userProps);
        validatePassword(validatedUserProps.password);

        const { password, confirmPassword, ...restUserProps } = validatedUserProps;
        const hashedPassword = await bcrypt.hash(password, 10);
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
        const secretKey = process.env.JWT_SECRET as string ;
        const expiresIn = '30d';
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn });
        return token;
    }
}

