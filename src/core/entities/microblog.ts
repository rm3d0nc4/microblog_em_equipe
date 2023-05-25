import Post from "../contracts/post";
import AppError from "../errors/app_error";

export class Microblog {
    private _posts: Post[] = [];

    create(post: Post) : void{
        this._posts.push(post);
    }

    retrieve(id: string): Post {
        const post = this._posts.find((post) => post.id === id); 
        if(post) {
            return post;
        }

        throw new AppError('Post Não Encontrado', 404)
    }
    
    update(post: Post): void {
        const postIndex = this._posts.findIndex((p) => p.id === post.id);
        if(postIndex !== -1) {
            this._posts[postIndex] = post;
        } else {
            throw new AppError('Post Não Encontrado', 404)
        }
    }
    
    delete(id:string): void {
        console.log("microblog")
        const postIndex = this._posts.findIndex((p) => p.id === id);
        console.log(postIndex)
        if(postIndex !== -1) {
            this._posts.splice(postIndex, 1);
        } else {
            throw new AppError('Post Não Encontrado', 404);
        }
    }

    retrieveAll(): Post[] {
            return this._posts;
    }
}