/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

//React imports
import React,{ useEffect,useState} from 'react';
import { Linking,StyleSheet, Text, View, Image, ActivityIndicator,SafeAreaView } from 'react-native';

//dependencies imports
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//external components imports
import SearchView from './views/MainViews/SearchView';
import MyEventsView from './views/MainViews/MyEventsView';
import ChatView from './views/MainViews/ChatView';
import ProfileView from './views/MainViews/ProfileView';
import * as FYPStyles from './utils/commonStyles';
import LogInOrSignInView from './views/MainViews/LogInOrSignInView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as commonStyles from "./utils/commonStyles";
import ScanQRCView from './views/MyEventsViews/ScanQRCView';
import EventDetails from './views/MyEventsViews/EventDetails';
import * as RootNavigation from './RootNavigation.js';
import {navigationRef} from "./RootNavigation"
import CreateEvent from './views/MainViews/CreateEventView';
import PaymentView from './views/MyEventsViews/PaymentView';

const useMount = func => useEffect(() => func(), []);

  const useInitialURL = () => {
    const [url, setUrl] = useState(null);
    const [processing, setProcessing] = useState(true);

    useMount(() => {
      const getUrlAsync = async () => {
        // Get the deep link used to open the app
        const initialUrl = await Linking.getInitialURL();
        console.log("getInitialURL : deeep link used to open the app")

        // The setTimeout is just for testing purpose
        setTimeout(() => {
          setUrl(initialUrl);
          setProcessing(false);
        }, 1000);
      };

      getUrlAsync();
    });

    return { url, processing };
  };

const App = (props) => {

  const { url: initialUrl, processing } = useInitialURL();
  const [urlListened,setUrlListened] = useState("");
  const [urlOpen,setUrlOpen] = useState("");

  const ICON_SIZE = 30;

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const [hasToken, setHasToken] = useState(false);
  const [isDataReceived,setIsDataReceived] = useState(false);

  const hasTokenFunc = async () => {

        // await AsyncStorage.setItem("api_token","OK");
        // AsyncStorage.clear();
        const token = await AsyncStorage.getItem("api_token")
          setIsDataReceived(true);
          if (typeof token === "string"){
            // navigation.navigate("Home");
            setHasToken(true);
        }
        
        // console.log(token);
        
    }

    const setToken = (value) => {
      setHasToken(value);
    }
  
  useEffect(() => {
    hasTokenFunc();
    setUrlOpen(initialUrl);
  },[]);

  useEffect(() => {
    if (processing || initialUrl == null){
        console.log("processing...")
     } else {
        RootNavigation.navigate("MyEvents",
            {eventCode : initialUrl.split("/")[4]}
        );
        console.log("url = "+initialUrl+ " event Code = " + initialUrl.split("/")[4]);
    }
  },[urlListened,processing,initialUrl])

  Linking.addEventListener('url', ({url}) => {
    RootNavigation.navigate("MyEvents",
            {eventCode :  url.split("/")[4] }
        );
    setUrlListened(url);
  })

  const Home = () => {
    return(
      <Tab.Navigator 
        // initialRouteName='MyEvents'
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: FYPStyles.BLACK },
          tabBarActiveTintColor: FYPStyles.MEDIUM_ORANGE,
          tabBarHideOnKeyboard: true
        }}
      >
        <Tab.Screen
          name="Search"
          component={SearchView}
          options={{
            tabBarLabel: "Rechercher",
            tabBarIcon: (() => {
              return <Image source={require("./assets/Bottom_Navbar/search.png")} style={{width: ICON_SIZE, height: ICON_SIZE}}/>
            })
          }}
        />
        <Tab.Screen
          name="Events" 
          component={CreateEvent}
          options={{
            tabBarLabel: "Créer un event",
            tabBarIcon: (() => {
              return <Image source={require("./assets/Bottom_Navbar/create-event.png")} style={{width: ICON_SIZE, height: ICON_SIZE}}/>
            })
          }}  
        />
        <Tab.Screen
          name="MyEvents"
          component={MyEventsView}
          options={{
            tabBarLabel: "Mes events",
            tabBarIcon: (() => {
              return <Image source={require("./assets/Bottom_Navbar/my_events.png")} style={{width: ICON_SIZE, height: ICON_SIZE}}/>
            })
          }} 
        />
        <Tab.Screen
          name="Chat"
          component={PaymentView}
          options={{
            tabBarLabel: "Chat",
            tabBarIcon: (() => {
              return <Image source={require("./assets/Bottom_Navbar/chat.png")} style={{width: ICON_SIZE, height: ICON_SIZE}}/>
            })
          }} 
        />
        <Tab.Screen
          name="Profile"
          children={() => <ProfileView disconnect={setToken}/>}
          options={{
            tabBarLabel: "Mon profil",
            tabBarIcon: (() => {
              return <Image source={require("./assets/Bottom_Navbar/profile.png")} style={{width: ICON_SIZE, height: ICON_SIZE}}/>
            })
          }} 
        />
      </Tab.Navigator>
    );
  }

//   console.log(hasToken);

  if (processing && initialUrl == null){
    return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size='large' color={commonStyles.LIGHT_ORANGE}/>
    </SafeAreaView>
    );
  } else {


      
      return (
        <>
        {hasToken ?
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false
              }}
            >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Scan" component={ScanQRCView} />
              <Stack.Screen name="Payment" component={PaymentView} />
            </Stack.Navigator>
          </NavigationContainer>
          :
          <LogInOrSignInView setToken={setToken} disconnect={hasTokenFunc}/>
          }
          {/* <Text>
        {processing
          ? `Processing the initial url from a deep link`
          : `The deep link is: ${initialUrl || "None"}`}
      </Text> */}
        </>
        
      );


  }
  
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: commonStyles.BLACK,
        height: '100%',
        justifyContent: 'center',
    },
});

export default App;
