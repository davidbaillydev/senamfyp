import React, {useState,useEffect} from "react";
import {PermissionsAndroid, TouchableWithoutFeedback,ScrollView,StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, Button, FlatList, TextInput } from "react-native";
import * as commonStyles from "../../utils/commonStyles";
import ReturnOrNext from "../../components/createEventComponents/createEventParts/ReturnOrNext";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { APP_URL_EMU } from "../../utils/config";
import EventLocationInput from "../../components/createEventComponents/createEventParts/EventLocationInput";
import FYPTextInput from "../../components/createEventComponents/createEventParts/FYPTextInput";
import Clipboard from '@react-native-clipboard/clipboard';

function EditEvent(props){

    const [event,setEvent] = useState({});

    const [inputName,setInputName] = useState(null);
    const [descInput,setDescInput] = useState(null);

    const [onCategory,setOnCategory] = useState(false);
    const [onDesc,setOnDesc] = useState(false);
    const [onPhoto,setOnPhoto] = useState(false);
    const [selectableCat,setSelectableCat] = useState("");

    const [category,setCategory] = useState(null);
    const [name,setName] = useState(null);
    const [desc,setDesc] = useState(null);
    const [othersPhotos,setOthersPhotos] = useState([]);
    const [mainPhoto,setMainPhoto] = useState("");
    const [address,setAddress] = useState(null);
    const [streetNumber,setStreetNumber] = useState("");
    const [street,setStreet] = useState("");
    const [zipcode,setZipcode] = useState("");
    const [city,setCity] = useState("");
    const [country,setCountry] = useState("");
    const [lat,setLat] = useState("");
    const [lng,setLng] = useState("");
    const [labelAddress,setLabelAddress] = useState("");

    const [errors,setErrors] = useState({});

    // console.log(othersPhotos);

    const deletePhoto = (index) => {
        setOthersPhotos([
            ...othersPhotos.slice(0,index),
            ...othersPhotos.slice(index+1)
        ])
    }

    const setAddressComponents = (address,errors) => {
        var new_errors = errors;
        if (address == ""){
            new_errors.address = "Vous devez spécifier une adresse";
        } else {
            new_errors.address = "";
            var geo = address.geometry;
            var prop = address.properties;
            setAddress(prop.label);
            {prop.housenumber && setStreetNumber(prop.housenumber)};
            {prop.street && setStreet(prop.street)};
            {prop.postcode && setZipcode(prop.postcode)};
            {prop.city && setCity(prop.city)};
            setCountry("France");
            {geo.coordinates && setLat(geo.coordinates[0])};
            {geo.coordinates && setLng(geo.coordinates[1])};
        }
        return new_errors;
    }

    useEffect(() => {
        setEvent(props.route.params.event)
        setCategory(props.route.params.event.category);
        props.route.params.event.category === "Evènements festifs" ? setSelectableCat("Autres évènements") : setSelectableCat("Evènements festifs");
        setName(props.route.params.event.name);
        props.route.params.event.description === "null" ? setDesc("") : setDesc(props.route.params.event.description);
        setMainPhoto(props.route.params.event.main_photo);
        setOthersPhotos(JSON.parse(props.route.params.event.others_photos));
        setAddress(setAddressFromDB());
        setStreetNumber(props.route.params.event.street_number);
        setStreet(props.route.params.event.street);
        setZipcode(props.route.params.event.zipcode);
        setCity(props.route.params.event.city);
        setCountry(props.route.params.event.country);
        setLat(props.route.params.event.lat);
        setLng(props.route.params.event.lng);
        setLabelAddress(props.route.params.event.label_address);

    },[])

    const setAddressFromDB = () => {
        return(
            props.route.params.event.street_number + " " +
            props.route.params.event.street + " " +
            props.route.params.event.zipcode + " " +
            props.route.params.event.city
        );
    }
    
    const handleSubmit = () => {
        var current_errors = {};

        if (name !== ""){
            current_errors.name="";
        } else {
            current_errors.name = "Vous devez spécifier un titre d'évènement";
        }
        
        typeof(address) !== "string" && address.length != 0 ? current_errors = setAddressComponents(address,current_errors) : null;
        
        if (labelAddress !== ""){
            current_errors.labelAddress="";
        } else {
            current_errors.labelAddress = "Vous devez spécifier una adresse à afficher";
        }
        setErrors(current_errors);
        !current_errors.labelAddress &&
        !current_errors.name ?
        edit() : null;
    }

    const edit = () => {
        let bodyFormData = new FormData();

        bodyFormData.append("category",category);
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

        fetch(APP_URL_EMU + "/api/events/edit/"+event.id, { method: 'POST', body: bodyFormData })
            .then((responseData) => {
                if (responseData.errors){
                    console.log(responseData);
                } else if (responseData['error']){
                    console.log(responseData);
                } else {
                    responseData.json().then((responseData) => {
                        console.log(responseData);
                        props.navigation.navigate("HandleEvent",{"event":responseData});
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.heroPart}>
                <Image source={{ uri: APP_URL_EMU + "/" + event.main_photo }} style={styles.heroImg} />
            </View>
            <TouchableOpacity onPress={() => { props.navigation.navigate("HandleEvent",{event:event}) }}>
                <Image source={require('../../assets/white_arrow.png')} style={styles.return} />
            </TouchableOpacity>
            <ScrollView style={styles.scroll} keyboardShouldPersistTaps="handled">
                <View style={styles.headerContainer}>
                    <View style={styles.header}>
                        <View style={styles.headerImgPart}>
                            <Image style={styles.headerImg} source={require('../../assets/CreateEvent/Recap.png')} />
                        </View>
                        <Text style={styles.headerTxt}>Récapitulatif de l'évènement</Text>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.content}>
                        <View style={styles.catAndTitlePart}>
                            <TouchableOpacity  style={styles.category} onPress={()=>setOnCategory(!onCategory)}>
                                <Text style={styles.titleTxt}>{category}</Text>
                                <Image style={styles.editImgLittle} source={require('../../assets/CreateEvent/Edit.png')}/>
                                {onCategory ? 
                                <TouchableOpacity style={styles.dropCat} onPress={()=>{setCategory(selectableCat);setSelectableCat(category);setOnCategory(false)}}>
                                    <Text style={styles.selectableTxt}>{selectableCat}</Text>
                                </TouchableOpacity>
                                :null}
                            </TouchableOpacity>
                            <Text style={styles.titleTxt}>-</Text>
                            <TouchableOpacity style={styles.title} onPress={()=>inputName.focus()}>
                                <TextInput style={styles.titleTxt}
                                    onChangeText={(value)=>setName(value)}
                                    ref={(input)=>setInputName(input)}
                                    value={name}
                                    placeholder="Titre"
                                    placeholderTextColor={commonStyles.DARK_WHITE}
                                    />
                                <Image style={styles.editImgLittle} source={require('../../assets/CreateEvent/Edit.png')}/>
                            </TouchableOpacity>
                        </View>
                        {errors.name ? 
                        <View style={styles.error}>
                            <Text style={commonStyles.ERROR_TEXT}>{errors.name}</Text> 
                        </View>
                        : null}
                        <TouchableOpacity style={{...styles.descPart,zIndex:onDesc ? 2 : 1,borderColor:onDesc ? commonStyles.MEDIUM_ORANGE : commonStyles.BLACK }} onPress={()=>{setOnDesc(!onDesc);onDesc ? descInput.blur() : descInput.focus()}}>
                            <View style={styles.descTitle}>
                                <Image style={styles.descImg} source={require('../../assets/CreateEvent/Desc.png')} />
                                <Text style={styles.descTitleTxt}>Description</Text>
                                {onDesc ? 
                                <TouchableOpacity style={styles.cross} onPress={()=>{setOnDesc(false);descInput.blur()}}>
                                    <Image style={styles.crossImgLittle} source={require('../../assets/CreateEvent/Cross.png')}/> 
                                </TouchableOpacity>
                                : 
                                <Image style={styles.editImgLittle} source={require('../../assets/CreateEvent/Edit.png')}/>
                                }
                            </View>
                            <View style={styles.descContent}>
                                <TextInput 
                                multiline={true}
                                onEndEditing={()=>setOnDesc(false)} 
                                onFocus={()=>setOnDesc(true)} 
                                ref={input => setDescInput(input)} 
                                style={styles.descInput}
                                onChangeText={(text)=>setDesc(text)}
                                value={desc}
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.photosPart} onPress={()=>setOnPhotos(true)}>
                            <View style={styles.photoTitle}>
                                <Text style={styles.titleTxt}>Photos ajoutées : </Text>
                                <Image style={styles.editImgLittle} source={require('../../assets/CreateEvent/Edit.png')}/>
                            </View>
                            <View style={styles.photos}>
                                {/* <TouchableOpacity style={styles.addPhoto} onPress={()=>setOnPhoto(true)}>
                                    <Image style={styles.imgAddPhoto} source={require('../../../assets/CreateEvent/Plus.png')}/>
                                </TouchableOpacity> */}
                                <View style={styles.photo}>
                                    {/* {mainPhoto.length != 0 ? <Image source={{ uri: mainPhoto}} style={styles.img}/> : null} */}
                                </View>
                                {othersPhotos.length != 0 ? 
                                othersPhotos.map((photo,index)=>{
                                    return(
                                    <View key={index} style={styles.photo}>
                                        <Image source={{ uri: APP_URL_EMU + "/" + photo}} style={styles.img}/>
                                        <TouchableOpacity style={styles.deletePhoto} onPress={()=>deletePhoto(index)}>
                                            <Image style={styles.crossPhoto} source={require('../../assets/CreateEvent/Plus.png')}/>
                                        </TouchableOpacity>
                                    </View>);
                                })
                                :<TouchableOpacity style={styles.addPhoto} onPress={()=>setOnPhoto(true)}>
                                    <Text style={styles.titleTxt}>Aucune</Text>
                                </TouchableOpacity>}
                                
                            </View>
                            <View style={styles.placePart}>
                                <Image style={styles.mapIcon} source={require('../../assets/CreateEvent/Map.png')}/>
                                <View style={styles.addresses}>
                                    <EventLocationInput setAddress={setAddress} address={setAddressFromDB}/>
                                    <View style={styles.textInput}>
                                        <FYPTextInput placeholder="Adresse à afficher" setText={setLabelAddress} text={props.route.params.event.label_address}/>
                                    </View>
                                </View>
                            </View>
                            {errors.labelAddress ? 
                            <View style={styles.error}>
                                <Text style={commonStyles.ERROR_TEXT}>{errors.labelAddress}</Text> 
                            </View>
                            : null}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <ReturnOrNext return={false} next={handleSubmit} end={true} {...props}/>
        </SafeAreaView>
    )

}


export default EditEvent

const styles = StyleSheet.create({
    container:{
        backgroundColor:commonStyles.BLACK,
        height:'100%',
        width:"100%",
    },
    heroPart: {
        height: '20%',
    },
    heroImg: {
        height: "100%",
        width: "100%"
    },
    return: {
        position: 'absolute',
        top: -120,
        left: 10,
        width: commonStyles.WIDTH > 370 ? 25 : 20,
        height: commonStyles.WIDTH > 370 ? 25 : 20
    },
    error: {
        alignItems: 'center',
        marginBottom: "3%",
        marginTop:"3%"
    },
    scroll: {
        marginTop: "10%",
        width: "100%",
    },
    headerContainer: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        borderColor: commonStyles.MEDIUM_ORANGE,
        borderWidth: 2,
        borderRadius: 2,
        width: "85%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerImgPart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerImg: {
        width: commonStyles.WIDTH > 370 ? 22 : 20,
        height: commonStyles.WIDTH > 370 ? 22 : 20
    },
    headerTxt: {
        flex: 4,
        fontFamily: commonStyles.MAIN_FONT,
        fontSize: commonStyles.WIDTH > 370 ? 21 : 17,
        color: commonStyles.WHITE,
        padding: "3%",
        borderColor:commonStyles.MEDIUM_ORANGE,
        borderLeftWidth:2,
        paddingLeft:"7%",
    },
    contentContainer: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    content:{
        width: "85%",
    },
        catAndTitlePart: {
            zIndex:2,
            flex:1,
            flexDirection: 'row',
            justifyContent:"center",
            alignItems: 'center',
            height:60,
        },
        titleTxt:{
            fontFamily: commonStyles.MAIN_FONT,
            fontSize: commonStyles.WIDTH > 370 ? 18 : 15,
            color: commonStyles.WHITE,
            padding:0,
            margin:0
        },
        editImgLittle: {
            width: commonStyles.WIDTH > 370 ? 18 : 15,
            height: commonStyles.WIDTH > 370 ? 18 : 15,
            marginLeft:commonStyles.WIDTH > 370 ? 10 : 8
        },
        category:{
            flexDirection: 'row',
            marginRight:commonStyles.WIDTH > 370 ? 15 : 10,
            alignItems: 'center',
        },
        title:{
            flexDirection: 'row',
            marginLeft:commonStyles.WIDTH > 370 ? 15 : 10,
            alignItems: 'center',
        },
        dropCat:{
            zIndex:2,
            backgroundColor:commonStyles.BLACK,
            position:"absolute",
            top:25,
            borderColor: commonStyles.MEDIUM_ORANGE,
            borderWidth: 2,
            borderRadius: 2,
        },
        selectableTxt:{
            fontFamily: commonStyles.MAIN_FONT,
            fontSize: commonStyles.WIDTH > 370 ? 16 : 13,
            color: commonStyles.WHITE,
            margin:commonStyles.WIDTH > 370 ? 5 : 4,
        },
        descPart:{
            flex:2,
            zIndex:1,
            marginBottom:"5%",
            borderRadius:4,
            padding:"2%",
            borderWidth:2
        },
            descTitle:{
                flexDirection: 'row',
                alignItems:'center',
            },
                descImg:{
                    width: commonStyles.WIDTH > 370 ? 18 : 15,
                    height: commonStyles.WIDTH > 370 ? 18 : 15
                },
                descTitleTxt:{
                    fontFamily: commonStyles.MAIN_FONT,
                    fontSize: commonStyles.WIDTH > 370 ? 18 : 15,
                    color: commonStyles.WHITE,
                    paddingHorizontal:"5%"
                },
                cross:{
                    position:'absolute',
                    right:0
                },
                crossImgLittle:{
                    width: commonStyles.WIDTH > 370 ? 15 : 12,
                    height: commonStyles.WIDTH > 370 ? 15 : 12,
                },
            descContent:{
                height:80,
                overflow:"hidden",
            },
                descInput:{
                    fontFamily: commonStyles.MAIN_FONT,
                    fontSize: commonStyles.WIDTH > 370 ? 15 : 12,
                    color: commonStyles.WHITE,
                    width:"95%",
                    overflow:"hidden",
                },
    photoTitle:{
        flexDirection: 'row',
        marginBottom:"3%"
    },  
        addPhoto:{
            width:commonStyles.WIDTH > 370 ? 100 : 80, 
            height:commonStyles.HEIGHT > 370 ? 75 : 60,
            marginRight:"3%",
            backgroundColor:commonStyles.GRAY,
            justifyContent: 'center',
            alignItems: 'center',
        },
            imgAddPhoto:{
                width: commonStyles.WIDTH > 370 ? 25 : 21,
                height: commonStyles.WIDTH > 370 ? 25 : 21,
            },
        photos:{
            flexDirection: 'row',
        },
        img:{
            width:commonStyles.WIDTH > 370 ? 100 : 80, 
            height:commonStyles.HEIGHT > 370 ? 75 : 60,
            marginRight:"3%"
        },
        deletePhoto:{
            position:"absolute",
            right:0,
            top:-5
        },
        crossPhoto:{
            width: commonStyles.WIDTH > 370 ? 22 : 18,
            height: commonStyles.WIDTH > 370 ? 22 : 18,
            transform:[{rotate:'45deg'}],
        },
        placePart:{
            marginTop:"5%",
            borderColor: commonStyles.MEDIUM_ORANGE,
            borderWidth: 2,
            borderRadius: 4,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: "5%"
        },
            mapIcon:{
                width: commonStyles.WIDTH > 370 ? 35 : 28,
                height: commonStyles.WIDTH > 370 ? 35 : 28,
                marginVertical:"5%",
                marginHorizontal:"3%",
            },
        textInput:{
            marginLeft:"3%"
        },
            webTitle:{
                flexDirection: 'row',
                alignItems: 'center',
            },
            link:{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:"space-between",
                marginBottom:"5%"
            },
            copyIcon:{
                width: commonStyles.WIDTH > 370 ? 20 : 15,
                height: commonStyles.HEIGHT > 370 ? 20 : 15
            }

});