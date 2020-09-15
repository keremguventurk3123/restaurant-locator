import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Yelp from "../api/Yelp";

const windowWidth = Dimensions.get('window').width;

const ResultsShowScreen = ({ navigation }) => {
    const [result, setResult] = useState(null);
    const id = navigation.getParam('id');

    const getResult = async (id) => {
        const response = await Yelp.get(`/${id}`);
        setResult(response.data)
    }

    useEffect(() => {
        getResult(id);
    }, []);

    if (!result) {
        return null;
    }

    const { name, photos, display_phone, price, rating, review_count } = result

    let stars = []
    for (var i = 0; i < rating; i++) {
        stars.push(<MaterialIcons name="star" size={20} color="black" style={{ alignSelf: "center" }} />);
    }

    return (
        <ScrollView style={styles.background}>
            <Text style={styles.restaurantName}> {name} </Text>
            <Text style={styles.restaurantDescription}> Basic Information </Text>
            <View style={styles.restaurantInfoContainer}>
                <View style={styles.restaurantInfoRow}>
                    <Text> Phone: </Text>
                    <Text> {display_phone} </Text>
                </View>
                <View style={styles.restaurantInfoRow}>
                    <Text> Price: {price} </Text>
                </View>
            </View>
            <View style={styles.restaurantInfoContainer}>
                <View style={styles.restaurantInfoRow}>
                    <Text> Rating: </Text>
                    {stars}
                </View>
                <View style={styles.restaurantInfoRow}>
                    <Text> # reviews: {review_count} </Text>
                </View>
            </View>
            <Text style={styles.photosDescription}> Photos </Text>
            <FlatList
                data={photos}
                keyExtractor={(photo) => photo}
                renderItem={({ item }) => {
                    return <Image style={styles.image} source={{ uri: item }} />
                }}
                horizontal
            />
            <Image
                style={styles.yelpImage}
                source={require("../assets/yelp.png")}
            />
        </ScrollView>
    )
}

export default ResultsShowScreen;

const styles = StyleSheet.create({
    image: {
        height: 300,
        width: windowWidth
    },
    yelpImage: {
        width: 200,
        height: 120,
        alignSelf: "center",
    },
    background: {
        flex: 1,
        backgroundColor: 'white',
    },
    restaurantName: {
        fontSize: 40,
        fontWeight: "bold",
        alignSelf: "center",
        fontFamily: 'Arial',
        marginTop: 30,
    },
    restaurantInfoContainer: {
        height: 50,
        display: 'flex',
        flexDirection: "row",
    },
    restaurantInfoRow: {
        alignItems: 'center',
        width: "40%",
        height: 50,
        marginLeft: "10%",
        display: 'flex',
        flexDirection: "row",
    },
    restaurantDescription: {
        fontSize: 20,
        fontFamily: 'Arial',
        marginLeft: "10%",
        marginTop: 20,
        marginBottom: 5,
    },
    photosDescription: {
        fontSize: 20,
        fontFamily: 'Arial',
        marginLeft: "10%",
        marginTop: 20,
        marginBottom: 10,
    }
});