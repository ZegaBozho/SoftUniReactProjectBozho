import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/comments';

export const commentServiceFactory = (token) => {
    const request = requestFactory(token);


    const getAllCommentsForPost = async (postId) => {
        const query = encodeURIComponent(`postId="${postId}"`);
        const result = await request.get(`${baseUrl}?where=${query}`);
        const comments = Object.values(result).sort((a,b) => {return a._createdOn - b._createdOn} );
    
        return comments;
    }

    const createComment = async (commentData) => {
        const result = await request.post(baseUrl, commentData);
    
        console.log(result);
    
        return result;
    };


    const deleteComment = (commentId) => request.delete(`${baseUrl}/${commentId}`);


    return {
        getAllCommentsForPost,
        createComment,
        delete: deleteComment,
    };
}