import React, {useState,useEffect} from "react";
import { StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, Button } from "react-native";
import * as commonStyles from "../../utils/commonStyles";

const CreatePermTicket = ({navigation}) => {

    return(
        <SafeAreaView style={styles.container}>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:commonStyles.BLACK,
        height:'100%'
    },
});

export default CreatePermTicket;
