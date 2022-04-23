import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity, TextInput, Image } from "react-native";
//import SelectDropdown from "react-native-select-dropdown";
//import { Dropdown } from "react-native-element-dropdown";
import LocationTextInput from "./LocationTextInput";
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomIconAndInput from "./CustomIconAndInput";

import GetLocation from 'react-native-get-location';

import * as data from "../../utils/data";
import * as commonStyles from "../../utils/commonStyles";

const innerItemsBorderRadius = 10;
const outerItemsBorderRadius = 12.5;
const separatorSize = 2;
const main_font_size = 30;

const large_item_ratio = 8;
const large_icon_ratio = 1.6;
const large_input_ratio = large_item_ratio - large_icon_ratio;

const small_item_ratio = 8;
const small_icon_ratio = 2*large_icon_ratio;
const small_input_ratio = small_item_ratio - small_icon_ratio;

const Filters = () => {

    const [type, setType] = useState(data.defaultEvent);
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("Date");
    const [time, setTime] = useState("Heure");

    const [showPicker, setShowPicker] = useState(false);
    const [datePickerShow, setDatePickerShow] = useState(true);

    console.log("---------------------------------------");
    console.log("Event Type : ", type);
    console.log("Address selected filter : ", address);
    console.log("Date : ", date, " Time : ", time);

    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 5000
    })
        .then(loc => console.log(loc))
        .catch(err => {
            const {code, message} = err;
            console.log(code, message);
        })

    const handleDateSelection = () => {
        setShowPicker(true);
        setDatePickerShow(true);
    }
    const handleTimeSelection = () => {
        setShowPicker(true);
        setDatePickerShow(false);
    }

    const handleSelectedAddress = (newAddress) => {
        setAddress(newAddress);
    }

    const onSearch = () => {
        console.log("Recherche");
    }

    return(
        <View style={styles.mainContainer}>
            {/* --------------- Input nom de la recherche --------------- */}
            <CustomIconAndInput
                icon={require('../../assets/Bottom_Navbar/search.png')}
                inputComponent={
                    <TextInput
                        style={styles.inputTextStyle}
                        placeholder={"Nom de la recherche"}
                    />
                }
                iconFlex={large_icon_ratio}
                inputFlex={large_input_ratio}
                customStyle={[styles.iconAndMainInputContainer, styles.separateFilters]}
            />

            {/* --------------- Event type selector --------------- */}
            
            <CustomIconAndInput
                icon={require('../../assets/Search/dropdown_triangle.png')}
                inputComponent={
                    // <EventTypeSelector
                    //     setEventType={setType}
                    // />
                    /*<Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        value={type}
                        placeholder={"placeholder"}
                        data={data.eventTypes}
                        labelField="label"
                        valueField="value"
                        onChange={(item)=>{setType(item.label)}}
                        
                    />*/
                    <View></View>
                }
                iconFlex={large_icon_ratio}
                inputFlex={large_input_ratio}
                customStyle={[{backgroundColor: commonStyles.WHITE}, styles.separateFilters]}
            />

            {/* --------------- Input localisation --------------- */}
            <CustomIconAndInput
                icon={require('../../assets/Search/localisation.png')}
                inputComponent={
                    <LocationTextInput
                        style={styles.inputTextStyle}
                        onAddressChange={handleSelectedAddress}
                    />
                }
                iconFlex={large_icon_ratio}
                inputFlex={large_input_ratio}
                customStyle={[{backgroundColor: commonStyles.WHITE}, styles.separateFilters]}
            />
            

            {/* --------------- Choix date & heure + nombre de personnes --------------- */}
            <View style={[styles.dateTimePeopleAmountPickerContainer, styles.separateFilters]}>
                <CustomIconAndInput
                    icon={require('../../assets/Search/calendrier.png')}
                    inputComponent={
                        <View style={{flex: 1, justifyContent: "center"}}>
                            <TouchableOpacity onPress={handleDateSelection}>
                                <Text style={styles.inputTextStyle}>{date}</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity onPress={handleTimeSelection}>
                                <Text>{time}</Text>
                            </TouchableOpacity> */}
                        </View>
                    }
                    iconFlex={small_icon_ratio}
                    inputFlex={small_input_ratio}
                    customStyle={styles.buttonDateTimePickerContainer}
                />
                <CustomIconAndInput
                    icon={require('../../assets/Search/people_icon.png')}
                    inputComponent={
                        <View style={styles.minMaxPeopleInputContainer}>
                            <TextInput
                                keyboardType = 'numeric'
                                placeholder="Min"
                            /> 
                            <Text> - </Text>
                            <TextInput
                                keyboardType = 'numeric'
                                placeholder="Max"
                            /> 
                        </View>
                    }
                    iconFlex={small_icon_ratio}
                    inputFlex={small_input_ratio}
                    customStyle={styles.peopleAmountContainer}
                />
            </View>

            {showPicker ?
                datePickerShow ?
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date()}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={(event, date) => {
                            setShowPicker(false);
                            if (event.type !== "dismissed"){
                                setDate(date.toLocaleDateString());
                            }
                        }}
                    />
                    :
                    <DateTimePicker
                        value={new Date()}
                        mode={'time'}
                        display="default"
                        onChange={(event, date) => {
                            setShowPicker(false);
                            if (event.type !== "dismissed"){
                                setTime(date.toLocaleTimeString());
                            }
                        }}
                    />
                :
                <></>
            }

            {/* --------------- Bouton pour lancer a recherche --------------- */}
            <TouchableOpacity
                style={styles.searchButtonStyle}
                onPress={onSearch}
            >
                <Text style={styles.searchButtonTextStyle}>Rechercher</Text>
            </TouchableOpacity>
        </View>
    );
}

