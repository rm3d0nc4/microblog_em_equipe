import Comment from "../contracts/comment";
import {v1 as  uuidv1} from 'uuid';


export default class CommentImpl implements Comment{
    id: string;
    text: string;
    userId: string;
    createdAt?: Date;

    constructor(userId: string, text: string, createdAt?: Date) {
        this.id = uuidv1();
        this.text = text;
        this.userId = userId;
        this.createdAt = createdAt;
    }
}