import httpRequest from '../utils/httpRequest';

const getUser = async (q, type = 'less') => {
    const response = await httpRequest.get('users/search', {
        params: {
            q,
            type,
        },
    });
    return response.data;
};

export default getUser;
