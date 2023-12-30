// import { userModel } from "../models/models";
// import bcrypt from "bcrypt";

// export interface CreateUserInput {
//     firstName: string;
//     lastName: string;
//     birhtDate: Date;
//     city: string;
//     country: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
// }

// export const createUser = async (userData: CreateUserInput) => {

//     const { password, confirmPassword, ...restUserData } = userData;
//     if (password !== confirmPassword) {
//         throw new Error("Password and confirmation password do not match");
//     }
//     const hashedPassword = await hashPassword(password);

//     const newUser = await userModel.create({
//         ...restUserData,
//         password: hashedPassword,
//         confirmPassword: hashedPassword,
//     });

//     return newUser;
// };

// const hashPassword = async (password: string): Promise<string> => {
//     const saltRounds = 10;
//     return bcrypt.hash(password, saltRounds);
// };


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