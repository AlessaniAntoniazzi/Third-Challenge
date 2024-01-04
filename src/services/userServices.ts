import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repository/userRepository';
import UserModel, { UserCreate, UserModel as IUserModel} from '../models/models';
import { createUserSchema} from '../middleware/createUserSchema';
import { ValidationError, object } from 'joi';

export class UserService {
    static async createUser(userProps: UserCreate): Promise<IUserModel> {
        const validatedUserProps = await createUserSchema.validateAsync(userProps, { abortEarly: false });

        const existingEmail = await UserRepository.findByEmail(validatedUserProps.email);

        if (existingEmail) {
            throw new Error('Email already exists');
        }
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

    static async loginUser(email: string, password: string): Promise<{error?: string, token?: string}> {
        const user = await UserRepository.findByEmail(email);

        if (!user) {
            return {error: 'Invalid credentials'}
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return {error: 'Invalid credentials'}
        }

        const token = this.generateToken(user);
        return {token};
    }

    private static generateToken(user: IUserModel): string {
        const secretKey = process.env.JWT_SECRET as string ;
        const expiresIn = '30d';
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn });
        return token;
    }
}

