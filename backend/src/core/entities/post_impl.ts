import Post from "../contracts/post";
import {v1 as  uuidv1} from 'uuid';
export class PostImpl implements Post {
    id: string;
    SUserId: string;
    title: string;
    text: string;
    likes: number;
    createdAt?: Date;
    updatedAt?: Date;


    constructor( title: string, SUserId: string, text: string, createdAt?: Date, updatedAt?: Date) {
        this.id = uuidv1();
        this.SUserId = SUserId;
        this.title = title;
        this.text = text;
        this.likes = 0;      
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}