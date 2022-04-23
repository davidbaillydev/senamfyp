import React, {useState,useEffect} from "react";
import { TouchableWithoutFeedback,ScrollView,StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, Button, FlatList, TextInput } from "react-native";
import * as commonStyles from "../../../utils/commonStyles";
import * as functions from "../../../utils/functions";
import EventLocationInput from "./EventLocationInput";
import ReturnOrNext from "./ReturnOrNext";
import DateTimePicker from '@react-native-community/datetimepicker';
import FYPTextInput from "./FYPTextInput";
import { APP_URL_EMU } from "../../../utils/config";

const CreateEventMainInfos = (props) => {

    const [scrollView,setScrollView] = useState(null);
    const [titleInput,setTitleInput] = useState(null);
    const [descInput,setDescInput] = useState(null);
    const [adminInput,setAdminInput] = useState(null);

    const [dateDisplay,setDateDisplay] = useState(null);
    const [hourFromDisplay,setHourFromDisplay] = useState(null);
    const [hourToDisplay,setHourToDisplay] = useState(null);
    const [userList,setUserList]= useState([]);
    const [userAdmins,setUserAdmins] = useState([]);
    const [userScanners,setUserScanners] = useState([]);

    const [onDesc,setOnDesc] = useState(false);
    const [onDate,setOnDate] = useState(false);
    const [onHourFrom,setOnHourFrom] = useState(false);
    const [onHourTo,setOnHourTo] = useState(false);
    const [onRoles,setOnRoles] = useState(false);
    const [onAddAdmin,setOnAddAdmin] = useState(false);
    const [onAddScanner,setOnAddScanner] = useState(false);

    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [date,setDate] = useState("");
    const [hourFrom,setHourFrom] = useState("");
    const [hourTo,setHourTo] = useState("");
    const [visibility,setVisibility] = useState("");
    const [address,setAddress] = useState("");
    const [labelAddress,setLabelAddress] = useState("");

    const dotWhite = require('../../../assets/CreateEvent/DotWhite.png');
    const dotTransp = require('../../../assets/CreateEvent/DotTransp.png');
    const dotOrange = require('../../../assets/CreateEvent/DotOrange.png');

    const [errors,setErrors] = useState({});
    
    const clearAll =() => {
        setOnDesc(false);
        setOnRoles(false);
        descInput.blur();
    }

    const handleDatePicker = (event,date) => {
        setOnDate(false);
        if (event.type !== "dismissed"){
            setDate(functions.formatDateForDB(date));
            setDateDisplay(functions.formatDateFromPicker(date));
        }
    }

    const handleHourFromPicker = (event,date) => {
        setOnHourFrom(false);
        if (event.type !== "dismissed"){
            setHourFrom(functions.formatTimeForDB(date));
            setHourFromDisplay(functions.formatTimeFromPicker(date));
        }
        
    }

    const handleHourToPicker = (event,date) => {
        setOnHourTo(false);
        if (event.type !== "dismissed"){
            setHourTo(functions.formatTimeForDB(date));
            setHourToDisplay(functions.formatTimeFromPicker(date));
        }
    }

    const setAddressComponents = (address,errors) => {
        var new_errors = errors;
        console.log(address);
        if (!address){
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
        console.log(new_errors)
        return new_errors;
    }

    const searchUser = (search) => {
        var users = [];
        fetch(APP_URL_EMU + "/api/users/search/"+search, { method: 'GET'})
        .then((response) => response.json())
        .then((responseData)=>{
            for (var i=0; i<responseData.length; i++){
                users.push({"pseudo":responseData[i].pseudo,"id":responseData[i].id});
            };
            
        }).then(()=>
            {
            setUserList(users)}
        )
        .catch((error) => {
            console.log(error);
            
        });
        
    }

    const addUserAdmin = (user) => {
        var already_in = false;
        for (let i = 0; i < userAdmins.length; i++){
            if (userAdmins[i] === user){
                already_in = true;
            }
        }

        if (!already_in){
            setUserAdmins([
                ...userAdmins,
                user
            ]);
            setOnAddAdmin(false);
            setUserList([]);
        }
    }

    const deleteUserAdmin = (index) => {
        setUserAdmins([
            ...userAdmins.slice(0,index),
            ...userAdmins.slice(index+1)
        ])
    }

    const addUserScanner = (user) => {
        var already_in = false;
        for (let i = 0; i < userScanners.length; i++){
            if (userScanners[i] === user){
                already_in = true;
            }
        }

        if (!already_in){
            setUserScanners([
                ...userScanners,
                user
            ]);
            setOnAddScanner(false);
            setUserList([]);
        }
    }

    const deleteUserScanner = (index) => {
        setUserScanners([
            ...userScanners.slice(0,index),
            ...userScanners.slice(index+1)
        ])
    }

    const setCollaborators = () => {
        var ids = [];
        var roles = [];

        userAdmins.map((user) => {
            ids.push(user.id);
            roles.push("Admin");
        });

        userScanners.map((user) =>{
            ids.push(user.id);
            roles.push("Scanner");
        })

        props.setCollaboratorsUserIds(ids);
        props.setCollaboratorsRoles(roles);
    }

    const handleSubmit = () => {
        var current_errors = {};

        // Obligatoire
        if (title.length != 0){
            props.setName(title);
            current_errors.title="";
        } else {
            current_errors.title = "Vous devez spécifier un titre d'évènement";
        }

        // Facultatif
        props.setDesc(desc);

        // Obligatoire
        current_errors = setAddressComponents(address,current_errors);

        if (labelAddress.length != 0){
            props.setLabelAddress(labelAddress);
            current_errors.labelAddress = "";
        } else {
            current_errors.labelAddress = "Vous devez spécifier une adresse à afficher"
        }

        if (date.length == 0){
            current_errors.date= "Vous devez spécifier une date"
        } else {
            current_errors.date = "";
            props.setDate(date)
        }

        console.log(hourFrom);
        if (hourFrom.length == 0){
            current_errors.hourFrom = "Vous devez spécifier une heure de début"
        } else {
            current_errors.hourFrom = "";
            props.setHourFrom(hourFrom);
        }
        
        if (hourTo.length == 0){
            current_errors.houtTo = "Vous devez spécifier une heure de fin"
        } else {
            current_errors.hourTo = "";
            props.setHourTo(hourTo);
        }

        if (visibility.length == 0){
            current_errors.visibility = "Vous devez spécifier la visibilité de votre évènement"
        } else {
            current_errors.visibility = ""
            props.setVisibility(visibility);
        }
        
        setCollaborators();
        setErrors(current_errors);
        !current_errors.title && 
        !current_errors.address && 
        !current_errors.labelAddress && 
        !current_errors.date && 
        !current_errors.hourFrom && 
        !current_errors.hourTo && 
        !current_errors.visibility ?
         props.navigation.navigate("Photos") : null;
    }

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled" scrollToOverflowEnabled={true} ref={scroll => setScrollView(scroll)} style={styles.scroll}>
                <View style={styles.returnMulPart}>
                    <TouchableOpacity style={styles.linkReturn} onPress={() => props.navigation.navigate("Category")}>
                        <Text style={styles.linkReturnTxt}>{props.category}</Text>
                    </TouchableOpacity>
                    <Text style={styles.linkReturnTxt}>-</Text>
                    <TouchableOpacity style={styles.linkReturn} onPress={() => props.navigation.navigate("Characteristics")}>
                        <Text style={styles.linkReturnTxt}>{props.type}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.titlePart} onPress={()=>titleInput.focus()}>
                    <View style={styles.header}>
                        <View style={styles.headerImgPart}>
                            <Image style={styles.headerImg} source={require('../../../assets/CreateEvent/Title.png')} />
                        </View>
                        <TextInput 
                            ref={input => setTitleInput(input)} 
                            style={styles.headerTxt} 
                            placeholder={"Titre de l'évènement"} 
                            placeholderTextColor={commonStyles.DARK_WHITE}
                            onChangeText={setTitle}
                            maxLength={20}
                        />
                        <View style={styles.editImgPart}>
                            <Image style={styles.editImg} source={require('../../../assets/CreateEvent/Edit.png')} />
                        </View>
                    </View>
                </TouchableOpacity>
                {errors.title ? 
                <View style={styles.error}>
                    <Text style={commonStyles.ERROR_TEXT}>{errors.title}</Text> 
                </View>
                : null}
                <TouchableOpacity style={{...styles.descPart,zIndex:onDesc ? 2 : 1,borderColor:onDesc ? commonStyles.MEDIUM_ORANGE : commonStyles.BLACK }} onPress={()=>{setOnDesc(!onDesc);onDesc ? descInput.blur() : descInput.focus()}}>
                    <View style={styles.descTitle}>
                        <Image style={styles.descImg} source={require('../../../assets/CreateEvent/Desc.png')} />
                        <Text style={styles.descTitleTxt}>Description</Text>
                        {onDesc ? 
                        <TouchableOpacity style={styles.cross} onPress={()=>clearAll()}>
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
                        maxLength={150}
                        />
                    </View>
                </TouchableOpacity>
                <View style={styles.addressPart}>
                    <View style={styles.addressComplete}>
                        <Image style={styles.descImg} source={require('../../../assets/CreateEvent/Map.png')} />
                        <EventLocationInput setAddress={setAddress}/>
                    </View>
                    {errors.address ?
                    <View style={styles.error}>
                        <Text style={commonStyles.ERROR_TEXT}>{errors.address}</Text>
                    </View> : null}
                    <FYPTextInput placeholder="Adresse à afficher" setText={setLabelAddress} text={labelAddress}/>
                    {errors.labelAddress ?
                    <View style={styles.error}>
                        <Text style={commonStyles.ERROR_TEXT}>{errors.labelAddress}</Text>
                    </View> : null}
                </View>
                <TouchableOpacity style={styles.datePart} onPress={()=>setOnDate(true)}>
                    <Image style={styles.descImg} source={require('../../../assets/CreateEvent/Date.png')} />
                    {date !== null ? <Text style={styles.descTitleTxt}>{dateDisplay}</Text> : <Text style={{...styles.descTitleTxt,color:commonStyles.DARK_WHITE}}>Date</Text>}
                    <Image style={styles.editImgLittle} source={require('../../../assets/CreateEvent/Edit.png')}/>
                    <Text style={commonStyles.ERROR_TEXT}>{errors.date}</Text>
                </TouchableOpacity>
                {onDate ?
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) =>{handleDatePicker(event,date);}}
                />
                :null}
                <View style={styles.hourPart}>
                    <View style={styles.hours}>
                    <TouchableOpacity style={styles.hourFrom} onPress={()=>setOnHourFrom(true)}>
                        <Image style={styles.descImg} source={require('../../../assets/CreateEvent/Hour.png')} />
                        {hourFrom !== null ? <Text style={styles.descTitleTxt}>De  {hourFromDisplay}</Text> : <Text style={{...styles.descTitleTxt,color:commonStyles.DARK_WHITE}}>Horaires</Text>}
                        <Image style={styles.editImgLittle} source={require('../../../assets/CreateEvent/Edit.png')}/>
                        <Text style={commonStyles.ERROR_TEXT}>{errors.hourFrom}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.hourTo} onPress={()=>setOnHourTo(true)}>
                        {hourFrom !== null ? <Text style={styles.descTitleTxt}>A  {hourToDisplay}</Text> : null}
                        {hourFrom !== null ? <Image style={styles.editImgLittle} source={require('../../../assets/CreateEvent/Edit.png')}/> : null}
                        <Text style={commonStyles.ERROR_TEXT}>{errors.hourTo}</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                {onHourFrom ?
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={'time'}
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) =>{handleHourFromPicker(event,date);}}
                />
                :null}
                {onHourTo ?
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={'time'}
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) =>{handleHourToPicker(event,date);}}
                />
                :null}
                <View style={styles.visibilityPart}>
                    <Image style={styles.descImg} source={require('../../../assets/CreateEvent/Eye.png')} />
                    <TouchableOpacity style={styles.public} onPress={()=>{visibility === "Public" ? setVisibility("") : setVisibility("Public")}}>
                        <Text style={{...styles.descTitleTxt,color:visibility === "Public" ? commonStyles.MEDIUM_ORANGE : commonStyles.WHITE}}>Public</Text>
                        <Image style={styles.dotImg} source={visibility === "Public" ? dotOrange : dotWhite}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.private} onPress={()=>{visibility === "Private" ? setVisibility("") : setVisibility("Private")}}>
                        <Image style={styles.dotImg} source={visibility === "Private" ? dotOrange : dotWhite}/>
                        <Text style={{...styles.descTitleTxt,color:visibility === "Private" ? commonStyles.MEDIUM_ORANGE : commonStyles.WHITE}}>Privé</Text>
                    </TouchableOpacity>
                </View>
                {errors.visibility ? <View style={styles.error}>
                    <Text style={commonStyles.ERROR_TEXT}>{errors.visibility}</Text> 
                </View> : null}
                <TouchableOpacity style={styles.rolesPart} onPress={()=>setOnRoles(true)}>
                    <Image style={styles.descImg} source={require('../../../assets/CreateEvent/Roles.png')} />
                    <Text style={styles.rolesTxt}>Gérer les rôles</Text>
                    <Image style={styles.editImgLittle} source={require('../../../assets/CreateEvent/Edit.png')}/>
                </TouchableOpacity>
                {onRoles ? 
                    <View style={styles.rolesView}>
                        <View style={styles.roleBlock}>
                            <View style={styles.role}>
                                <View style={styles.titleRolePart}>
                                    <Text style={styles.roleTitle}>Administrateur :</Text>
                                    <Text style={styles.detailsRole}>Mêmes autorisations que vous</Text>
                                </View>
                                {userAdmins.map((user,index)=>(
                                    <View key={index} style={styles.addRoles}>
                                        <TouchableOpacity onPress={()=>deleteUserAdmin(index)}>
                                            <Image style={styles.addRoleImg} source={require('../../../assets/CreateEvent/Cross.png')} />
                                        </TouchableOpacity>
                                        <Text style={styles.addRoleTxt}>{user.pseudo}</Text>
                                    </View>
                                ))}
                                <TouchableOpacity style={styles.addRoles} onPress={()=>{setOnAddAdmin(!onAddAdmin);setOnAddScanner(false);setUserList([])}}>
                                    <Image style={styles.addRoleImg} source={require('../../../assets/CreateEvent/Plus.png')} />
                                    <Text style={styles.addRoleTxt}>Ajouter un administrateur</Text>
                                </TouchableOpacity>
                                {onAddAdmin ? 
                                <View style={styles.addAdmin}>
                                    <View style={styles.searchResults}>
                                        {userList.map((user,index)=>(
                                            <TouchableOpacity key={index} onPress={()=>addUserAdmin(user)}>
                                                <Text style={styles.inputUser}>{user.pseudo}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    <View style={styles.searchInput}>
                                        <Image style={styles.addSearchImg} source={require('../../../assets/Bottom_Navbar/search.png')} />
                                        <TextInput 
                                            style={styles.inputUser} 
                                            placeholder="Rechercher" 
                                            placeholderTextColor={commonStyles.DARK_WHITE}
                                            onChangeText={(search)=>searchUser(search)}
                                        />
                                    </View>
                                </View>
                                : null}
                            </View>
                            <View style={styles.role}>
                                <View style={styles.titleRolePart}>
                                    <Text style={styles.roleTitle}>Scanneur :</Text>
                                    <Text style={styles.detailsRole}>Accès seulement au scan</Text>
                                </View>
                                {userScanners.map((user,index)=>(
                                    <View key={index} style={styles.addRoles}>
                                        <TouchableOpacity onPress={()=>deleteUserScanner(index)}>
                                            <Image style={styles.addRoleImg} source={require('../../../assets/CreateEvent/Cross.png')} />
                                        </TouchableOpacity>
                                        <Text style={styles.addRoleTxt}>{user.pseudo}</Text>
                                    </View>
                                ))}
                                <TouchableOpacity style={styles.addRoles} onPress={()=>{setOnAddScanner(!onAddScanner);setOnAddAdmin(false);setUserList([])}}>
                                    <Image style={styles.addRoleImg} source={require('../../../assets/CreateEvent/Plus.png')} />
                                    <Text style={styles.addRoleTxt}>Ajouter un scanneur</Text>
                                </TouchableOpacity>
                                {onAddScanner ? 
                                <View style={styles.addAdmin}>
                                    <View style={styles.searchResults}>
                                        {userList.map((user,index)=>(
                                            <TouchableOpacity key={index} onPress={()=>addUserScanner(user)}>
                                                <Text style={styles.inputUser}>{user.pseudo}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    <View style={styles.searchInput}>
                                        <Image style={styles.addSearchImg} source={require('../../../assets/Bottom_Navbar/search.png')} />
                                        <TextInput 
                                            style={styles.inputUser} 
                                            placeholder="Rechercher" 
                                            placeholderTextColor={commonStyles.DARK_WHITE}
                                            onChangeText={(search)=>searchUser(search)}
                                        />
                                    </View>
                                </View>
                                : null}
                            </View>
                        </View>
                    </View>
                : null}
                {onDesc || onRoles ? 
                    <TouchableWithoutFeedback onPress={clearAll}>
                        <View style={styles.transp}></View>
                    </TouchableWithoutFeedback> 
                : null}
                
            </ScrollView>
            <ReturnOrNext {...props} return={"Characteristics"} next={handleSubmit}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        // marginTop:"5%",
        backgroundColor:commonStyles.BLACK,
        height:'100%',
        width:"100%",
        justifyContent:'center',
        // alignItems:'center'
    },
    scroll: {
        position:"relative",
        width: "100%",
        height: "100%",
    },
        transp:{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: commonStyles.BLACK,
            opacity:0.35,
            zIndex:1
        },
        error:{
            width:"100%",
            justifyContent: 'center',
            alignItems:'center',
            marginVertical:"3%"
        },
        returnMulPart: {
            flex:1,
            width: "100%",
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems:'center',
            padding:"4%"
        },
            linkReturn: {
               
            },
                linkReturnTxt: {
                    fontFamily: commonStyles.MAIN_FONT,
                    fontSize:commonStyles.WIDTH > 370 ? 18 : 15,
                    color:commonStyles.WHITE,
                    paddingHorizontal: "1.5%"
                },
        titlePart:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        header: {
            borderColor: commonStyles.MEDIUM_ORANGE,
            borderWidth: 2,
            borderRadius: 4,
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
                    width: commonStyles.WIDTH > 370 ? 29 : 25,
                    height: commonStyles.WIDTH > 370 ? 29 : 25
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
            editImgPart: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            },
                editImg: {
                    width: commonStyles.WIDTH > 370 ? 20 : 16,
                    height: commonStyles.WIDTH > 370 ? 20 : 16
                },
        descPart:{
            flex:2,
            margin:"8%",
            marginBottom:"4%",
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
                editImgLittle: {
                    width: commonStyles.WIDTH > 370 ? 15 : 12,
                    height: commonStyles.WIDTH > 370 ? 15 : 12,
                    marginRight:"5%"
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
        addressPart:{
            flex:1,
            paddingVertical:"4%",
            paddingHorizontal:"8%",
            // alignItems: 'center',
        },
            addressComplete: {
                flexDirection: 'row',
                alignItems: 'center',
            },
            
        datePart: {
            flex:1,
            flexDirection: 'row',
            paddingVertical:"4%",
            paddingHorizontal:"8%",
            alignItems: 'center',
        },
        hourPart:{
            flex:1,
            flexDirection: 'row',
            paddingVertical:"4%",
            paddingHorizontal:"8%",
            alignItems: 'center',
        },
            hourFrom:{
                flexDirection: 'row',
            },
            hourTo:{
                flexDirection: 'row',
                paddingTop:"10%",
                paddingLeft:commonStyles.WIDTH > 370 ? 20 : 15
            },
        visibilityPart:{
            flex:1,
            flexDirection: 'row',
            paddingVertical:"4%",
            paddingHorizontal:"8%",
            alignItems: 'center',
        },
            dotImg:{
                width: commonStyles.WIDTH > 370 ? 10 : 8,
                height: commonStyles.WIDTH > 370 ? 10 : 8
            },
            public:{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight:"3%"
            },
            private:{
                flexDirection: 'row',
                alignItems: 'center',
            },
        rolesPart:{
            flexDirection: 'row',
            paddingVertical:"4%",
            paddingHorizontal:"8%",
            alignItems: 'center',
        },
            rolesTxt:{
                fontFamily: commonStyles.MAIN_FONT,
                fontSize: commonStyles.WIDTH > 370 ? 18 : 15,
                color: commonStyles.WHITE,
                paddingHorizontal:"5%"
            },
        rolesView:{
            position:'absolute',
            zIndex:2,
            width:"100%",
            alignItems: 'center',
            bottom:commonStyles.WIDTH > 370 ? 50 : 42
        },
            roleBlock:{
                borderColor: commonStyles.MEDIUM_ORANGE,
                borderWidth: 2,
                borderRadius: 4,
                backgroundColor: commonStyles.BLACK,
                width:"85%",
                paddingVertical:"2%",
                paddingHorizontal:"3%"
            },
                role:{
                    marginVertical:"5%"
                },
                titleRolePart: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom:"3%"
                },
                    roleTitle:{
                        fontFamily: commonStyles.MAIN_FONT,
                        fontSize: commonStyles.WIDTH > 370 ? 18 : 15,
                        color: commonStyles.WHITE,
                        marginRight:"5%"
                    },
                    detailsRole:{
                        fontFamily: commonStyles.MAIN_FONT,
                        fontSize: commonStyles.WIDTH > 370 ? 13 : 10,
                        color: commonStyles.DARK_WHITE,
                    },
                addRoles:{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft:"3%",
                    marginVertical:"1%"
                },
                    addRoleImg:{
                        width: commonStyles.WIDTH > 370 ? 10 : 8,
                        height: commonStyles.WIDTH > 370 ? 10 : 8,
                        marginRight:"3%"
                    },
                    addRoleTxt:{
                        fontFamily: commonStyles.MAIN_FONT,
                        fontSize: commonStyles.WIDTH > 370 ? 15 : 12,
                        color: commonStyles.WHITE,
                    },
    addAdmin:{
        zIndex:2,
        position:'absolute',
        borderColor: commonStyles.MEDIUM_ORANGE,
        borderWidth: 2,
        borderRadius: 4,
        backgroundColor: commonStyles.BLACK,
        width:commonStyles.WIDTH > 370 ? 145 : 120,
        bottom:0,
        right:-10,
        paddingHorizontal:"3%"
    },
        searchInput: {
            flexDirection: 'row',
            alignItems: 'center',
        },
            addSearchImg:{
                width: commonStyles.WIDTH > 370 ? 15 : 12,
                height: commonStyles.WIDTH > 370 ? 15 : 12,
                marginRight:"3%"
            },
            inputUser:{
                fontFamily: commonStyles.MAIN_FONT,
                fontSize: commonStyles.WIDTH > 370 ? 15 : 12,
                color: commonStyles.WHITE,
                padding:0
            },
        searchResults: {
            backgroundColor: commonStyles.BLACK,
        }

});

{/* <View style={styles.rolesView}>
                        <View style={styles.roleBlock}>
                            <View style={styles.titleRolePart}>
                                <Text style={styles.roleTitle}>Administrateur :</Text>
                                <Text style={styles.detailsRole}>Mêmes autorisations que vous</Text>
                            </View>
                            <View style={styles.addRoles}>
                                <Image style={styles.addRoleImg} source={require('../../../assets/CreateEvent/Plus.png')} />
                                <Text style={styles.addRoleTxt}>Ajouter un administrateur</Text>
                            </View>
                        </View>
                    </View> */}

export default CreateEventMainInfos;
