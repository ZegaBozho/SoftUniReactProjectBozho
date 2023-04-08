import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/posts';

export const postsServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAllPosts = async () => {
        const result = await request.get(baseUrl);
        const posts = Object.values(result).sort((a,b) => {return b._createdOn - a._createdOn} );
    
        return posts;
    };

    const getMyPosts = async (userId) => {
        const query = encodeURIComponent(`ownerId="${userId}"`);
        const result = await request.get(`${baseUrl}?where=${query}`);
        const posts = Object.values(result).sort((a,b) => {return a._createdOn - a._createdOn} );
    
        return posts;
    }

    const createPost = async (postData) => {
        const result = await request.post(baseUrl, postData);
    
        console.log(result);
    
        return result;
    };

    const editPost = (postId, data) => request.put(`${baseUrl}/${postId}`, data);

    const deletepost = (postId) => request.delete(`${baseUrl}/${postId}`);


    return {
        getAllPosts,
        createPost,
        editPost,
        getMyPosts,
        delete: deletepost,
    };
}