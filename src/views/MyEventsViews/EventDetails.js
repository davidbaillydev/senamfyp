import React , {useEffect} from "react";
import {ScrollView, Button, Image, View, StyleSheet,TouchableOpacity, Text, ActivityIndicator, FlatList } from "react-native";
import { useState } from "react";
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraScreen } from "react-native-camera-kit";
import { APP_URL_EMU } from "../../utils/config";
import * as commonStyles from "../../utils/commonStyles";
import * as functions from "../../utils/functions";

const EventDetails = (props) => {

    const [event,setEvent] = useState({});
    const [isDataReceived,setIsDataReceived] = useState(false);

    const fetchEvent = (code) => {
        const url = APP_URL_EMU + "/api/events/code/" + code;
        console.log("in details : " + url);
        fetch(url, {method: 'GET'})
            .then(result => result.json())
            .then((responseData) => {
                setEvent(responseData);
                setIsDataReceived(true);
                console.log(responseData);
            })
            .catch((e) => {console.error(e)})
    }

    useEffect(() => {
        
        fetchEvent(props.route.params.eventCode);
    },[])
 

    return(
        <SafeAreaView style={styles.container}>
            {!isDataReceived ? 
            <ActivityIndicator size='large' color={commonStyles.LIGHT_ORANGE}/>
            :
            <>
            <View style={styles.heroPart}>
                <Image source={{uri : APP_URL_EMU + "/" + event.main_photo}} style={styles.heroImg} />
            </View>
            <TouchableOpacity onPress={()=>{props.navigation.navigate("UpcomingEvents")}}>
                <Image source={require('../../assets/white_arrow.png')} style={styles.return}/>
            </TouchableOpacity>
            <ScrollView style={styles.scroll}>
                <View style={styles.content}>
                    <View style={styles.titlePart}>
                        <View style={styles.titleAndType}>
                            <Text style={styles.titleTxt}>{event.name}</Text>
                            <Text style={styles.typeTxt}>{event.type}</Text>
                        </View>
                        {/* <View style={styles.menu}>

                        </View> */}
                    </View>
                    <View style={styles.orgaAndFav}>
                        {/* <View style={styles.fav}>

                        </View> */}
                        <View style={styles.orga}>
                            <Image source={require('../../assets/EventDetails/Person.png')} style={styles.orgaImg} />
                            <Text style={styles.partTxt}>{event.pseudo}</Text>
                        </View>
                    </View>
                    <View style={styles.dateHourAndAddress}>
                        <View style={styles.dateAndHour}>
                            <Image source={require('../../assets/EventDetails/Calendar.png')} style={styles.calImg} />
                            <Text style={styles.partTxt}>{functions.formatDate(new Date(event.date).toLocaleDateString())}  à  {functions.formatTime(event.time_from)}</Text>
                        </View>
                        <View style={styles.dateAndHour}>
                            <Image source={require('../../assets/EventDetails/Map.png')} style={styles.calImg} />
                            <Text style={styles.partTxt}>{event.label_address}</Text>
                        </View>
                    </View>
                    <View style={styles.descPart}>
                        <View style={styles.descTitle}>
                            <Image source={require('../../assets/EventDetails/Desc.png')} style={styles.calImg} />
                            <Text style={styles.partTxt}>Description</Text>
                        </View>
                        <View style={styles.descContent}>
                            <Text style={styles.descTxt}>{event.event_description}</Text>
                        </View>
                    </View>
                    <View style={styles.moodsAndCharacsPart}>
                        <View style={styles.moods}>
                            <Text style={styles.squareTitle}>Type d'ambiance</Text>
                            {JSON.parse(event.moods).map((mood,index)=>(
                                <Text key={index} style={styles.mood}>{mood}</Text>
                            ))}
                        </View>
                        {JSON.parse(event.characs).length != 0 ?
                        <View style={styles.characs}>
                            <Text style={styles.squareTitle}>Caractéristiques</Text>
                            {JSON.parse(event.characs).map((charac,index)=>(
                                <Text key={index} style={styles.mood}>{charac}</Text>
                            ))}
                        </View> 
                        : null}
                    </View>
                </View>
                <View style={styles.buyTicketPart}>
                    {event.prices.map((price,index)=>(
                    <View key={index} style={styles.priceItem}>
                        <View style={styles.priceTitle}>
                            <Text style={styles.partTxt}>{price.category}</Text>
                        </View>
                        <View style={styles.priceTitle}>
                            <Text style={styles.partTxt}>{price.price} €</Text>
                        </View>
                        <View style={styles.buyPart}>
                            <TouchableOpacity style={styles.buyButton} onPress={()=>props.navigation.navigate("Chat",{pricing:price})}>
                                <Text style={styles.partTxt}>Acheter ma place</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    ))}
                </View>
            </ScrollView>
            
            </>
            }
        </SafeAreaView>
    );
}


export default EventDetails;