const EventTypeSelector = ({setEventType}) => {

    return(
        <SelectDropdown
                data={data.eventTypes}
                onSelect={(selectedItem, index) => {
                    console.log("an event type has been selected");
                    setEventType(selectedItem);
                }}
                defaultButtonText={"Type d'événement"}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
                buttonStyle={styles.dropdownButtonStyle}
                buttonTextStyle={styles.itemsTextStyle}
                //defaultValue={data.defaultEvent}
            />
    );
}



const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: outerItemsBorderRadius,
        backgroundColor: commonStyles.MEDIUM_ORANGE,
        display: "flex",
        alignItems: 'stretch',
        justifyContent: 'space-between',
        margin: 15,
        padding: 10
    },
    iconAndMainInputContainer: {
        backgroundColor: commonStyles.WHITE,
        borderTopLeftRadius: innerItemsBorderRadius,
        borderTopRightRadius: innerItemsBorderRadius
    },
    dropdownButtonStyle: {
        flex: 1,
        width: '100%',
        justifyContent: "flex-start",
        backgroundColor: commonStyles.BLACK
    },
    //Pour les propositions du dropdown selector
    itemsTextStyle: {
        color: commonStyles.WHITE,
        fontFamily: commonStyles.MAIN_FONT,
        fontSize: main_font_size
    },

    //Pour les textes des input
    inputTextStyle: {
        fontSize: main_font_size,
        fontFamily: commonStyles.MAIN_FONT,
        paddingHorizontal: 0
    },
    /* ------------- date time & people amount pickers ------------- */
    dateTimePeopleAmountPickerContainer: {
        flexDirection: 'row'
    },
        buttonDateTimePickerContainer: {
            flex: 1,
            backgroundColor: commonStyles.WHITE,
            marginRight: separatorSize
        },
        peopleAmountContainer: {
            flex: 1,
            flexDirection:  'row',
            backgroundColor: commonStyles.WHITE
        },
            minMaxPeopleInputContainer: {
                flexDirection:  'row',
                flex: 3,
                alignItems: 'center'
            },
    
    searchButtonStyle: {
        alignItems: 'center'
    },
    searchButtonTextStyle: {
        color: commonStyles.WHITE,
        fontFamily: commonStyles.MAIN_FONT,
        fontSize: 45
    },
    separateFilters: {
        marginBottom: separatorSize
    },

    dropdown: {
        height: 50,
    },
    placeholderStyle: {
        fontSize: main_font_size,
        fontFamily: commonStyles.MAIN_FONT,
        color: commonStyles.LIGHT_GRAY
    },
    selectedTextStyle: {
        fontSize: 16,
    },
})

export default Filters;