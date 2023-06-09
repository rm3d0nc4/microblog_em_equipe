import { Microblog } from '../core/entities/microblog';
import Post from "../core/contracts/post";
import BlogRepository from "../core/contracts/blog_repository";

class BlogRepositoryWithMicroblog implements BlogRepository {
    microblog: Microblog = new Microblog();
    
    async createPost(post: Post): Promise<Post> {
        await this.microblog.create(post);
        return post;
    }
    async deletePost(id: string): Promise<void> {
        this.microblog.delete(id);
        
    }
    async retrievePost(id: string): Promise<Post> {
        return  this.microblog.retrieve(id);
    }
    async retrieveAllPosts(): Promise<Post[]> {
        return this.microblog.retrieveAll();
    }
    async updatePost(newPost: Post): Promise<void> {
        this.microblog.update(newPost);
    }

}

const blogRepositoryWithMicroblog: BlogRepositoryWithMicroblog = new BlogRepositoryWithMicroblog();

export default blogRepositoryWithMicroblog;