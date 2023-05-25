import Post from "./post";

export default interface BlogRepository {
    createPost(post: Post): Promise<void>;
    deletePost(id: string): Promise<void>;
    retrievePost(id: string): Promise<Post>;
    retrieveAllPosts(): Promise<Post[]>;
    updatePost(post: Post): Promise<void>;
}