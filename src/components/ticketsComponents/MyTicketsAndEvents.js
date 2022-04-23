import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useState, useEffect } from "react";
import { Animated, StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, Button } from "react-native";
import * as commonStyles from "../../utils/commonStyles";
import MyEvents from "./MyEvents";
import MyTickets from "./MyTickets";
import { useWindowDimensions } from 'react-native';
import QRCode from "react-native-qrcode-svg";



const MyTicketsAndEvents = (props) => {

    const [isQrCodeVisible, setIsQrCodeVisible] = useState(false);
    const [qrCodeValue, setQrCodeValue] = useState("");

    const topTab = createMaterialTopTabNavigator();

    const showQRCode = (ticketCode) => {
        console.log("id du ticket : ", ticketCode);
        setIsQrCodeVisible(true);
        setQrCodeValue(ticketCode);
    }

    // console.log("tick&eve");
    // console.log(props.events);

    function MyTabBar({ state, descriptors, navigation, position }) {

        return (
            <View style={styles.buttonsPart}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate({ name: route.name, merge: true });
                        }


                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    const inputRange = state.routes.map((_, i) => i);
                    const opacity = position.interpolate({
                        inputRange,
                        outputRange: inputRange.map(i => (i === index ? 1 : 0)),
                    });

                    return (
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{
                                flex: 1,
                                borderWidth: 3,
                                borderColor: isFocused ? commonStyles.MEDIUM_ORANGE : commonStyles.WHITE,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Animated.Text style={{
                                fontFamily: commonStyles.MAIN_FONT,
                                color: isFocused ? commonStyles.MEDIUM_ORANGE : commonStyles.WHITE,
                                fontSize: commonStyles.WIDTH > 370 ? 20 : 17,
                                textAlign: 'center',
                            }}>
                                {label}
                            </Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.heroPart}>
                <Image source={require('../../assets/MyTickets/Back.png')} style={styles.heroImg} />
            </View>
            <TouchableOpacity onPress={()=>{props.navigation.navigate("Search")}}>
                <Image source={require('../../assets/white_arrow.png')} style={styles.return}/>
            </TouchableOpacity>
            <topTab.Navigator
                initialRouteName='MyEvents'
                screenOptions={{
                    headerShown: false,
                    tabBarHideOnKeyboard: true
                }}
                tabBar={props => <MyTabBar {...props} />}
            >
                <topTab.Screen
                    name="Mes tickets"
                    children={props => <MyTickets onShowQRCode={showQRCode} {...props} />}
                    initialParams={{
                        "data": props.data
                    }}
                />
                <topTab.Screen
                    name="Gérer mes événements"
                    children= {() => <MyEvents {...props}/>}
                />
            </topTab.Navigator>
            {(isQrCodeVisible && qrCodeValue !== "")
                ?
                <View style={styles.qrCodeOverlayStyle}>
                    <QRCode
                        //QR code value
                        value={qrCodeValue}
                        //size of QR Code
                        size={commonStyles.WIDTH * 0.9}
                        //Color of the QR Code (Optional)
                        color="black"
                        //Background Color of the QR Code (Optional)
                        backgroundColor="white"
                    />
                    <Button title="Ok" onPress={() => {
                        setIsQrCodeVisible(false);
                        setQrCodeValue("");
                    }}
                    />
                </View>
                :
                <></>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: commonStyles.BLACK,
        height: '100%'
    },
    return:{
        position: 'absolute',
        top:-120,
        left:10,
        width:commonStyles.WIDTH > 370 ? 25 : 20,
        height:commonStyles.WIDTH > 370 ? 25 : 20
    },
    heroPart: {
        height: '20%',
    },
    heroImg: {
        height: "100%",
        width: "100%"
    },
    buttonsPart: {
        height: "8%",
        display: 'flex',
        flexDirection: 'row'
    },
    qrCodeOverlayStyle: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: commonStyles.MEDIUM_ORANGE + 'a2',
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MyTicketsAndEvents;
