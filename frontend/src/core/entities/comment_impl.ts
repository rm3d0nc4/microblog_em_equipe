import Comment from "../contracts/comment";
import {v1 as  uuidv1} from 'uuid';


export default class CommentImpl implements Comment{
    id: string;
    text: string;

    constructor(text: string) {
        this.id = uuidv1();
        this.text = text;
    }
}