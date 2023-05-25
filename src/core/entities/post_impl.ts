import Post from "../contracts/post";
import {v1 as  uuidv1} from 'uuid';
export class PostImpl implements Post {
    id: string;
    text: string;
    likes: number;

    constructor( text: string) {
        this.id = uuidv1();
        this.text = text;
        this.likes = 0;        
    }
}