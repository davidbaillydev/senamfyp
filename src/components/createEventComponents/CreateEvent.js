import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, PermissionsAndroid, Animated, TextInput, Switch, Button, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { render } from "react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod";
import LocationTextInput from "../searchComponents/LocationTextInput";
import { DARK_ORANGE, LIGHT_ORANGE, MEDIUM_ORANGE } from "../../utils/commonStyles";
import * as commonStyles from "../../utils/commonStyles";
import SelectDropdown from "react-native-select-dropdown";
import * as data from "../../utils/data";
import * as functions from "../../utils/functions";
import DateTimePicker from '@react-native-community/datetimepicker';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CategoryItem from "../eventComponents/CategoryItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserTextInput from "../eventComponents/UserTextInput";
import CollaboratorItem from "../eventComponents/CollaboratorItem";
import { APP_URL_EMU } from "../../utils/config";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import CreateEventCharacteristics from "./createEventParts/CreateEventCharacteristics";
import CreateEventCategory from "./createEventParts/CreateEventCategory";
import CreateEventMainInfos from "./createEventParts/CreateEventMainInfos";
import CreateEventPhotos from "./createEventParts/CreateEventPhotos";
import CreateEventPrices from "./createEventParts/CreateEventPrices";
import CreateEventQRCodes from "./createEventParts/CreateEventQRCodes";
import CreateEventRecap from "./createEventParts/CreateEventRecap";


