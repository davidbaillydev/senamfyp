import { StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, Button, FlatList } from "react-native";
import React, {useState,useEffect} from "react";
import * as commonStyles from "../../../utils/commonStyles";


const ReturnOrNext = (props) => {


    return (
        <View style={{...styles.container,justifyContent:props.return ? 'space-between' : 'flex-end'}}>
            {props.return && <TouchableOpacity style={styles.returnPart} onPress={() => props.navigation.navigate(props.return)}>
                <Image style={styles.return} source={require('../../../assets/MyTickets/arrowNextWhite.png')}/>
            </TouchableOpacity>}
            {props.next && <TouchableOpacity style={styles.nextPart} onPress={() => props.next()}>
                <Text style={styles.nextTxt}>{props.end ? "Valider" : "Suivant"}</Text>
                <Image style={styles.next} source={require('../../../assets/MyTickets/arrowNextWhite.png')}/>
            </TouchableOpacity>}
        </View>
    );
}

export default ReturnOrNext;

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:"10%",
        height:"5%",
        marginVertical:"5%"
    },
    returnPart:{
    height:"100%",
    width:"8%",
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center'
    },
    nextPart:{
        height:"100%",
        width:"25%",
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        paddingRight:"4%"
        },
    return:{
        transform:[{rotate:'180deg'}],
        width:commonStyles.WIDTH > 370 ? 30 : 25,
        height:commonStyles.WIDTH > 370 ? 30 : 25,
    },
    next:{
        width:commonStyles.WIDTH > 370 ? 30 : 25,
        height:commonStyles.WIDTH > 370 ? 30 : 25,
    },
        nextTxt:{
            fontFamily:commonStyles.MAIN_FONT,
            color:commonStyles.WHITE,
            fontSize:commonStyles.WIDTH > 370 ? 18 : 15,
            paddingRight:"15%"
        }
});