import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, {useState,useEffect} from "react";
import { Animated, StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity } from "react-native";
import * as commonStyles from "../../utils/commonStyles";
import { useWindowDimensions } from 'react-native';
import CreateEvent from "../../components/createEventComponents/CreateEvent";
import CreateEtab from "../../components/createEventComponents/CreateEtab";
import { fetchUserInfos } from "../../utils/functions";
import CreatePermTicket from "../../components/createEventComponents/CreatePermTicket";



const CreateEventView = (props) => {

    const topTab = createMaterialTopTabNavigator();

    const [user,setUser] = useState({});

    // A modifier !!
//     useEffect(()=>{
//       console.log("fetch");
//       fetchUserInfos()
//           .then(result => {
//               setUser(result);
              
//           })
//           .catch(error=>{
//               console.log("error useEffect");
//               console.log(error);
//           })
//   },[]);

  console.log(user.role);
    // console.log("tick&eve");
    // console.log(props.data)

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
                  style={{flex:1,
                    borderWidth:3,
                    borderColor:isFocused ? commonStyles.MEDIUM_ORANGE : commonStyles.WHITE,
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                  }}
                >
                  <Animated.Text style={{
                      fontFamily:commonStyles.MAIN_FONT,
                      color:isFocused ? commonStyles.MEDIUM_ORANGE : commonStyles.WHITE,
                      fontSize:commonStyles.WIDTH > 370 ? 20 : 17,
                      textAlign:'center',
                  }}>
                    {label}
                  </Animated.Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.heroPart}>
                <Image source={require('../../assets/CreateEvent/Back.png')} style={styles.heroImg}/>
            </View>
            <topTab.Navigator 
            initialRouteName='CreateMyEvent'
            screenOptions={{
              headerShown: false,
              tabBarHideOnKeyboard: true
            }}
            tabBar={props => <MyTabBar {...props} />}
            >
                <topTab.Screen 
                    name="Créer un évènement" 
                    component={CreateEvent}
                    initialParams={{"data":props.data}}
                />
                {user.role == "Personne morale" ?
                <topTab.Screen 
                  name="Créer un établissement"    
                  component={CreateEtab}
                />
                : 
                <topTab.Screen 
                  name="Créer un ticket permanent"    
                  component={CreatePermTicket}
                />
              }
                
            </topTab.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:commonStyles.BLACK,
        height:'100%'
    },
    heroPart:{
        height:commonStyles.WIDTH > 370 ? 125 : 100,
    },
        heroImg:{
            height:"100%",
            width:"100%"
        },
    buttonsPart:{
        height:commonStyles.WIDTH > 370 ? 45 : 35,
        display:'flex',
        flexDirection:'row'
    },
});

export default CreateEventView;
