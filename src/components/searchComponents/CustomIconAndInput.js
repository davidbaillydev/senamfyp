import React, { useState, useRef } from "react";
import { View, Image } from "react-native";

const iconSize = 50;

const CustomIconAndInput = ({icon, inputComponent, iconFlex, inputFlex, customStyle}) => {


    return(
        <View style={[{flexDirection: 'row'}, customStyle]}>
            <View style={{flex: iconFlex, alignItems: "center", justifyContent: 'center'}}>
                <Image
                    source={icon}
                    style={{width: iconSize, height: iconSize}}
                />
            </View>
            <View style={{flex: inputFlex}}>
                {inputComponent}
            </View>
        </View>
    );

}

export default CustomIconAndInput;