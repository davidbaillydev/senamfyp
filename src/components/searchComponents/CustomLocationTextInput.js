import React from "react";
import { FlatList, TextInput, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useState } from "react";

import * as config from "../../utils/config";
import {
    WIDTH,
    WHITE,
    SEARCH_VIEW_CONTAINERS_WIDTH,
    BLACK,
    MEDIUM_ORANGE,
    SEARCH_CONTAINER_RADIUS,
    INPUT_HEIGHT,
    SEARCH_INPUT,
    MAIN_FONT,
    HEIGHT,
    DARK_WHITE
} from "../../utils/commonStyles";

const CustomLocationTextInput = (props) => {
    //Liste des suggestions pour ce que l'user a écrit dans l'input
    const [suggestions, setSuggestions] = useState(new Array);
    //L'adresse selectionnée par l'user
    const [selectedAddress, setSelectedAddress] = useState(props.savedValue);

    let abortController = new AbortController();

    //console.log("adresse selected input : ", selectedAddress);

    const onAddressSelected = (newAddress) => {
        //console.log("vérif argument : ", newAddress.properties.label);
        props.onAddressChange && props.onAddressChange(newAddress.properties.label);
        props.setAddressComponents && props.setAddressComponents(newAddress);
        setSelectedAddress(newAddress.properties.label);
        props.onSetLocation(newAddress);
        setSuggestions(new Array);
    }

    const handleChangeText = (text) => {
        setSelectedAddress(text);

        //Abandonne le/les fetch en cours pour en lancer un nouveau
        abortController.abort();
        abortController = new AbortController();
        if(text.length > 2) {
            try {
                fetch('https://api-adresse.data.gouv.fr/search/?q='+text, {method: 'GET', signal: abortController.signal})
                    .then(response => response.json())
                    .then((result) => {
                        console.log(result);
                        setSuggestions([]);
                        result.features.map((item) => {
                            setSuggestions((suggestions) => {
                                return [...suggestions,item];
                            });
                        });
                    })
                    .catch((error) => {
                        console.log('error fetch des villes', error);
                    })
            } catch (error) {
                console.log("erreur du try catch : ", error);

            }
        } else {
            setSuggestions([]);
        }
    }

    return(
        <View style={styles.mainContainer}>
            <View style={styles.searchBar}>
                <View style={styles.searchIconContainer}>
                    <Image
                        source={require('../../assets/Search/localisation.png')}
                        style={styles.searchIcon}
                    />
                </View>
                <TextInput
                    selectTextOnFocus={true}
                    onChangeText={(text) => handleChangeText(text)}
                    style={[SEARCH_INPUT, {color: WHITE}]}
                    placeholder={"Où souhaitez-vous sortir ?"}
                    placeholderTextColor={WHITE}
                    defaultValue={selectedAddress}
                    maxLength={50}
                    value={selectedAddress}
                    // onEndEditing={() => {setSuggestions(new Array)}}
                />
            </View>

            {suggestions.length ?
            <View style={styles.suggestionsContainer}>
                {suggestions.map((item,key)=> 
                    <TouchableOpacity
                        key={key}
                        onPress={() => {onAddressSelected(item);}}
                    >
                        <Text style={styles.suggestionItem}>{item.properties.label}</Text>
                    </TouchableOpacity>)}
            </View> :
            <></>}
        </View>
            
            
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        width: SEARCH_VIEW_CONTAINERS_WIDTH,
        height: INPUT_HEIGHT,
        top: -INPUT_HEIGHT/2
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    searchIconContainer: {
        paddingHorizontal: 15,
        backgroundColor: BLACK,
        borderColor: MEDIUM_ORANGE,
        borderTopLeftRadius: SEARCH_CONTAINER_RADIUS,
        borderBottomLeftRadius: SEARCH_CONTAINER_RADIUS,
        borderWidth: 2,
        borderRightWidth: 0,
        justifyContent: 'center'
    },
    searchIcon: {
        width: INPUT_HEIGHT,
        height: INPUT_HEIGHT,
    },
    suggestionsContainer: {
        position: "relative",
        zIndex: 10,
        width: '100%',
        backgroundColor: BLACK,
        borderWidth: 2,
        borderColor: MEDIUM_ORANGE,
        borderRadius: SEARCH_CONTAINER_RADIUS,
    },
    suggestionsList: {
        position: "absolute",
        backgroundColor: 'white',
        padding: 5,
        width: "100%"
    },
    suggestionItem: {
        color: WHITE,
        fontFamily: MAIN_FONT,
        fontSize: WIDTH > 370 ? 20 : 15,
        padding: 5,
    }
});

export default CustomLocationTextInput;


