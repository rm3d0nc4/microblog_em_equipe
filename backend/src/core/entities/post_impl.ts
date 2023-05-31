import Post from "../contracts/post";
import {v1 as  uuidv1} from 'uuid';
export class PostImpl implements Post {
    id: string;
    title: string;
    text: string;
    likes: number;

    constructor( title: string, text: string) {
        this.id = uuidv1();
        this.title = title;
        this.text = text;
        this.likes = 0;        
    }
}