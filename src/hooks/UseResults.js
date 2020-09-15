import {useState, useEffect} from 'react';
import yelp from "../api/Yelp";

export default () => {
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const searchApi = async (searchTerm, myLocation) => {
        if (myLocation) {
            let {latitude, longitude} = myLocation.coords;
            try {
                const response = await yelp.get('/search', {
                    params: {
                        limit: 50,
                        term: searchTerm,
                        latitude,
                        longitude
                    }
                });
                setResults(response.data.businesses);
            }
            catch (err) {
                setErrorMessage('Someting went wrong')
            }
        } else {
            try {
                const response = await yelp.get('/search', {
                    params: {
                        limit: 50,
                        term: searchTerm,
                        location: "Evanston"
                    }
                });
                setResults(response.data.businesses);
            }
            catch (err) {
                setErrorMessage('Someting went wrong')
            }
        }
    }

    //call searchApi when component
    //is first rendered
    //searchApi("pasta")

    useEffect(() => {
        searchApi("pasta")
    },[])

    return [searchApi, results, errorMessage]
};