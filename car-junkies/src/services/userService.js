import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/users';

export const userServiceFactory = (token) => {
    const request = requestFactory(token);

    const getUserInfo = async (userId) => {
        const result = await request.get(`${baseUrl}/${userId}`);
        return result;
    };

    return {
        getUserInfo
    };
}