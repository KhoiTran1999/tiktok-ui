import axios from 'axios';

const getUser = async (nickname) => {
    const res = await axios.get('https://63f816b61dc21d5465b961be.mockapi.io/users', {
        params: {
            nickname: nickname,
        },
    });
    return res;
};

export default getUser;
