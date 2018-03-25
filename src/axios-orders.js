import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-b1eca.firebaseio.com/'
});

export default instance;