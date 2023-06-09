import Comment from "../contracts/comment";
import {v1 as  uuidv1} from 'uuid';


export default class CommentImpl implements Comment{
    id: string;
    text: string;
    SUserId: string;
    createdAt?: Date;

    constructor(text: string, SUserId: string, createdAt?: Date) {
        this.id = uuidv1();
        this.text = text;
        this.SUserId = SUserId;
        this.createdAt = createdAt;
    }
}