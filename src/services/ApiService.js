import axios from 'axios';

export const getSearchUser = async (searchRes, limit) => {
    const res = await axios.get('https://63f816b61dc21d5465b961be.mockapi.io/users', {
        params: {
            nickName: searchRes,
            page: 1,
            limit: limit,
        },
    });
    return res;
};

export const getUserList = async () => {
    const res = await axios.get('https://63f816b61dc21d5465b961be.mockapi.io/users');
    return res;
};
