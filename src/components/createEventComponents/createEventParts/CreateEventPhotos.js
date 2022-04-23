import React, {useState,useEffect} from "react";
import {PermissionsAndroid, TouchableWithoutFeedback,ScrollView,StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, Button, FlatList, TextInput } from "react-native";
import * as commonStyles from "../../../utils/commonStyles";
import ReturnOrNext from "./ReturnOrNext";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { APP_URL_EMU } from "../../../utils/config";


function CreateEventPhotos(props){

    const [onMain,setOnMain] = useState(false);
    const [onOthers,setOnOthers] = useState(false);
    const [mainPhoto,setMainPhoto] = useState("");
    const [othersPhotos,setOthersPhotos] = useState([]);
    const [currentIndex,setCurrentIndex] = useState(0);

    const [errors,setErrors] = useState({});

    const requestCameraPermission = async () => {
        try {
          return await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "App Camera Permission",
              message:"App needs access to your camera ",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
        } catch (err) {
          console.log(err);
        }
      };

    const takeFromCamera = (type) => {
        if(Platform.OS === 'ios') {
            launchCamera({"includeBase64":true}).then((response) => {
                if (response.didCancel){
                    console.log(response);
                } else {
                    var b64 = `data:image/gif;base64,${response.assets[0].base64}`;
                    type === "main" ? setMainPhoto(b64) : setOthersPhotos([...othersPhotos,b64]);
                }
            }).catch((error)=>{
                console.log(error);
            });
        } else {
            requestCameraPermission().then((response) => {
                if (response === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("Camera permission given");
                    launchCamera({"includeBase64":true}).then((response) => {
                        if (response.didCancel){
                            console.log(response);
                        } else {
                            var b64 = `data:image/gif;base64,${response.assets[0].base64}`;
                            type === "main" ? setMainPhoto(b64) : setOthersPhotos([...othersPhotos,b64]);
                        }
                    }).catch((error)=>{
                        console.log(error);
                    });
                } else {
                    console.log("Camera permission denied");
                }
            });
        }
           
    }

    const chooseFromLibrary = () => {
        launchImageLibrary({"includeBase64":true}).then((response) => {
            if (response.didCancel){
                console.log(response);
            } else {
                var b64 = `data:image/gif;base64,${response.assets[0].base64}`;
                type === "main" ? setMainPhoto(b64) : setOthersPhotos([...othersPhotos,b64]);
            }
        }
        );
    }


    const deleteMainPhoto = () => {
        setMainPhoto("");
        setOnMain(false);
    }

    const deleteOtherPhoto = (index) => {
        setOthersPhotos([
            ...othersPhotos.slice(0,index),
            ...othersPhotos.slice(index+1)
        ]);
        setOnOthers(false);
    }

    const prevIndex = () => {
        if(currentIndex > 0){ 
            setCurrentIndex(currentIndex-1);
        } else {
            setCurrentIndex(othersPhotos.length);
        }
    }

    const nextIndex = () => {
        if (currentIndex < othersPhotos.length) {
            setCurrentIndex(currentIndex+1);
        } else {
            setCurrentIndex(0)
        }
    }

    const handleSubmit = () => {
        var current_errors = {};
        if (mainPhoto.length == 0){
            current_errors.mainPhoto = "Vous devez ajouter une photo de couverture";
        } else {
            current_errors.mainPhoto = "";
            props.setMainPhoto(mainPhoto);
        }
        props.setOthersPhotos(othersPhotos);
        setErrors(current_errors);
        !current_errors.mainPhoto ? props.navigation.navigate("Prices") : null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.addPhotos}>
            <View style={styles.addMainPhotoPart}>
                <TouchableOpacity disabled={onMain} style={styles.addMainPhoto} onPress={()=> setOnMain(true)}>
                    {mainPhoto ?
                    <>
                        <View>
                            <Image style={styles.mainPhoto} source={{ uri: mainPhoto }}/>
                            
                            <Text style={styles.mainPhotoTxt}>Photo de couverture</Text>
                        </View>
                        <TouchableOpacity style={styles.crossMainPhotoTouch} onPress={() => {deleteMainPhoto()}}>
                            <Image style={styles.crossMainPhoto} source={require('../../../assets/CreateEvent/Cross.png')}/>
                        </TouchableOpacity>
                    </>
                    :
                    onMain ?
                    <>
                    <View style={styles.textAndText}>
                        <TouchableOpacity onPress={()=> takeFromCamera("main")}>
                            <Text style={styles.choicePhoto}>Prendre une photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => chooseFromLibrary("main")}>
                            <Text style={styles.choicePhoto}>Choisir dans la galerie</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.crossMainPhotoTouch} onPress={() => {setOnMain(false)}}>
                        <Image style={styles.crossMainPhoto} source={require('../../../assets/CreateEvent/Cross.png')}/>
                    </TouchableOpacity>
                    </>
                    :
                    <View style={styles.plusAndText}>
                        <Image style={styles.plusImg} source={require('../../../assets/CreateEvent/Plus.png')}/>
                        <Text style={styles.addMainPhotoTxt}>Ajouter une photo de couverture</Text>
                    </View>
                    
                    }
                </TouchableOpacity>
            </View>
            {errors.mainPhoto ? 
            <View style={styles.error}>
                <Text style={commonStyles.ERROR_TEXT}>{errors.mainPhoto}</Text>
            </View>
            : null}
            <View style={styles.addMainPhotoPart}>
                <TouchableOpacity disabled={onOthers} style={styles.addMainPhoto} onPress={()=> setOnOthers(true)}>
                    {othersPhotos[0] ?
                    <>
                        <View style={styles.othersPhotoContent}>
                            <TouchableOpacity onPress={() => prevIndex()}>
                                <Image style={styles.swipeOthersPhotoLeft} source={require('../../../assets/CreateEvent/Swipe.png')}/>
                            </TouchableOpacity>
                            {othersPhotos[currentIndex] ?
                            <Image style={styles.mainPhoto} source={{ uri: othersPhotos[currentIndex] }}/>
                            :
                            <View style={styles.textAndTextSwipe}>
                                <TouchableOpacity onPress={()=> takeFromCamera("others")}>
                                    <Text style={styles.choicePhoto}>Prendre une photo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>chooseFromLibrary("others")}>
                                    <Text style={styles.choicePhoto}>Choisir dans la galerie</Text>
                                </TouchableOpacity>
                            </View>
                            }
                            <TouchableOpacity onPress={() => nextIndex()}>
                               <Image style={styles.swipeOthersPhotoRight} source={require('../../../assets/CreateEvent/Swipe.png')}/> 
                            </TouchableOpacity>
                        </View>
                        {(currentIndex != othersPhotos.length) ?
                        <TouchableOpacity style={styles.crossMainPhotoTouch} onPress={() => {deleteOtherPhoto(currentIndex)}}>
                            <Image style={styles.crossMainPhoto} source={require('../../../assets/CreateEvent/Cross.png')}/>
                        </TouchableOpacity>
                        :
                        null}
                    </>
                    :
                    onOthers ?
                    <>
                    <View style={styles.textAndText}>
                        <TouchableOpacity onPress={()=> takeFromCamera("others")}>
                            <Text style={styles.choicePhoto}>Prendre une photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>chooseFromLibrary("others")}>
                            <Text style={styles.choicePhoto}>Choisir dans la galerie</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.crossMainPhotoTouch} onPress={() => {setOnOthers(false)}}>
                        <Image style={styles.crossMainPhoto} source={require('../../../assets/CreateEvent/Cross.png')}/>
                    </TouchableOpacity>
                    </>
                    :
                    <View style={styles.plusAndText}>
                        <Image style={styles.plusImg} source={require('../../../assets/CreateEvent/Plus.png')}/>
                        <Text style={styles.addMainPhotoTxt}>Ajouter d'autres photos</Text>
                    </View>
                }
                </TouchableOpacity>
            </View>
            </ScrollView>
            <ReturnOrNext {...props} return={"MainInfos"} next={handleSubmit}/>
        </SafeAreaView>
    )

}


