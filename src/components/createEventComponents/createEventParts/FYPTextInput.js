import React, { useState, useEffect } from "react";
import { TouchableWithoutFeedback, StyleSheet, SafeAreaView, TextInput, Image, View, TouchableOpacity, Button, FlatList, ScrollView } from "react-native";
import * as commonStyles from "../../../utils/commonStyles";
import * as data from "../../../utils/data";

function FYPTextInput(props) {

    const [onInput,setOnInput] = useState(false);
    const [input,setInput] = useState(null);

    const [value,setValue] = useState("");

    useEffect(() => {
        setValue(props.text);
    },[]);

    const changeText = (value) => {
        props.n ? props.setText(value,props.n) : props.setText(value);
        setValue(value);
    }

    return(
        <TouchableOpacity style={styles.labelAddress} onPress={()=>{setOnInput(true);input.focus()}}>
            <TextInput
                style={{...styles.labelTitleTxt,minWidth:onInput ? (commonStyles.WIDTH>370 ? 220 : 180) :  (commonStyles.WIDTH>370 ? 170 : 140)}}
                placeholder={props.placeholder}
                placeholderTextColor={commonStyles.DARK_WHITE}
                onChangeText={(value) => changeText(value)}
                onFocus={() =>setOnInput(true)}
                onBlur={() =>setOnInput(false)}
                ref={(input) => setInput(input)}
                value={value}
            />
            {onInput ?
            <TouchableOpacity onPress={() => {props.n ? props.setText("",props.n) : props.setText("");setValue("")}}>
                <Image style={styles.editImgLittle} source={require('../../../assets/CreateEvent/Cross.png')}/>
            </TouchableOpacity>
            :
            <Image style={styles.editImgLittle} source={require('../../../assets/CreateEvent/Edit.png')}/>
            }
        </TouchableOpacity>
    );
}

export default FYPTextInput;

const styles = StyleSheet.create({
    labelAddress:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height:40
    },
        labelTitleTxt:{
            fontFamily: commonStyles.MAIN_FONT,
            fontSize: commonStyles.WIDTH > 370 ? 18 : 15,
            color: commonStyles.WHITE,
            // paddingLeft:commonStyles.WIDTH > 370 ? 32 : 30,
            paddingRight:commonStyles.WIDTH > 370 ? 15 : 10
        },
    editImgLittle: {
        width: commonStyles.WIDTH > 370 ? 15 : 12,
        height: commonStyles.WIDTH > 370 ? 15 : 12
    },
});