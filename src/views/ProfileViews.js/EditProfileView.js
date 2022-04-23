import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert, ActivityIndicator,SafeAreaView, ScrollView, Image, PermissionsAndroid, Platform, TouchableOpacity } from "react-native";
import { APP_URL_EMU } from "../../utils/config";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as commonStyles from "../../utils/commonStyles";
import * as data from "../../utils/data";
import { fetchUserInfos } from "../../utils/functions";
import SelectDropdown from "react-native-select-dropdown";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { HEIGHT, BASIC_TEXT } from "../../utils/commonStyles";
import Description from "../../components/profileComponents/Description";

const EditProfileView = ({ navigation }) => {

    const [isDataReceived,setIsDataReceived] = useState(false);
    const [user,setUser] = useState({});
    const [showPicker,setShowPicker] = useState(false);
    const [errors,setErrors] = useState([]);
    console.log("photo ? ", user.profil_picture);
    // User Infos
    const [pseudo,setPseudo] = useState("");
    const [email,setEmail] = useState("");
    const [photo,setPhoto] = useState("");
    const [birthDate,setBirthDate] = useState("");
    const [birthDateDisplay,setBirthDateDisplay] = useState("Choisir");
    const [sex,setSex] = useState("");
    const [role,setRole] = useState("");
    const [description,setDescription] = useState("");
    const [phone,setPhone] = useState("");

    useEffect(()=>{
        console.log("fetch");
        fetchUserInfos()
            .then(result => {
                setUser(result);
                
            })
            .catch(error=>{
                console.log("error useEffect");
                console.log(error);
            })
    },[]);

    // Appelé lorsque le state "user" change
    useEffect(() => {
        setTimeout(()=>{
            setIsDataReceived(true);
        },1500);
    }, [user]);

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
    
    const updateUser = () => {
        let bodyFormData = new FormData();
        pseudo ? bodyFormData.append('pseudo',pseudo) : bodyFormData.append('pseudo',user.pseudo);
        email ? bodyFormData.append('email',email) : bodyFormData.append('email',user.email);
        photo && bodyFormData.append('photo',photo);
        description && bodyFormData.append('description',description);
        birthDate && bodyFormData.append('birth_date',birthDate);
        phone && bodyFormData.append('phone',phone);
        
        sex && bodyFormData.append('sex',sex);
        role && bodyFormData.append('role',role);

        fetch(APP_URL_EMU + "/api/users/edit/"+user.id, { method: 'POST', body: bodyFormData })
            // .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if (responseData.errors){
                    responseData.json().then((responseData) => {
                        setErrors(responseData.errors);
                    })
                } else if (responseData['error']){
                    responseData.json().then((responseData) => {
                        setErrors(responseData);
                    })
                } else {
                    setErrors([]);
                    navigation.navigate("InfosProfile");
                }
            })
            .catch((error) => {
                console.log(error);
            }).done();
    }

    const chooseFromLibrary = () => {
        launchImageLibrary({"includeBase64":true}).then((response) => {
            if (response.didCancel){
                console.log(response);
            } else {
                console.log(response.length);
                setPhoto("data:image/gif;base64,"+response.assets[0].base64);
            }
        }
        );
    }

    const takeFromCamera = () => {
        if(Platform.OS === 'ios') {
            launchCamera({"includeBase64":true}).then((response) => {
                if (response.didCancel){
                    console.log(response);
                } else {
                    console.log(response);
                    setPhoto(`data:image/gif;base64,${response.assets[0].base64}`);
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
                            console.log(response.assets[0].base64.length);
                            setPhoto(`data:image/gif;base64,${response.assets[0].base64}`);
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

    const returnToInfos = () => {
        navigation.navigate("InfosProfile");
    }

    const navToVerify = () => {
        navigation.navigate("VerifyProfile");
    }

    return (
    <SafeAreaView style={styles.container}>
        {isDataReceived ?
            <View style={styles.container}>
                {/* Header avec photo de couverture et photo de profil décalée */}
                <View>
                    <Image
                        source={require('../../assets/Examples_Images/cover_profile.png')}
                        style={{width: '100%', height: HEIGHT*0.2}}
                    />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between' ,
                        alignItems: 'center',
                        backgroundColor: commonStyles.BLACK
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <View style={{
                                height: commonStyles.PROFILE_PICTURE_SIZE/2,
                                width: commonStyles.PROFILE_PICTURE_SIZE,
                                marginHorizontal: 20,
                            }}>
                                <Image
                                    source={{
                                        uri: APP_URL_EMU +"/"+ user.profil_picture
                                    }}
                                    style={styles.imgProfile}
                                />
                            </View>
                            <Text style={[BASIC_TEXT, {fontSize: 25, color: commonStyles.MEDIUM_ORANGE}]}>{user.pseudo}</Text>
                        </View>
                        <TouchableOpacity>
                            <Image
                                source={require('../../assets/Profile/more_icon.png')}
                                style={{
                                    width: commonStyles.MORE_ICON_WIDTH,
                                    height: commonStyles.MORE_ICON_HEIGHT,
                                    marginRight: 20
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Formulaire des modifs */}
                <View style={{
                    flex: 1,
                    backgroundColor: commonStyles.BLACK,
                    alignItems: 'center'
                }}>
                    <View style={{
                        flex: 1,
                        width: commonStyles.MAIN_CONTAINERS_WIDTH,
                        justifyContent: 'space-around'
                    }}>
                        <View>
                            <Text style={BASIC_TEXT}>Modif nom d'utilisateur</Text>
                            <Text style={BASIC_TEXT}>Statut utilisateur</Text>
                        </View>
                        {/* Bio / Description */}
                        <Description value={user.description} isEditable={true} onSetDescription={setDescription}/>
                        <Text style={BASIC_TEXT}>Options de vérification...</Text>
                        <TouchableOpacity
                            style={{
                                borderColor: commonStyles.MEDIUM_ORANGE,
                                backgroundColor: commonStyles.MEDIUM_ORANGE,
                                borderWidth: 2,
                                padding: 10,
                                borderRadius: 10,
                                alignItems: 'center'
                            }}
                            onPress={updateUser}
                        >
                            <Text style={BASIC_TEXT}>
                                Valider les modifications
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                
                    
                {/* ~~~~~~~~~~~~~~~~~~~~~ Ancien formulaire en dessous ~~~~~~~~~~~~~~~~~~~~~~~~ */}
                {/* ~~~~~~~~~~~~~~~~~~~~~ Ancien formulaire en dessous ~~~~~~~~~~~~~~~~~~~~~~~~ */}
                {true ? 
                <></>
                :
                <View>
                {/* --- Pseudo --- */}
                <Text style={styles.label}>Pseudo</Text>
                <TextInput defaultValue={user.pseudo} style={styles.input} onChangeText={setPseudo}></TextInput>
                { (errors) ? <Text style={styles.error}>{errors['pseudo']}</Text> : <Text></Text>}
                {/* --- Email --- */}
                <Text style={styles.label}>Email</Text>
                <TextInput defaultValue={user.email} style={styles.input} onChangeText={setEmail}></TextInput>
                { (errors) ? <Text style={styles.error}>{errors['email']}</Text> : <Text></Text>}
                {/* --- Photo --- */}
                <Text style={styles.label}>Photo</Text>
                <Image source={{ uri: APP_URL_EMU +"/"+ user.profil_picture }} style={{width: 80, height: 80}} />
                <Button title="Choisir une photo" onPress={chooseFromLibrary}></Button>
                <Button title="Prendre une photo" onPress={takeFromCamera}></Button>
                {/* --- Description --- */}
                <Text style={styles.label}>Description</Text>
                <TextInput defaultValue={user.description} style={styles.input} onChangeText={setDescription}></TextInput>
                {/* --- Date de naissance --- */}
                <Text style={styles.label}>Date de naissance</Text>
                {user.birth_date ? <Button title={user.birth_date} onPress={setShowPicker} /> : <Button title={birthDateDisplay} onPress={setShowPicker} />}
                {showPicker && <DateTimePicker value={new Date(2000, 6, 17)}
                    mode={'date'}
                    display="default"
                    onChange={(event, date) => {
                        setShowPicker(false);
                        if (event.type !== "dismissed"){
                            const strDate = date.toISOString();
                            const dateData = strDate.split('T');
                            const dateFormatted = dateData[0] + " " + (dateData[1].split('Z')[0]);
                            setBirthDateDisplay(date.getDate().toString() + "/" + (date.getMonth() + 1).toString() + "/" + date.getFullYear().toString());
                            setBirthDate(dateFormatted);
                        }
                    }}
                >
                </DateTimePicker>}
                {/* --- Telephone --- */}
                <Text style={styles.label}>Téléphone</Text>
                <TextInput keyboardType="numeric" defaultValue={user.phone} style={styles.input} onChangeText={setPhone}></TextInput>
                {/* --- Sexe --- */}
                <Text style={styles.label}>Sexe</Text>
                <SelectDropdown
                    data={data.sex}
                    onSelect={(selectedItem, index) => {
                        setSex(selectedItem);
                    }}
                    defaultButtonText={user.sex}
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
                    buttonTextStyle={styles.textStyle}
                //defaultValue={data.defaultEvent}
                />
                {/* --- Role --- */}
                <Text style={styles.label}>Rôle</Text>
                <SelectDropdown
                    data={data.roles}
                    onSelect={(selectedItem, index) => {
                        setRole(selectedItem);
                    }}
                    defaultButtonText={user.role}
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
                    buttonTextStyle={styles.textStyle}
                //defaultValue={data.defaultEvent}
                />
                <Button title="Vérifier mon profil" onPress={navToVerify}></Button>
                {user.verif_identity ? <Text> Identité vérifiée</Text> : <Text> Identité non vérifiée</Text>}
                {user.verif_mail ? <Text> E-Mail vérifié</Text> : <Text> E-Mail non vérifié</Text>}
                {user.verif_phone ? <Text> Téléphone vérifié</Text> : <Text> Téléphone non vérifié</Text>}
                {user.is_verified ? <Text> Utilisateur vérifié</Text> : <Text> Utilisateur non vérifié</Text>}
                <Button title="Valider les modifications" onPress={updateUser}></Button>
                <Button title="Retour" onPress={returnToInfos}></Button>
                
                </View>
                }
            </View> :
            <ActivityIndicator size='large' color={commonStyles.LIGHT_ORANGE} />
        }
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        backgroundColor: 'white',
    },
    dropdownButtonStyle: {
        backgroundColor: 'rgba(0,0,0,0)'
    },
    textStyle: {
        color: commonStyles.LIGHT_ORANGE
    },
    imgProfile: {
        position: 'absolute',
        top: -commonStyles.PROFILE_PICTURE_SIZE/2,
        height: commonStyles.PROFILE_PICTURE_SIZE,
        width: commonStyles.PROFILE_PICTURE_SIZE,
        borderRadius: commonStyles.PROFILE_PICTURE_SIZE / 2
    },
    error : {
        color:'red',
        fontSize:10
    }
});

export default EditProfileView;