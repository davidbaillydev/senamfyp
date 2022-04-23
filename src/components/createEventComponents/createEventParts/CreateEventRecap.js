import React, {useState,useEffect} from "react";
import {PermissionsAndroid, TouchableWithoutFeedback,ScrollView,StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, Button, FlatList, TextInput } from "react-native";
import * as commonStyles from "../../../utils/commonStyles";
import ReturnOrNext from "./ReturnOrNext";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { APP_URL_EMU } from "../../../utils/config";
import PriceDetail from "./PriceDetail";
import EventLocationInput from "./EventLocationInput";
import FYPTextInput from "./FYPTextInput";
import Clipboard from '@react-native-clipboard/clipboard';

function CreateEventRecap(props){

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
    const [labelAddress,setLabelAddress] = useState(null);

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
        } else if(!address.geometry.coordinates){
            new_errors.address = "Vous devez spécifier une adresse valide";
        } else {
            new_errors.address = "";
            var geo = address.geometry;
            var prop = address.properties;
            props.setAddress(prop.label);
            {prop.housenumber && props.setStreetNumber(prop.housenumber)};
            {prop.street && props.setStreet(prop.street)};
            {prop.postcode && props.setZipcode(prop.postcode)};
            {prop.city && props.setCity(prop.city)};
            props.setCountry("France");
            {geo.coordinates && props.setLat(geo.coordinates[0])};
            {geo.coordinates && props.setLng(geo.coordinates[1])};
        }
        return new_errors;
    }

    useEffect(() => {
        setCategory(props.category);
        props.category === "Evènements festifs" ? setSelectableCat("Autres évènements") : setSelectableCat("Evènements festifs");
        setName(props.name);
        setDesc(props.desc);
        setMainPhoto(props.mainPhoto);
        setOthersPhotos(props.othersPhotos);
        setAddress(props.address);
        setLabelAddress(props.labelAddress);
    },[])
    
    const handleSubmit = () => {
        var current_errors = {};

        
        category != props.category ? props.setCategory(category) : null;

        if (name !== ""){
            name != props.name ? props.setName(name) : null;
            current_errors.name="";
        } else {
            current_errors.name = "Vous devez spécifier un titre d'évènement";
        }
        
        desc != props.desc ? props.setDesc(desc) : null;
        address != props.address ? current_errors = setAddressComponents(address,current_errors) : null;
        
        if (labelAddress !== ""){
            labelAddress != props.labelAddress ? props.setLabelAddress(labelAddress) : null;
            current_errors.labelAddress="";
        } else {
            current_errors.labelAddress = "Vous devez spécifier una adresse à afficher";
        }
        setErrors(current_errors);
        !current_errors.labelAddress &&
        !current_errors.name ?
        props.validate() : null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll} keyboardShouldPersistTaps="handled">
                <View style={styles.headerContainer}>
                    <View style={styles.header}>
                        <View style={styles.headerImgPart}>
                            <Image style={styles.headerImg} source={require('../../../assets/CreateEvent/Recap.png')} />
                        </View>
                        <Text style={styles.headerTxt}>Récapitulatif de l'évènement</Text>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.content}>
                        <View style={styles.catAndTitlePart}>
                            <TouchableOpacity  style={styles.category} onPress={()=>setOnCategory(!onCategory)}>
                                <Text style={styles.titleTxt}>{category}</Text>
                                <Image style={styles.editImgLittle} source={require('../../../assets/CreateEvent/Edit.png')}/>
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
                                <Image style={styles.editImgLittle} source={require('../../../assets/CreateEvent/Edit.png')}/>
                            </TouchableOpacity>
                        </View>
                        {errors.name ? 
                        <View style={styles.error}>
                            <Text style={commonStyles.ERROR_TEXT}>{errors.name}</Text> 
                        </View>
                        : null}
                        <TouchableOpacity style={{...styles.descPart,zIndex:onDesc ? 2 : 1,borderColor:onDesc ? commonStyles.MEDIUM_ORANGE : commonStyles.BLACK }} onPress={()=>{setOnDesc(!onDesc);onDesc ? descInput.blur() : descInput.focus()}}>
                            <View style={styles.descTitle}>
                                <Image style={styles.descImg} source={require('../../../assets/CreateEvent/Desc.png')} />
                                <Text style={styles.descTitleTxt}>Description</Text>
                                {onDesc ? 
                                <TouchableOpacity style={styles.cross} onPress={()=>{setOnDesc(false);descInput.blur()}}>
                                    <Image style={styles.crossImgLittle} source={require('../../../assets/CreateEvent/Cross.png')}/> 
                                </TouchableOpacity>
                                : 
                                <Image style={styles.editImgLittle} source={require('../../../assets/CreateEvent/Edit.png')}/>
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
                                <Image style={styles.editImgLittle} source={require('../../../assets/CreateEvent/Edit.png')}/>
                            </View>
                            <View style={styles.photos}>
                                {/* <TouchableOpacity style={styles.addPhoto} onPress={()=>setOnPhoto(true)}>
                                    <Image style={styles.imgAddPhoto} source={require('../../../assets/CreateEvent/Plus.png')}/>
                                </TouchableOpacity> */}
                                <View style={styles.photo}>
                                    {mainPhoto.length != 0 ? <Image source={{ uri: mainPhoto}} style={styles.img}/> : null}
                                </View>
                                {othersPhotos.length != 0 ? othersPhotos.map((photo,index)=>{
                                    return(
                                    <View key={index} style={styles.photo}>
                                        {/* <Image source={{ uri: photo}} style={styles.img}/> */}
                                        <TouchableOpacity style={styles.deletePhoto} onPress={()=>deletePhoto(index)}>
                                            <Image style={styles.crossPhoto} source={require('../../../assets/CreateEvent/Plus.png')}/>
                                        </TouchableOpacity>
                                    </View>);
                                }):null}
                                
                            </View>
                            <View style={styles.placePart}>
                                <Image style={styles.mapIcon} source={require('../../../assets/CreateEvent/Map.png')}/>
                                <View style={styles.addresses}>
                                    <EventLocationInput setAddress={setAddress} address={props.address}/>
                                    <View style={styles.textInput}>
                                        <FYPTextInput placeholder="Adresse à afficher" setText={setLabelAddress} text={props.labelAddress}/>
                                    </View>
                                </View>
                            </View>
                            {errors.labelAddress ? 
                            <View style={styles.error}>
                                <Text style={commonStyles.ERROR_TEXT}>{errors.labelAddress}</Text> 
                            </View>
                            : null}
                            <View style={styles.webPart}>
                                <View style={styles.webTitle}>
                                    <Image style={styles.mapIcon} source={require('../../../assets/CreateEvent/Web.png')}/>
                                    <Text style={styles.titleTxt}>Lien de votre billeterie FYP</Text>
                                </View>
                                <View style={styles.link}>
                                    <Text style={styles.titleTxt}>https://findyourparty.fr/event/{props.eventCode}</Text>
                                    <TouchableOpacity onPress={()=>Clipboard.setString("https://findyourparty.fr/event/"+props.eventCode)}>
                                        <Image style={styles.copyIcon} source={require('../../../assets/CreateEvent/Copy.png')}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <ReturnOrNext return="QRCodes" next={handleSubmit} end={true} {...props}/>
        </SafeAreaView>
    )

}


export default CreateEventRecap

const styles = StyleSheet.create({
    container:{
        backgroundColor:commonStyles.BLACK,
        height:'100%',
        width:"100%",
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