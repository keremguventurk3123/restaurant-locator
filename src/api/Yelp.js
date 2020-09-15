import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer XFuLVJ8awYMsq_75DCR9ZhrKLKJOnUG18Uo57iVPR1S9Ay0M_OjIoP9BdH121S-1yA5HRV1SU5bijjjqlMup4PxkoAO5Eaguplt5B30Q6m-zw2HqRUUsVUdiQ_LXXnYx'
    }
});


//Client ID avyf_ENDqqe4ok7HbKYq4g 
//API Key XFuLVJ8awYMsq_75DCR9ZhrKLKJOnUG18Uo57iVPR1S9Ay0M_OjIoP9BdH121S-1yA5HRV1SU5bijjjqlMup4PxkoAO5Eaguplt5B30Q6m-zw2HqRUUsVUdiQ_LXXnYx