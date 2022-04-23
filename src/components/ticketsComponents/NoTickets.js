import React, {useState,useEffect} from "react";
import { StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity } from "react-native";
import * as commonStyles from "../../utils/commonStyles";

const NoTickets = ({navigation}) => {

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.imgPart}>
                <Image source={require('../../assets/MyTickets/persoMyTicketsEmpty.png')} style={styles.img}/>
            </View>
            <View style={styles.h1Part}>
                <Text style={styles.h1}>Vos billets pour des évènements à venir apparaitront ici</Text>
            </View>
            <View style={styles.h2Part}>
                <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                    <Text style={styles.h2Link}>Trouvez l'évènement idéal</Text>
                </TouchableOpacity>                
                <Text style={styles.h2}>parmis des milliers, ou</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Events")}>
                    <Text style={styles.h2Link}>publiez des évènements.</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.linkPart}>
                <TouchableOpacity style={styles.clickablePart} onPress={() => navigation.navigate("PastEvents")}>
                    <Text style={styles.link}>Evènements archivés</Text>
                    <Image source={require('../../assets/MyTickets/arrowNext.png')} style={styles.imgArrow}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:commonStyles.BLACK,
        height:'100%'
    },
    imgPart:{
        height:'40%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
        img:{
            height:commonStyles.HEIGHT > 600 ? 180 : 160,
            width:commonStyles.WIDTH > 370 ? 180 : 160
        },
    h1Part:{
        height:'20%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:'12%'
    },
        h1:{
            fontFamily:'BebasNeue-Regular',
            color:'white',
            fontSize:commonStyles.WIDTH > 370 ? 25 : 22,
            textAlign:'center',
        },
    h2Part:{
        height:'20%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:'11%'
    },
        h2:{
            fontFamily:'BebasNeue-Regular',
            color:commonStyles.LIGHT_GRAY,
            fontSize:commonStyles.WIDTH > 370 ? 19 : 17,
            textAlign:'center',
        },
        h2Link:{
            fontFamily:'BebasNeue-Regular',
            color:commonStyles.LIGHT_ORANGE,
            fontSize:commonStyles.WIDTH > 370 ? 19 : 17,
            textAlign:'center',
        },
    linkPart:{
        height:'20%',
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
        marginHorizontal:'11%',
        flexDirection:'row'
    },
        clickablePart:{
            height:'20%',
            width:'48%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'row'
        },
            link:{
                fontFamily:'BebasNeue-Regular',
                color:commonStyles.MEDIUM_ORANGE,
                fontSize:commonStyles.WIDTH > 370 ? 17 : 15,
                textAlign:'center',
                marginRight:10,
            },
            imgArrow:{
                height:commonStyles.WIDTH > 370 ? 30 : 25,
                width:commonStyles.WIDTH > 370 ? 30 : 25
            }
});

export default NoTickets;
