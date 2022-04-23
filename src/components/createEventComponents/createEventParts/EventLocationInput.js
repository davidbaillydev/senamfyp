import React from "react";
import { FlatList, TextInput, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useState,useEffect } from "react";

import * as config from "../../../utils/config";
import * as commonStyles from "../../../utils/commonStyles";

const EventLocationInput = (props) => {
    //Liste des suggestions pour ce que l'user a écrit dans l'input
    const [suggestions, setSuggestions] = useState(new Array);
    //L'adresse selectionnée par l'user
    const [selectedAddress, setSelectedAddress] = useState(props.address);
    const [onInput,setOnInput] = useState(false);
    const [input,setInput] = useState(null);

    let abortController = new AbortController();

    // useEffect(()=>{
    //     input.scrollTo(0);
    // },[])

    const onAddressSelected = (newAddress) => {
        console.log("vérif argument : ", newAddress.properties.label);
        props.onAddressChange && props.onAddressChange(newAddress.properties.label);
        props.setAddress && props.setAddress(newAddress);
        setSelectedAddress(newAddress.properties.label);
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
        <TouchableOpacity style={styles.inputContainer} onPress={()=>input.focus()}>
            <View style={styles.inputAndIcon}>
            <TextInput
                onFocus={() => {setOnInput(true)}}
                onChangeText={(text) => handleChangeText(text)}
                style={{...styles.inputStyle,width:onInput || selectedAddress ? (commonStyles.WIDTH > 370 ? 240 : 200) : (commonStyles.WIDTH > 370 ? 85 : 70)}}
                placeholder={"Adresse"}
                // defaultValue={selectedAddress}
                maxLength={50}
                value={selectedAddress}
                placeholderTextColor={commonStyles.DARK_WHITE}
                onEndEditing={() =>setOnInput(false)}
                ref={input => setInput(input)} 
                ellipsizeMode="tail"
                // onEndEditing={() => {setSuggestions(new Array)}}
            />
            {onInput ? 
            <TouchableOpacity onPress={()=>{setSelectedAddress("");props.setAddress("");console.log("clear")}}>
                <Image style={styles.editImgLittle} source={require('../../../assets/CreateEvent/Cross.png')}/> 
            </TouchableOpacity>
            : <Image style={styles.editImgLittle} source={require('../../../assets/CreateEvent/Edit.png')}/>}
            </View>
            {suggestions.length ?
            <View style={styles.suggestionsContainer}>
                {suggestions.map((item,key)=> 
                    <TouchableOpacity
                        key={key}
                        onPress={() => {onAddressSelected(item)}}
                    >
                        <Text style={styles.suggestionItem}>{item.properties.label}</Text>
                    </TouchableOpacity>)}
            </View> :
            <></>}
            
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    inputContainer:{
        width:300,
        position: 'relative',
        zIndex:1,
    },
    inputAndIcon:{
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    suggestionsContainer: {
        position: "absolute",
        top: 40,
        backgroundColor: commonStyles.BLACK,
        borderRadius:4,
        borderWidth:2,
        borderColor:commonStyles.MEDIUM_ORANGE,
        width: "100%"
    },
    suggestionItem: {
        fontFamily: commonStyles.MAIN_FONT,
        fontSize: commonStyles.WIDTH > 370 ? 18 : 15,
        color: commonStyles.WHITE,
        paddingHorizontal:"5%",
        paddingVertical:"2%",
    },
    inputStyle:{
        fontFamily: commonStyles.MAIN_FONT,
        fontSize: commonStyles.WIDTH > 370 ? 18 : 15,
        color: commonStyles.WHITE,
        paddingHorizontal:"5%",
        maxWidth:280,
},
editImgLittle: {
    width: commonStyles.WIDTH > 370 ? 15 : 12,
    height: commonStyles.WIDTH > 370 ? 15 : 12
},
});

export default EventLocationInput;