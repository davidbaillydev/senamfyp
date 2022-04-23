import React,{useEffect} from "react";
import { StyleSheet, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UpcomingEventsView from "../MyEventsViews/UpcomingEventsView";
import PastEventsView from "../MyEventsViews/PastEventsView";
import EventDetails from "../MyEventsViews/EventDetails";
import EventRoles from "../MyEventsViews/EventRoles";
import HandleEvent from "../MyEventsViews/HandleEvent";
import EditEvent from "../MyEventsViews/EditEvent";

const MyEventsView = (props) => {

    const eventsStack = createNativeStackNavigator();

    useEffect(()=>{
        if (props.route.params != null){
            // console.log("yes");
            props.navigation.navigate("EventDetails",{eventCode:props.route.params.eventCode})
        }
    },[props.route.params])
    

    return(
        <eventsStack.Navigator 
            // initialRouteName="EventDetails"
        >
            <eventsStack.Screen name="UpcomingEvents" component={UpcomingEventsView} options={{ headerShown: false }}/>
            <eventsStack.Screen name="PastEvents" component={PastEventsView} options={{ headerShown: false }}/>
            <eventsStack.Screen name="EventDetails" component={EventDetails} options={{ headerShown: false }}/>
            <eventsStack.Screen name="EventRoles" component={EventRoles} options={{ headerShown: false }}/>
            <eventsStack.Screen name="HandleEvent" component={HandleEvent} options={{ headerShown: false }}/>
            <eventsStack.Screen name="EditEvent" component={EditEvent} options={{ headerShown: false }}/>
        </eventsStack.Navigator>
    );
}

const styles = StyleSheet.create({

});

export default MyEventsView;
