import React, { useState, useEffect } from "react";
import { TextInput,ScrollView, StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, Button } from "react-native";
import { withSubscription } from "react-native/Libraries/LogBox/Data/LogBoxData";
import * as commonStyles from "../../utils/commonStyles";
import { APP_URL_EMU } from "../../utils/config";
import ScanQRCView from "./ScanQRCView";
import moment from "moment";
import * as functions from "../../utils/functions";

const HandleEvent = (props) => {

    const [event, setEvent] = useState(props.route.params.event);

    useEffect(()=>{ 
        const unsubscribe = props.navigation.addListener('focus', () => {
            // do something
            console.log("navigated")
            fillEvent();
          });
        
    },[props.navigation]);

    const fillEvent = () => {
        const url = APP_URL_EMU + "/api/events/" + event.id;
        console.log(url);
        fetch(url, {method: 'GET'})
            .then(result => result.json())
            .then((responseData) => {
                setEvent(responseData)
            })
            .catch((e) => {console.error(e)})
    }

    const sendMail = () => {

        fetch(APP_URL_EMU + "/api/mail/askForCash",{method: "POST"})
            .then(result => console.log(result))
            .catch((e) => {console.error(e)});
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
                    <View style={styles.ticketsList}>
                        <View style={styles.listTitle}>
                            <Text style={styles.listTxt}>Liste des tickets :</Text>
                        </View>
                        <View style={styles.listPart}>
                            <View style={styles.ticketsTab}>
                                <View style={styles.header}>
                                    <Text style={styles.soldHeader}>Vendu</Text>
                                    <Text style={styles.remainHeader}>Restant</Text>
                                </View>
                                {event.prices.map((price,index)=>
                                <View key={index} style={styles.listItem}>
                                    <Text style={styles.itemNumber}>{index+1}</Text>
                                    <Text style={styles.itemName}>{price.category}</Text>
                                    <Text style={styles.itemSold}>{price.quantity_total-price.quantity_remaining}</Text>
                                    <Text style={styles.itemRemain}>{price.quantity_remaining}</Text>
                                </View>
                                )}
                            </View>
                        </View>
                    </View>
                    <View style={styles.cashableMoney}>
                        <Text style={styles.money}>{event.money} €</Text>
                        <TouchableOpacity style={styles.cash} onPress={()=>sendMail()}>
                            <Text style={styles.cashTxt}>Encaisser</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.webPart}>
                        <View style={styles.webTitle}>
                            <Image style={styles.mapIcon} source={require('../../assets/CreateEvent/Web.png')}/>
                            <Text style={styles.linkTxt}>Lien de votre billeterie FYP</Text>
                        </View>
                        <View style={styles.link}>
                            <Text style={styles.linkTxt}>https://findyourparty.fr/event/{event.event_code}</Text>
                            <TouchableOpacity onPress={()=>Clipboard.setString("https://findyourparty.fr/event/"+props.eventCode)}>
                                <Image style={styles.copyIcon} source={require('../../assets/CreateEvent/Copy.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                
                <View style={styles.linkPart}>
                <TouchableOpacity style={styles.button} onPress={()=>props.navigation.navigate("EditEvent",{event:event})}>
                    <Text style={styles.modif}>Modifier l'évènement</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
            
        </SafeAreaView>
    );
}

export default HandleEvent;

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
        },
    ticketsList:{
        borderColor: commonStyles.MEDIUM_ORANGE,
        borderWidth: 2,
        borderRadius:4,
        width:"85%",
        padding:"3%",
    },
        listTitle:{

        },
            listTxt:{
                fontFamily: commonStyles.MAIN_FONT,
                fontSize: commonStyles.WIDTH > 370 ? 18 : 15,
                color: commonStyles.WHITE,
            },

        listPart:{
            width:"100%",
            justifyContent:"flex-end",
            alignItems:"flex-end",
        },
        ticketsTab:{

        },
            header:{
                flexDirection: 'row',
                justifyContent:'flex-end'
            },
                soldHeader:{
                    fontFamily: commonStyles.MAIN_FONT,
                    fontSize: commonStyles.WIDTH > 370 ? 16 : 13,
                    color: commonStyles.WHITE,
                    width: commonStyles.WIDTH > 370 ? 50 : 35,
                    textAlign:"center"
                },
                remainHeader:{
                    fontFamily: commonStyles.MAIN_FONT,
                    fontSize: commonStyles.WIDTH > 370 ? 16 : 13,
                    color: commonStyles.WHITE,
                    width: commonStyles.WIDTH > 370 ? 50 : 35,
                    textAlign:"center"
                },
            listItem:{
                flexDirection:'row',
                justifyContent:'flex-end'
            },
                itemNumber:{
                    fontFamily: commonStyles.MAIN_FONT,
                    fontSize: commonStyles.WIDTH > 370 ? 16 : 13,
                    color: commonStyles.WHITE,
                    width: commonStyles.WIDTH > 370 ? 20 : 15,
                    textAlign:"center"
                },
                itemName:{
                    fontFamily: commonStyles.MAIN_FONT,
                    fontSize: commonStyles.WIDTH > 370 ? 16 : 13,
                    color: commonStyles.WHITE,
                    width: commonStyles.WIDTH > 370 ? 100 : 80,
                    textAlign:"center"
                },
                itemSold:{
                    fontFamily: commonStyles.MAIN_FONT,
                    fontSize: commonStyles.WIDTH > 370 ? 16 : 13,
                    color: commonStyles.WHITE,
                    width: commonStyles.WIDTH > 370 ? 50 : 35,
                    textAlign:"center"
                },
                itemRemain:{
                    fontFamily: commonStyles.MAIN_FONT,
                    fontSize: commonStyles.WIDTH > 370 ? 16 : 13,
                    color: commonStyles.WHITE,
                    width: commonStyles.WIDTH > 370 ? 50 : 35,
                    textAlign:"center"
                },
                webTitle:{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'center'
                },
                link:{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'center',
                    marginBottom:"5%"
                },
                copyIcon:{
                    width: commonStyles.WIDTH > 370 ? 20 : 15,
                    height: commonStyles.HEIGHT > 370 ? 20 : 15,
                    marginLeft:"2.5%"
                },
                linkTxt:{
                    fontFamily: commonStyles.MAIN_FONT,
                    fontSize: commonStyles.WIDTH > 370 ? 18 : 15,
                    color: commonStyles.WHITE,
                    padding:0,
                    marginRight:"2.5%"
                },
                mapIcon:{
                    width: commonStyles.WIDTH > 370 ? 35 : 28,
                    height: commonStyles.WIDTH > 370 ? 35 : 28,
                    marginVertical:"5%",
                    marginHorizontal:"3%",
                },
        cashableMoney: {
            marginVertical: "5%"
        },
            money:{
                fontFamily: commonStyles.MAIN_FONT,
                fontSize: commonStyles.WIDTH > 370 ? 50 : 40,
                color: commonStyles.WHITE,
                textAlign:"center"
            },
            cashTxt:{
                fontFamily: commonStyles.MAIN_FONT,
                fontSize: commonStyles.WIDTH > 370 ? 25 : 20,
                color: commonStyles.WHITE,
                textAlign:"center"
            }
});