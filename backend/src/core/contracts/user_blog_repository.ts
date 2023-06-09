import User from "./user";

export default interface UserBlogRepository {
    createUser(user:User): Promise<void>;
    retrieveUser(email: string): Promise<User>;
    retrieveAllUsers(): Promise<User[]>;
}