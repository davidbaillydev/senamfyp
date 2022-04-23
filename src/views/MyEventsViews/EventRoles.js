import React, { useState, useEffect } from "react";
import { TextInput,ScrollView, StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, Button } from "react-native";
import { withSubscription } from "react-native/Libraries/LogBox/Data/LogBoxData";
import * as commonStyles from "../../utils/commonStyles";
import { APP_URL_EMU } from "../../utils/config";
import ScanQRCView from "./ScanQRCView";
import moment from "moment";
import * as functions from "../../utils/functions";

const EventRoles = (props) => {

    const [event, setEvent] = useState(props.route.params.event);
    const [userList, setUserList] = useState([]);
    const [userAdmins, setUserAdmins] = useState([]);
    const [userScanners, setUserScanners] = useState([]);
    const [onAddAdmin, setOnAddAdmin] = useState(false);
    const [onAddScanner, setOnAddScanner] = useState(false);

    useEffect(() => {
        fillRoles();
    }, []);

    const fillRoles = () => {
        const url = APP_URL_EMU + "/api/events/collaborators/" + event.id;
        fetch(url, {method: 'GET'})
            .then(result => result.json())
            .then((responseData) => {
                console.log(responseData);
                let collaborators = responseData;
                let admins = [];
                let scanners = [];
                console.log(collaborators);
                for (let i = 0; i < collaborators.length; i++) {
                    if (collaborators[i].role == "Scanner"){
                        scanners.push(collaborators[i].user);
                    } else if (collaborators[i].role == "Admin"){
                        admins.push(collaborators[i].user);
                    }
                }
                setUserAdmins(admins);
                setUserScanners(scanners);
            })
            .catch((e) => {console.error(e)})
    }
 

    console.log(event.collaborators);

    const searchUser = (search) => {
        var users = [];
        fetch(APP_URL_EMU + "/api/users/search/" + search, { method: 'GET' })
            .then((response) => response.json())
            .then((responseData) => {
                for (var i = 0; i < responseData.length; i++) {
                    users.push({ "pseudo": responseData[i].pseudo, "id": responseData[i].id });
                };

            }).then(() => {
                setUserList(users)
            }
            )
            .catch((error) => {
                console.log(error);

            });

    }

    const addUserAdmin = (user) => {
        var already_in = false;
        for (let i = 0; i < userAdmins.length; i++) {
            if (userAdmins[i] === user) {
                already_in = true;
            }
        }

        if (!already_in) {
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
            ...userAdmins.slice(0, index),
            ...userAdmins.slice(index + 1)
        ])
    }

    const addUserScanner = (user) => {
        var already_in = false;
        for (let i = 0; i < userScanners.length; i++) {
            if (userScanners[i] === user) {
                already_in = true;
            }
        }

        if (!already_in) {
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
            ...userScanners.slice(0, index),
            ...userScanners.slice(index + 1)
        ])
    }

    const editCollaborators = () => {
        var ids = [];
        var roles = [];

        userAdmins.map((user) => {
            ids.push(user.id);
            roles.push("Admin");
        });

        userScanners.map((user) => {
            ids.push(user.id);
            roles.push("Scanner");
        });

        var bodyFormData = new FormData();

        bodyFormData.append("ids",JSON.stringify(ids));
        bodyFormData.append("roles",JSON.stringify(roles));

        console.log(bodyFormData);
        console.log(event.id);

        // fetch POST
        fetch(APP_URL_EMU + "/api/events/edit/roles/"+event.id, { method: 'POST', body: bodyFormData })
        .then((responseData) => {
            if (responseData.errors){
                console.log(responseData);
            } else if (responseData['error']){
                console.log(responseData);
            } else {
                responseData.json().then((responseData) => {
                    console.log(responseData);
                })
                // Retour aux events
                props.navigation.navigate("UpcomingEvents");
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
            <TouchableOpacity onPress={() => { props.navigation.navigate("UpcomingEvents") }}>
                <Image source={require('../../assets/white_arrow.png')} style={styles.return} />
            </TouchableOpacity>
            <ScrollView style={styles.scroll}>
                <View style={styles.content}>
                    <Text style={styles.titleTxt}>{event.name}</Text>
                    <View style={styles.rolesView}>
                        <View style={styles.roleBlock}>
                            <View style={styles.role}>
                                <View style={styles.titleRolePart}>
                                    <Text style={styles.roleTitle}>Administrateur :</Text>
                                    <Text style={styles.detailsRole}>Mêmes autorisations que vous</Text>
                                </View>
                                {userAdmins.map((user, index) => (
                                    <View key={index} style={styles.addRoles}>
                                        <TouchableOpacity onPress={() => deleteUserAdmin(index)}>
                                            <Image style={styles.addRoleImg} source={require('../../assets/CreateEvent/Cross.png')} />
                                        </TouchableOpacity>
                                        <Text style={styles.addRoleTxt}>{user.pseudo}</Text>
                                    </View>
                                ))}
                                <TouchableOpacity style={styles.addRoles} onPress={() => { setOnAddAdmin(!onAddAdmin); setOnAddScanner(false); setUserList([]) }}>
                                    <Image style={styles.addRoleImg} source={require('../../assets/CreateEvent/Plus.png')} />
                                    <Text style={styles.addRoleTxt}>Ajouter un administrateur</Text>
                                </TouchableOpacity>
                                {onAddAdmin ?
                                    <View style={styles.addAdmin}>
                                        <View style={styles.searchResults}>
                                            {userList.map((user, index) => (
                                                <TouchableOpacity key={index} onPress={() => addUserAdmin(user)}>
                                                    <Text style={styles.inputUser}>{user.pseudo}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                        <View style={styles.searchInput}>
                                            <Image style={styles.addSearchImg} source={require('../../assets/Bottom_Navbar/search.png')} />
                                            <TextInput
                                                style={styles.inputUser}
                                                placeholder="Rechercher"
                                                placeholderTextColor={commonStyles.DARK_WHITE}
                                                onChangeText={(search) => searchUser(search)}
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
                                {userScanners.map((user, index) => (
                                    <View key={index} style={styles.addRoles}>
                                        <TouchableOpacity onPress={() => deleteUserScanner(index)}>
                                            <Image style={styles.addRoleImg} source={require('../../assets/CreateEvent/Cross.png')} />
                                        </TouchableOpacity>
                                        <Text style={styles.addRoleTxt}>{user.pseudo}</Text>
                                    </View>
                                ))}
                                <TouchableOpacity style={styles.addRoles} onPress={() => { setOnAddScanner(!onAddScanner); setOnAddAdmin(false); setUserList([]) }}>
                                    <Image style={styles.addRoleImg} source={require('../../assets/CreateEvent/Plus.png')} />
                                    <Text style={styles.addRoleTxt}>Ajouter un scanneur</Text>
                                </TouchableOpacity>
                                {onAddScanner ?
                                    <View style={styles.addAdmin}>
                                        <View style={styles.searchResults}>
                                            {userList.map((user, index) => (
                                                <TouchableOpacity key={index} onPress={() => addUserScanner(user)}>
                                                    <Text style={styles.inputUser}>{user.pseudo}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                        <View style={styles.searchInput}>
                                            <Image style={styles.addSearchImg} source={require('../../assets/Bottom_Navbar/search.png')} />
                                            <TextInput
                                                style={styles.inputUser}
                                                placeholder="Rechercher"
                                                placeholderTextColor={commonStyles.DARK_WHITE}
                                                onChangeText={(search) => searchUser(search)}
                                            />
                                        </View>
                                    </View>
                                    : null}
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.linkPart}>
                <TouchableOpacity style={styles.button} onPress={()=>editCollaborators()}>
                    <Text style={styles.modif}>Modifier</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
            
        </SafeAreaView>
    );
}

export default EventRoles;

const styles = StyleSheet.create({
    container: {
        backgroundColor: commonStyles.BLACK,
        height: '100%',
        justifyContent: 'center',
        position: "relative",
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
    scroll: {
        marginVertical: "5%",
        width: "100%",
    },
    content: {
        width: "100%",
        alignItems: 'center'
    },
    titleTxt: {
        fontFamily: commonStyles.MAIN_FONT,
        fontSize: commonStyles.WIDTH > 370 ? 25 : 21,
        color: commonStyles.MEDIUM_ORANGE,
        width: "85%",
        marginVertical: "5%"
    },
    rolesView: {
        width: "100%",
        alignItems: 'center',
    },
    roleBlock: {
        borderColor: commonStyles.MEDIUM_ORANGE,
        borderWidth: 2,
        borderRadius: 4,
        backgroundColor: commonStyles.BLACK,
        width: "85%",
        paddingVertical: "2%",
        paddingHorizontal: "3%"
    },
    role: {
        marginVertical: "5%"
    },
    titleRolePart: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: "3%"
    },
    roleTitle: {
        fontFamily: commonStyles.MAIN_FONT,
        fontSize: commonStyles.WIDTH > 370 ? 18 : 15,
        color: commonStyles.WHITE,
        marginRight: "5%"
    },
    detailsRole: {
        fontFamily: commonStyles.MAIN_FONT,
        fontSize: commonStyles.WIDTH > 370 ? 13 : 10,
        color: commonStyles.DARK_WHITE,
    },
    addRoles: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: "3%",
        marginVertical: "1%"
    },
    addRoleImg: {
        width: commonStyles.WIDTH > 370 ? 10 : 8,
        height: commonStyles.WIDTH > 370 ? 10 : 8,
        marginRight: "3%"
    },
    addRoleTxt: {
        fontFamily: commonStyles.MAIN_FONT,
        fontSize: commonStyles.WIDTH > 370 ? 15 : 12,
        color: commonStyles.WHITE,
    },
    addAdmin: {
        zIndex: 2,
        position: 'absolute',
        borderColor: commonStyles.MEDIUM_ORANGE,
        borderWidth: 2,
        borderRadius: 4,
        backgroundColor: commonStyles.BLACK,
        width: commonStyles.WIDTH > 370 ? 145 : 120,
        bottom: 0,
        right: -10,
        paddingHorizontal: "3%"
    },
    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addSearchImg: {
        width: commonStyles.WIDTH > 370 ? 15 : 12,
        height: commonStyles.WIDTH > 370 ? 15 : 12,
        marginRight: "3%"
    },
    inputUser: {
        fontFamily: commonStyles.MAIN_FONT,
        fontSize: commonStyles.WIDTH > 370 ? 15 : 12,
        color: commonStyles.WHITE,
        padding: 0
    },
    searchResults: {
        backgroundColor: commonStyles.BLACK,
    },
    linkPart: {
        alignItems:'flex-end',
        width:"92.5%",
        marginTop:"5%"
    },
    button:{
        backgroundColor: commonStyles.MEDIUM_ORANGE,
        borderRadius:4,
        paddingVertical:"2%",
        paddingHorizontal:"3%"
    },
        modif:{
            fontFamily: commonStyles.MAIN_FONT,
            fontSize: commonStyles.WIDTH > 370 ? 18 : 15,
            color: commonStyles.WHITE,
        }

});