import Post from "./post";

export default interface BlogRepository {
    createPost(post: Post): Promise<Post>;
    deletePost(id: string): Promise<void>;
    retrievePost(id: string): Promise<Post>;
    retrieveAllPosts(): Promise<Post[]>;
    updatePost(post: Post): Promise<void>;
}