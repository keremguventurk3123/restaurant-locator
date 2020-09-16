import axios from 'axios';

const API_KEY = null

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: API_KEY
    }
});
