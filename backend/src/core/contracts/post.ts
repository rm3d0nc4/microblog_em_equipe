export default interface Post {
    id: string;
    SUserId: string;
    title: string;
    text: string;
    likes: number;
    createdAt?: Date;
    updatedAt?: Date;
}