export default CreateEventPhotos

const styles = StyleSheet.create({
    container:{
        backgroundColor:commonStyles.BLACK,
        height:'100%',
        width:"100%",
    },
    error:{
        alignItems: 'center'
    },
    addPhotos:{
        marginVertical:commonStyles.WIDTH > 370 ? 50 : 40
    },
        addMainPhotoPart:{
            justifyContent:'center',
            alignItems:'center',
            

        },
            addMainPhoto:{
                borderWidth:2,
                borderRadius:4,
                borderColor:commonStyles.MEDIUM_ORANGE,
                width:"85%",
                marginVertical:commonStyles.WIDTH > 370 ? 25 : 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: commonStyles.WIDTH > 370 ? 30 : 20,
                position: 'relative',
            },
                plusAndText: {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                textAndText: {
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                addMainPhotoTxt: {
                    fontFamily: commonStyles.MAIN_FONT,
                    color:commonStyles.WHITE,
                    fontSize: commonStyles.WIDTH > 370 ? 20 : 16,
                    paddingLeft:"5%"
                },
                choicePhoto: {
                    fontFamily: commonStyles.MAIN_FONT,
                    color:commonStyles.WHITE,
                    fontSize: commonStyles.WIDTH > 370 ? 20 : 16,
                    paddingVertical:"2%"
                },
                plusImg: {
                    width: commonStyles.WIDTH > 370 ? 25 : 20,
                    height: commonStyles.WIDTH > 370 ? 25 : 20,
                    paddingRight:"5%"
                },

            othersPhotoContent:{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            },
                swipeOthersPhotoRight: {
                    height:commonStyles.WIDTH > 370 ? 20 : 15,
                    width:commonStyles.WIDTH > 370 ? 20 : 15,
                    marginLeft:commonStyles.WIDTH > 370 ? 20 : 15
                },
                swipeOthersPhotoLeft: {
                    transform:[{rotate:'180deg'}],
                    height:commonStyles.WIDTH > 370 ? 20 : 15,
                    width:commonStyles.WIDTH > 370 ? 20 : 15,
                    marginRight:commonStyles.WIDTH > 370 ? 20 : 15
                },
                mainPhoto:{
                    height:commonStyles.WIDTH > 370 ? 100 : 80,
                    width:commonStyles.WIDTH > 370 ? 170 : 140
                },
                crossMainPhotoTouch: {
                    position: 'absolute',
                    top:0,
                    right:0,
                    padding:commonStyles.WIDTH > 370 ? 12 : 10,
                },
                crossMainPhoto: {
                    height:commonStyles.WIDTH > 370 ? 20 : 15,
                    width:commonStyles.WIDTH > 370 ? 20 : 15
                },
                mainPhotoTxt: {
                    fontFamily: commonStyles.MAIN_FONT,
                    color:commonStyles.WHITE,
                    fontSize: commonStyles.WIDTH > 370 ? 20 : 16,
                    paddingTop:"10%",
                    textAlign:"center",
                },
                textAndTextSwipe: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    height:commonStyles.WIDTH > 370 ? 100 : 80,
                    width:commonStyles.WIDTH > 370 ? 170 : 140
                },


});