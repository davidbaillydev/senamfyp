import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InfosProfileView from "../ProfileViews.js/InfosProfileView";
import EditProfileView from "../ProfileViews.js/EditProfileView";
import VerifyProfileView from "../ProfileViews.js/VerifyProfileView";
import { NavigationContainer } from "@react-navigation/native";


const ProfileView = (props) => {

    const profileStack = createNativeStackNavigator();


    const disconnect = () => {
        props.disconnect();
    }

    return (
    <NavigationContainer independent={true}>
        <profileStack.Navigator initialRouteName="InfosProfile">
            <profileStack.Screen name="EditProfile" component={EditProfileView} options={{ headerShown: false }} />
            <profileStack.Screen name="InfosProfile" children={props =><InfosProfileView disconnect={disconnect} {...props}/>} options={{ headerShown: false }}/>
            <profileStack.Screen name="VerifyProfile" component={VerifyProfileView} options={{ headerShown: false }}/>
        </profileStack.Navigator>
    </NavigationContainer>
    );
}


export default ProfileView;
