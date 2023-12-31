import UserModel, { UserCreate, UserModel as IUserModel } from '../models/models';

export class UserRepository {
    static async createUser(userProps: UserCreate): Promise<IUserModel> {
        const user = await UserModel.create(userProps);
        const savedUser = await user.save();
        return savedUser.toObject() as IUserModel;
    }

    static async findByEmail(email: string): Promise<IUserModel | null> {
        return UserModel.findOne({ email });
    }
}
