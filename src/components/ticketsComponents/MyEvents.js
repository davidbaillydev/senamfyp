import React, {useState,useEffect} from "react";
import { ScrollView,StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, Button } from "react-native";
import { withSubscription } from "react-native/Libraries/LogBox/Data/LogBoxData";
import * as commonStyles from "../../utils/commonStyles";
import { APP_URL_EMU } from "../../utils/config";
import ScanQRCView from "../../views/MyEventsViews/ScanQRCView";
import moment from "moment";
import * as functions from "../../utils/functions";

const MyEvents = (props) => {


    useEffect(() => {
        
    },[])

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.events}>
                    {props.events.map((event,index)=>(
                        <View key={index} style={styles.eventItem}>
                            <View style={styles.content}>
                                <View style={styles.infosPart}>
                                    <Text style={styles.titleTxt}>{event.name}</Text>
                                    <Text style={styles.typeTxt}>- {event.type} -</Text>
                                    <View style={styles.infos}>
                                        <Image source={require('../../assets/MyEvents/Map.png')} style={styles.infosImg}/>
                                        <Text style={styles.infosTxt}>{event.label_address}</Text>
                                    </View>
                                    <View style={styles.infos}>
                                        <Image source={require('../../assets/MyEvents/Cal.png')} style={styles.infosImg}/>
                                        <Text style={styles.infosTxt}>{functions.formatDateFromDB(event.date)}  à  {functions.formatTimeFromDB(event.time_from)}</Text>
                                    </View>
                                </View>
                                <View style={styles.statsPart}>
                                    <TouchableOpacity style={styles.scanButton} onPress={()=>props.navigation.navigate("Scan")}>
                                        <Text style={styles.scanTxt}>Scanner</Text>
                                    </TouchableOpacity>
                                    <View style={styles.stats}>
                                        <View style={styles.statsTitle}>
                                            <Image source={require('../../assets/MyEvents/Stats.png')} style={styles.infosImg}/>
                                            <Text style={styles.statsTitleTxt}>Statistiques</Text>
                                        </View>
                                        <Text style={styles.statsTxt}>Places vendues : {event.sold_places}</Text>
                                        <Text style={styles.statsTxt}>Montant encaissé : {event.money} €</Text>
                                        <Text style={styles.statsTxt}>Places restantes : {event.remaining_places}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.buttons}>
                                <TouchableOpacity style={styles.button} onPress={()=> props.navigation.navigate("EventDetails",{eventCode:event.event_code})}>
                                    <Text style={styles.buttonTxt}>Aperçu</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={()=> props.navigation.navigate("EventRoles",{event:event})}>
                                    <Text style={styles.buttonTxt}>Gérer les rôles</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={()=>props.navigation.navigate("HandleEvent",{event:event})}>
                                    <Text style={styles.buttonTxt}>Gérer cet évènement</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.linkPart}>
                <TouchableOpacity style={styles.clickablePart} onPress={() => props.navigation.navigate("PastEvents")}>
                    <Text style={styles.link}>Evènements archivés</Text>
                    <Image source={require('../../assets/MyTickets/arrowNextWhite.png')} style={styles.imgArrow}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default MyEvents;

const styles = StyleSheet.create({
    container:{
        backgroundColor:commonStyles.BLACK,
        height:'100%'
    },
    scroll:{
        marginVertical: "5%",
        width: "100%",
    },
    events:{
        width: "100%",
        alignItems:'center'
    },
    eventItem:{
        backgroundColor:commonStyles.WHITE,
        width:"90%",
        marginVertical: "2%",
        padding:"3%",
        borderRadius:8
    },
        content:{
            flexDirection: 'row',
            marginBottom:"4%"
        },
            infosPart: {
                flex:1,
            },
                titleTxt: {
                    fontFamily:commonStyles.MAIN_FONT,
                    fontSize:commonStyles.WIDTH > 370 ? 22 : 18,
                    color:commonStyles.MEDIUM_ORANGE
                },
                typeTxt:{
                    fontFamily:commonStyles.MAIN_FONT,
                    fontSize:commonStyles.WIDTH > 370 ? 18 : 15,
                    color:commonStyles.LIGHT_ORANGE,
                    marginBottom:"10%"
                },
                infos:{
                    flexDirection:'row',
                    alignItems:"center",
                    marginVertical:"5%"
                },
                    infosImg:{
                        width:commonStyles.WIDTH > 370 ? 20 : 15,
                        height:commonStyles.WIDTH > 370 ? 20 : 15,
                        marginRight:"5%"
                    },
                    infosTxt:{
                        fontFamily:commonStyles.MAIN_FONT,
                        fontSize:commonStyles.WIDTH > 370 ? 16 : 13,
                    },
            statsPart:{
                alignItems: 'flex-end',
                flex:1
            },
                scanButton:{
                    backgroundColor:commonStyles.GRAY,
                    paddingVertical:"2%",
                    paddingHorizontal:"8%",
                    borderRadius:6
                },
                    scanTxt:{
                        fontFamily:commonStyles.MAIN_FONT,
                        fontSize:commonStyles.WIDTH > 370 ? 18 : 15,
                        color: commonStyles.WHITE,
                    },
                stats:{
                    borderColor: commonStyles.MEDIUM_ORANGE,
                    borderWidth:2,
                    borderRadius:4,
                    paddingVertical:"4%",
                    paddingHorizontal:"10%",
                    marginTop:"5%"
                },
                    statsTitle: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom:"5%"
                    },
                        statsTitleTxt:{
                            fontFamily:commonStyles.MAIN_FONT,
                            fontSize:commonStyles.WIDTH > 370 ? 18 : 15,
                            color: commonStyles.MEDIUM_ORANGE,
                        },
                    statsTxt:{
                        fontFamily:commonStyles.MAIN_FONT,
                        fontSize:commonStyles.WIDTH > 370 ? 16 : 13,
                        marginVertical:"2%"
                    },
            buttons:{
                flex:1,
                justifyContent:"space-between",
                flexDirection:'row'
            },
                button:{
                    backgroundColor:commonStyles.MEDIUM_ORANGE,
                    paddingVertical:"2%",
                    paddingHorizontal:"4%",
                    borderRadius:4
                },
                    buttonTxt: {
                        fontFamily:commonStyles.MAIN_FONT,
                        fontSize:commonStyles.WIDTH > 370 ? 16 : 13,
                        color: commonStyles.WHITE
                    },
                        
                    linkPart:{
                        display:'flex',
                        alignSelf:'flex-end',
                        alignItems:'center',
                        marginHorizontal:'11%',
                        flexDirection:'row',
                        marginBottom:"5%"
                    },
                        clickablePart:{
                            width:'48%',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            flexDirection:'row'
                        },
                            link:{
                                fontFamily:commonStyles.MAIN_FONT,
                                color:commonStyles.WHITE,
                                fontSize:commonStyles.WIDTH > 370 ? 18 : 15,
                                textAlign:'center',
                                marginRight:"5%",
                            },
                            imgArrow:{
                                height:commonStyles.WIDTH > 370 ? 30 : 26,
                                width:commonStyles.WIDTH > 370 ? 30 : 26,
                            }    
                
});