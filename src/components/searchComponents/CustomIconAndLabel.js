import React, { useState, useRef } from "react";
import { View, Image } from "react-native";

const iconSize = 30;

const CustomIconAndLabel = ({icon, labelComponent, customStyle}) => {


    return(
        <View style={[{flexDirection: 'row', alignItems: 'center'}, customStyle]}>
            <View style={{alignItems: "center", justifyContent: 'center'}}>
                <Image
                    source={icon}
                    style={{width: iconSize, height: iconSize}}
                />
            </View>
            {labelComponent}
        </View>
    );

}

export default CustomIconAndLabel;