const styles = StyleSheet.create({
    container: {
        backgroundColor: commonStyles.BLACK,
        height: '100%',
        justifyContent: 'center',
        position:"relative",
    },
    return:{
        position: 'absolute',
        top:-120,
        left:10,
        width:commonStyles.WIDTH > 370 ? 25 : 20,
        height:commonStyles.WIDTH > 370 ? 25 : 20
    },
    heroPart: {
        height: '20%',
    },
    heroImg: {
        height: "100%",
        width: "100%"
    },
    scroll:{
        marginVertical: "10%",
        width: "100%",
    },
        content:{
            width: "100%",
            alignItems:'center'
        },
            titlePart:{
                flexDirection:'row',
                width:"85%"
            },
                titleAndType:{

                },
                    titleTxt:{
                        fontFamily: commonStyles.MAIN_FONT,
                        fontSize: commonStyles.WIDTH > 370 ? 25 : 21,
                        color: commonStyles.WHITE,
                    },
                    typeTxt:{
                        fontFamily: commonStyles.MAIN_FONT,
                        fontSize: commonStyles.WIDTH > 370 ? 21 : 17,
                        color: commonStyles.DARK_WHITE,
                        paddingLeft:commonStyles.WIDTH > 370 ? 28 : 23
                    },
            orgaAndFav:{
                flexDirection:'row',                
                width:"85%",
                marginVertical:"4%",
                justifyContent: 'center'
            },
                orga:{
                    flexDirection:'row',
                    alignItems: 'center'
                },
                    partTxt:{
                        fontFamily: commonStyles.MAIN_FONT,
                        fontSize: commonStyles.WIDTH > 370 ? 18 : 15,
                        color: commonStyles.WHITE,
                    },
                    orgaImg:{
                        width: commonStyles.WIDTH > 370 ? 15 : 12,
                        height: commonStyles.WIDTH > 370 ? 15 : 12,
                        marginRight:"10%"
                    },
            dateHourAndAddress: {
                width:"85%",
                borderWidth:2,
                borderRadius:4,
                borderColor: commonStyles.MEDIUM_ORANGE,
                paddingVertical: "2%",
                paddingHorizontal: "4%",
                marginVertical:"4%"
            },
                dateAndHour: {
                    flexDirection:'row',
                    alignItems: 'center',
                    marginVertical:"2%"
                },
                    calImg:{
                        width: commonStyles.WIDTH > 370 ? 15 : 12,
                        height: commonStyles.WIDTH > 370 ? 15 : 12,
                        marginRight:"5%"
                    },
            descPart: {
                width:"85%",
                marginVertical:"4%"
            },
                descTitle: {
                    flexDirection: 'row',
                    alignItems:'center'
                },
                descContent:{
                    padding:"2%"
                },
                    descTxt:{
                        fontFamily: commonStyles.MAIN_FONT,
                        fontSize: commonStyles.WIDTH > 370 ? 15 : 12,
                        color: commonStyles.DARK_WHITE,
                    },
            moodsAndCharacsPart:{
                width:"85%",
                marginVertical:"4%",
                flexDirection: "row",
                justifyContent: 'center'
            },
                moods:{
                    flex:1,
                    borderWidth:2,
                    borderRadius:4,
                    borderColor: commonStyles.MEDIUM_ORANGE,
                    marginRight:"5%",
                    padding:"3%",
                    maxWidth:commonStyles.WIDTH > 370 ? 200 : 150,
                    alignItems: 'center'
                },
                    squareTitle:{
                        fontFamily: commonStyles.MAIN_FONT,
                        fontSize: commonStyles.WIDTH > 370 ? 18 : 15,
                        color: commonStyles.WHITE,
                        textAlign:'center',
                        marginBottom:"5%"
                    },
                        mood:{
                            fontFamily: commonStyles.MAIN_FONT,
                            fontSize: commonStyles.WIDTH > 370 ? 15 : 12,
                            color: commonStyles.DARK_WHITE,
                            textAlign:'center',
                            padding:commonStyles.WIDTH > 370 ? 3 : 2,
                            borderWidth:1,
                            borderRadius:4,
                            borderColor: commonStyles.MEDIUM_ORANGE,
                            marginVertical:"2%"
                        },
                characs:{
                    flex:1,
                    borderWidth:2,
                    borderRadius:4,
                    borderColor: commonStyles.MEDIUM_ORANGE,
                    marginLeft:"5%",
                    padding:"3%",
                    alignItems: 'center'
                },
    buyTicketPart: {
        width: "100%",
        alignItems: 'center',
        marginVertical:"5%"
    },
        buyButton: {
            backgroundColor: commonStyles.MEDIUM_ORANGE,
            borderRadius:6,
            padding:"5%"
        },
        priceItem:{
            flexDirection: 'row',
            alignItems:"center",
            width:"85%",
            marginVertical: "2%"
        },
        priceTitle:{
            flex:2
        },
        buyPart:{
            flex:2.5,
            alignItems:"center",
            justifyContent:"flex-end"
        }

});