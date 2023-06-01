export default interface Post {
    id: string;
    userId: string;
    title: string;
    text: string;
    likes: number;
    createdAt?: Date;
    updatedAt?: Date;
}