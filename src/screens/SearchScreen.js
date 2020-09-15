import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import SearchBar from '../components/SearchBar';
import ResultsList from '../components/ResultsList';
import UseResults from '../hooks/UseResults';
import UseLocation from '../hooks/UseLocation';

const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [searchApi, results, errorMessage] = UseResults();
    const location = UseLocation();

    useEffect(() => {
        searchApi(term, location);
    }, [location])


    const filterResultsByPrice = (price) => {
        // price === '$' || '$$' || '$$$'
        return results.filter(result => {
            return result.price === price;
        })
    }


    return (
        <View style={styles.background}>
            <SearchBar
                term={term}
                onTermChange={newTerm => setTerm(newTerm)}
                onTermSubmit={() => searchApi(term, location)}
            />
            {errorMessage ? <Text> {errorMessage} </Text> : null}
            <Text style={styles.resultsText}> We have found {results.length} results!</Text>
            <ScrollView>
                <ResultsList
                    title="Cost Effective"
                    results={filterResultsByPrice('$')} />
                <ResultsList
                    title="Bit Pricier"
                    results={filterResultsByPrice('$$')} />
                <ResultsList
                    title="Big Spender!"
                    results={filterResultsByPrice('$$$')} />
            </ScrollView>
            <Image
                style={styles.image}
                source={require("../assets/yelp.png")}
            />
        </View>
    )
}

export default SearchScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: 200,
        height: 120,
        alignSelf: "center"
    },
    resultsText: {
        fontSize: 20,
        marginLeft: 15,
        marginBottom: 10
    }
})