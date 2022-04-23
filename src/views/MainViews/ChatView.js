import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ConversationsView from "../ChatViews.js/ConversationsView";
import MessagesView from "../ChatViews.js/MessagesView";

const ChatView = () => {

    const chatStack = createNativeStackNavigator();


    return(
        //<NavigationContainer independent={true}>
        <chatStack.Navigator>
            <chatStack.Screen name="Conversations" component={ConversationsView} options={{ headerShown: false }}/>
            <chatStack.Screen name="Messages" component={MessagesView} options={{ headerShown: false }} />
        </chatStack.Navigator>
        //</NavigationContainer>
    );
}

export default ChatView;