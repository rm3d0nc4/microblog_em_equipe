import Post from "../contracts/post";
import {v1 as  uuidv1} from 'uuid';
export class PostImpl implements Post {
    id: string;
    userId: string;
    title: string;
    text: string;
    likes: number;
    createdAt?: Date;
    updatedAt?: Date;


    constructor( title: string, userId: string, text: string, createdAt?: Date, updatedAt?: Date) {
        this.id = uuidv1();
        this.userId = userId;
        this.title = title;
        this.text = text;
        this.likes = 0;      
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}