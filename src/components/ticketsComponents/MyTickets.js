import React, {useState,useEffect} from "react";
import { StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity,FlatList, ImageBackground} from "react-native";
import * as commonStyles from "../../utils/commonStyles";

const MyTickets = (props) => {


    const formatDate = (date) => {
        const split = date.split("-");
        return (split[2]+"/"+split[1]+"/"+split[0][2]+split[0][3]);
    }

    const formatTime = (time) => {
        const split = time.split(":");
        return(split[0]+":"+split[1]);
    }

    return(
        <SafeAreaView style={styles.container}>
            <FlatList style={styles.ticketsPart} 
                ItemSeparatorComponent={() => (
                    <View style={styles.separator}>
                        <Image source={require('../../assets/MyTickets/barre.png')} style={styles.imgSeparator}/>
                    </View>
                )}
                data={props.route.params.data}
                renderItem={({ item, index, separators }) => (
                    <View style={styles.ticketPart} key={item.ticket_id}>
                        <ImageBackground source={require('../../assets/MyTickets/ticket.png')}  style={styles.imgBg}>
                            <View style={styles.precisions}>
                                <View style={styles.date}>
                                    <Text style={styles.dateTxt}>{formatDate(item.date)}</Text>
                                </View>
                                <View style={styles.hour}>
                                    <Text style={styles.hourTxt}>{formatTime(item.time_from)}</Text>
                                </View>
                                <View style={styles.place}>
                                    <Text style={styles.placeTxt}>{item.label_address ? item.label_address : item.street_number +" "+ item.street +" "+ item.city}</Text>
                                </View>
                            </View>
                            <View style={styles.mainInfos}>
                                <View style={styles.title}>
                                    <Text style={styles.titleTxt}>{item.name}</Text>
                                </View>
                                <View style={styles.QRAndPlus}>
                                    <TouchableOpacity style={styles.QR} onPress={() => props.onShowQRCode(item.code)}>
                                        <Image source={require('../../assets/MyTickets/QRCode.png')} style={styles.imgQR}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.Plus}>
                                        <Text style={styles.PlusTxt}>Plus d'infos</Text>
                                        <Image source={require('../../assets/MyTickets/arrowNext.png')} style={styles.imgArrowPlus}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                )}
            />
            <View style={styles.linkPart}>
                <TouchableOpacity style={styles.clickablePart} onPress={() => props.navigation.navigate("PastEvents")}>
                    <Text style={styles.link}>Evènements archivés</Text>
                    <Image source={require('../../assets/MyTickets/arrowNextWhite.png')} style={styles.imgArrow}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
    },
    ticketsPart:{
        width:'100%',
        height:"80%",
        marginTop:"7%",
    },
        separator: {
            height:50,
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        },
            imgSeparator: {
                width : commonStyles.WIDTH > 370 ? 240 : 220,
                height:20
            },
        ticketPart:{
            width:"100%",
            height:commonStyles.HEIGHT > 600 ? 130 : 110,
            justifyContent:'center',
            alignItems:'center',
        },
            imgBg:{
                display:'flex',
                flexDirection:'row',
                height:commonStyles.HEIGHT > 600 ? 130 : 110,
                width:commonStyles.WIDTH > 370 ? 320 : 270,
            },
            precisions: {
                flex:1.2,
                display:'flex',
            },
                date: {
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center',
                    paddingRight:"15%"
                },
                    dateTxt:{
                        fontFamily:commonStyles.MAIN_FONT,
                        color:commonStyles.MEDIUM_ORANGE,
                        fontSize:commonStyles.WIDTH > 370 ? 15 : 13,
                    },
                hour: {
                    flex:1,
                    justifyContent:'center',
                    alignItems:'flex-end',
                    paddingRight:"30%"
                },
                    hourTxt:{
                        fontFamily:commonStyles.MAIN_FONT,
                        color:commonStyles.MEDIUM_ORANGE,
                        fontSize:commonStyles.WIDTH > 370 ? 15 : 13,
                    },
                place: {
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center',
                    paddingRight:"15%"
                },
                    placeTxt:{
                        fontFamily:commonStyles.MAIN_FONT,
                        color:commonStyles.MEDIUM_ORANGE,
                        fontSize:commonStyles.WIDTH > 370 ? 15 : 13,
                    },
            mainInfos: {
                flex:2,
            },
                title:{
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center',
                },
                    titleTxt:{
                        fontFamily:commonStyles.MAIN_FONT,
                        color:commonStyles.MEDIUM_ORANGE,
                        fontSize:commonStyles.WIDTH > 370 ? 20 : 17,
                    },
                QRAndPlus: {
                    flex:3,
                    flexDirection:'row'
                },
                    QR:{
                        flex:1,
                        justifyContent:'center',
                        alignItems:'center',

                    },
                        imgQR:{
                            width:commonStyles.WIDTH > 370 ? 80 : 70,
                            height:commonStyles.WIDTH > 370 ? 80 : 70,
                        },
                    Plus:{
                        flex:0.8,
                        justifyContent:'center',
                        alignItems:'flex-end',
                        flexDirection:'row',
                        paddingBottom:"8%",
                        paddingRight:"5%"
                    },
                        PlusTxt:{
                            fontFamily:commonStyles.MAIN_FONT,
                            color:commonStyles.MEDIUM_ORANGE,
                            fontSize:commonStyles.WIDTH > 370 ? 15 : 13,
                            marginRight:"5%",
                            paddingBottom:"2%"
                        },
                        imgArrowPlus:{
                            height:commonStyles.WIDTH > 370 ? 20 : 18,
                            width:commonStyles.WIDTH > 370 ? 20 : 18,
                        },
    linkPart:{
        height:'20%',
        display:'flex',
        alignSelf:'flex-end',
        alignItems:'center',
        marginHorizontal:'11%',
        flexDirection:'row'
    },
        clickablePart:{
            height:'30%',
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

export default MyTickets;