const CreateEvent = (props) => {

    const [numberOfCategory,setNumberOfCategory] = useState(1);

    const [address,setAddress] = useState("");

    // event 
    const [category,setCategory] = useState([]);
    const [type,setType] = useState([]);
    const [moods,setMoods] = useState([]);
    const [characs,setCharacs] = useState([]);
    const [name,setName] = useState("");
    const [desc,setDesc] = useState("");
    const [streetNumber,setStreetNumber] = useState("");
    const [street,setStreet] = useState("");
    const [zipcode,setZipcode] = useState("");
    const [city,setCity] = useState("");
    const [country,setCountry] = useState("");
    const [lat,setLat] = useState("");
    const [lng,setLng] = useState("");
    const [labelAddress,setLabelAddress] = useState("");
    const [date, setDate] = useState("");
    const [timeFrom, setTimeFrom] = useState("");
    const [timeTo, setTimeTo] = useState("");
    const [visibility,setVisibility] = useState("");
    const [collaboratorsUserIds,setCollaboratorsUserIds] = useState([]);
    const [collaboratorsRoles,setCollaboratorsRoles] = useState([]);
    const [mainPhoto,setMainPhoto] = useState("");
    const [othersPhotos,setOthersPhotos] = useState([]);
    const [categoriesNumber,setCategoriesNumber] = useState([]);
    const [categoriesPrice,setCategoriesPrice] = useState([]);
    const [categoriesName,setCategoriesName] = useState([]);
    const [categoriesDescription,setCategoriesDescription] = useState([]);
    const [categoriesTimerDateFrom,setCategoriesTimerDateFrom] = useState([]);
    const [categoriesTimerDateTo,setCategoriesTimerDateTo] = useState([]);
    const [categoriesTimerHourFrom,setCategoriesTimerHourFrom] = useState([]);
    const [categoriesTimerHourTo,setCategoriesTimerHourTo] = useState([]);
    const [categoriesInfo,setCategoriesInfo] = useState([]);
    const [categoriesValidDateFrom,setCategoriesValidDateFrom] = useState([]);
    const [categoriesValidHourFrom,setCategoriesValidHourFrom] = useState([]);
    const [categoriesValidDateTo,setCategoriesValidDateTo] = useState([]);
    const [categoriesValidHourTo,setCategoriesValidHourTo] = useState([]);
    const [eventCode,setEventCode] = useState("");

    useEffect(()=>{
        var code = functions.generateCode();
        console.log(code);
        setEventCode(code);
        

    },[])

    useEffect(()=>{
        
    },[props.navigation])
    

  const createEvent = async () => {
    const id = await AsyncStorage.getItem("user_id");


    let bodyFormData = new FormData();
    bodyFormData.append("user_id",id);
    bodyFormData.append("category",category);
    bodyFormData.append("type",type);
    bodyFormData.append("moods",JSON.stringify(moods));
    bodyFormData.append("characs",JSON.stringify(characs));
    bodyFormData.append("name",name);
    bodyFormData.append("description",desc);
    bodyFormData.append("street_number",streetNumber);
    bodyFormData.append("street",street);
    bodyFormData.append("zipcode",zipcode);
    bodyFormData.append("city",city);
    bodyFormData.append("country",country);
    bodyFormData.append("lat",lat);
    bodyFormData.append("lng",lng);
    bodyFormData.append("label_address",labelAddress);
    bodyFormData.append("date",date);
    bodyFormData.append("time_from",timeFrom);
    bodyFormData.append("time_to",timeTo);
    bodyFormData.append("visibility",visibility);
    bodyFormData.append("collaborators_user_ids",JSON.stringify(collaboratorsUserIds));
    bodyFormData.append("collaborators_roles",JSON.stringify(collaboratorsRoles));
    bodyFormData.append("main_photo",mainPhoto);
    bodyFormData.append("others_photos",JSON.stringify(othersPhotos));
    bodyFormData.append("categories_numbers",JSON.stringify(categoriesNumber));
    bodyFormData.append("categories_prices",JSON.stringify(categoriesPrice));
    bodyFormData.append("categories_names",JSON.stringify(categoriesName));
    bodyFormData.append("categories_description",JSON.stringify(categoriesDescription))
    bodyFormData.append("categories_timer_dates_from",JSON.stringify(categoriesTimerDateFrom));
    bodyFormData.append("categories_timer_dates_to",JSON.stringify(categoriesTimerDateTo));
    bodyFormData.append("categories_timer_hours_from",JSON.stringify(categoriesTimerHourFrom));
    bodyFormData.append("categories_timer_hours_to",JSON.stringify(categoriesTimerHourTo));
    bodyFormData.append("categories_comments",JSON.stringify(categoriesInfo));
    bodyFormData.append("categories_valid_dates_from",JSON.stringify(categoriesValidDateFrom));
    bodyFormData.append("categories_valid_dates_to",JSON.stringify(categoriesValidDateTo));
    bodyFormData.append("categories_valid_hours_from",JSON.stringify(categoriesValidHourFrom));
    bodyFormData.append("categories_valid_hours_to",JSON.stringify(categoriesValidHourTo));
    bodyFormData.append("event_code",eventCode);

    fetch(APP_URL_EMU + "/api/events/create", { method: 'POST', body: bodyFormData })
            .then((responseData) => {
                if (responseData.errors){
                    console.log(responseData);
                } else if (responseData['error']){
                    console.log(responseData);
                } else {
                    responseData.json().then((responseData) => {
                        console.log(responseData);
                    })
                    props.navigation.navigate("UpcomingEvents");
                }
            })
            .catch((error) => {
                console.error(error);
            });
  }


const createEventStack = createNativeStackNavigator();

    return(
        
        <NavigationContainer independent={true}>
            <createEventStack.Navigator initialRouteName="Category">
                <createEventStack.Screen name="Category" 
                    children={props=>
                    <CreateEventCategory 
                        setCategory={(category) => {setCategory(category);console.log(category)}} {...props}
                    />} options={{ headerShown: false }}/>
                <createEventStack.Screen name="Characteristics" 
                    children={props=>
                    <CreateEventCharacteristics 
                        category={category}
                        setType={(type) => {setType(type);console.log(type)}} 
                        setMoods={(moods) => {setMoods(moods);console.log(moods)}} 
                        setCharacs={(characs) => {setCharacs(characs);console.log(characs)}} {...props}
                        />} options={{ headerShown: false }}/>
                <createEventStack.Screen name="MainInfos" 
                    children={props=>
                    <CreateEventMainInfos 
                        category={category}
                        type={type}
                        setAddress={(address)=> {setAddress(address);console.log(address)}}
                        setName={(name) => {setName(name);console.log(name)}} 
                        setDesc={(desc) => {setDesc(desc);console.log(desc)}} 
                        setStreetNumber={(streetNumber) => {setStreetNumber(streetNumber);console.log(streetNumber)}} 
                        setStreet={(street) => {setStreet(street);console.log(street)}}
                        setZipcode={(zipcode) => {setZipcode(zipcode);console.log(zipcode)}}
                        setCity={(city) => {setCity(city);console.log(city)}}
                        setCountry={(country) => {setCountry(country);console.log(country)}}
                        setLat={(lat) => {setLat(lat);console.log(lat)}}
                        setLng={(lng) => {setLng(lng);console.log(lng)}}
                        setLabelAddress={(labelAddress) => {setLabelAddress(labelAddress);console.log(labelAddress)}}
                        setDate={(date) => {setDate(date);console.log(date)}}
                        setHourFrom={(hourFrom) => {setTimeFrom(hourFrom);console.log(hourFrom)}}
                        setHourTo={(hourTo) => {setTimeTo(hourTo);console.log(hourTo)}}
                        setVisibility={(visibility) => {setVisibility(visibility);console.log(visibility)}}
                        setCollaboratorsUserIds={(collaboratorsUserIds) => {setCollaboratorsUserIds(collaboratorsUserIds);console.log(collaboratorsUserIds)}}
                        setCollaboratorsRoles={(collaboratorsRoles) => {setCollaboratorsRoles(collaboratorsRoles);console.log(collaboratorsRoles)}}
                        {...props}/>} options={{ headerShown: false }}/>
                <createEventStack.Screen name="Photos"
                    children={props => 
                    <CreateEventPhotos
                        setMainPhoto={(mainPhoto)=> {setMainPhoto(mainPhoto)}}
                        setOthersPhotos={(othersPhotos) => {setOthersPhotos(othersPhotos)}}
                        {...props}/>} options={{ headerShown: false }}/>
                <createEventStack.Screen name="Prices"
                    children={props => 
                    <CreateEventPrices
                        // categoriesName={categoriesName}
                        // categoriesDescription={categoriesDescription}
                        // categoriesTimerDateFrom={categoriesTimerDateFrom}
                        // categoriesTimerDateTo={categoriesTimerDateTo}
                        // categoriesTimerHourFrom={categoriesTimerHourFrom}
                        // categoriesTimerHourTo={categoriesTimerHourTo}
                        // categoriesInfo={categoriesInfo}
                        setNumberOfCategory={(numberOfCategory) => {setNumberOfCategory(numberOfCategory);console.log(numberOfCategory)}}
                        setCategoriesNumber={(categoriesNumber) => {setCategoriesNumber(categoriesNumber);console.log(categoriesNumber)}}
                        setCategoriesPrice={(categoriesPrice) => {setCategoriesPrice(categoriesPrice);console.log(categoriesPrice)}}
                        setCategoriesName={(categoriesName) => {setCategoriesName(categoriesName);console.log(categoriesName)}}
                        setCategoriesDescription={(categoriesDescription) => {setCategoriesDescription(categoriesDescription);console.log(categoriesDescription)}}
                        setCategoriesTimerDateFrom={(categoriesTimerDateFrom) =>{setCategoriesTimerDateFrom(categoriesTimerDateFrom);console.log(categoriesTimerDateFrom)}}
                        setCategoriesTimerDateTo={(categoriesTimerDateTo) =>{setCategoriesTimerDateTo(categoriesTimerDateTo);console.log(categoriesTimerDateTo)}}
                        setCategoriesTimerHourFrom={(categoriesTimerHourFrom) =>{setCategoriesTimerHourFrom(categoriesTimerHourFrom);console.log(categoriesTimerHourFrom)}}
                        setCategoriesTimerHourTo={(categoriesTimerHourTo) =>{setCategoriesTimerHourTo(categoriesTimerHourTo);console.log(categoriesTimerHourTo)}}   
                        setCategoriesInfo={(categoriesInfo) =>{setCategoriesInfo(categoriesInfo);console.log(categoriesInfo)}}                     
                        {...props}/>} options={{ headerShown: false }}/>
                <createEventStack.Screen name="QRCodes"
                    children={props => 
                    <CreateEventQRCodes
                        numberOfCategory={numberOfCategory}
                        date={date}
                        hourFrom={timeFrom}
                        hourTo={timeTo}
                        categoriesPrice={categoriesPrice}
                        categoriesNumber={categoriesNumber}
                        categoriesName={categoriesName}
                        setCategoriesValidDateFrom={(categoriesValidDateFrom) =>{setCategoriesValidDateFrom(categoriesValidDateFrom);console.log(categoriesValidDateFrom)}}
                        setCategoriesValidDateTo={(categoriesValidDateTo) =>{setCategoriesValidDateTo(categoriesValidDateTo);console.log(categoriesValidDateTo)}}
                        setCategoriesValidHourFrom={(categoriesValidHourFrom) =>{setCategoriesValidHourFrom(categoriesValidHourFrom);console.log(categoriesValidHourFrom)}}
                        setCategoriesValidHourTo={(categoriesValidHourTo) =>{setCategoriesValidHourTo(categoriesValidHourTo);console.log(categoriesValidHourTo)}}
                        {...props}/>} options={{ headerShown: false }}/>
                <createEventStack.Screen name="Recap"
                    children={props => 
                    <CreateEventRecap
                        category={category}
                        setCategory={setCategory}
                        name={name}
                        setName={setName}
                        desc={desc}
                        setDesc={setDesc}
                        mainPhoto={mainPhoto}
                        othersPhotos={othersPhotos}
                        address={address}
                        setAddress={setAddress}
                        setStreetNumber={(streetNumber) => {setStreetNumber(streetNumber);console.log(streetNumber)}} 
                        setStreet={(street) => {setStreet(street);console.log(street)}}
                        setZipcode={(zipcode) => {setZipcode(zipcode);console.log(zipcode)}}
                        setCity={(city) => {setCity(city);console.log(city)}}
                        setCountry={(country) => {setCountry(country);console.log(country)}}
                        setLat={(lat) => {setLat(lat);console.log(lat)}}
                        setLng={(lng) => {setLng(lng);console.log(lng)}}
                        setLabelAddress={(labelAddress) => {setLabelAddress(labelAddress);console.log(labelAddress)}}
                        labelAddress={labelAddress}
                        eventCode={eventCode}
                        validate={createEvent}
                        {...props}/>} options={{ headerShown: false }}/>
            </createEventStack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        backgroundColor:commonStyles.BLACK,
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems: 'center'
    }
});

export default CreateEvent;
