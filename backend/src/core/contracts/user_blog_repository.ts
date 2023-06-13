import User from "./user";

export default interface UserBlogRepository {
    createUser(user:User): Promise<void>;
    retrieveUserByEmail(email: string): Promise<User>;
    retrieveUserById(id: string): Promise<User>;
    retrieveAllUsers(): Promise<User[]>;
}