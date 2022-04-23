import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState,useEffect} from "react";
import { StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, ActivityIndicator } from "react-native";
import MyTicketsAndEvents from "../../components/ticketsComponents/MyTicketsAndEvents";
import NoTickets from "../../components/ticketsComponents/NoTickets";
import * as commonStyles from "../../utils/commonStyles";
import { APP_URL_EMU } from "../../utils/config";

const UpcomingEventsView = (props) => {

    const [hasTickets,setHasTickets] = useState(false);
    const [hasEvents,setHasEvents] = useState(false);
    const [isDataReceived,setIsDataReceived] = useState(false);
    const [tickets,setTickets] = useState({});
    const [events,setEvents] = useState([]);

    const getTickets = async () => {
        const id = await AsyncStorage.getItem("user_id");

        fetch(APP_URL_EMU +"/api/tickets/"+id,{method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            //console.log(responseData);
            if (responseData.length !== 0){
                setTickets(responseData);
                setHasTickets(true);
            } else {
                setHasTickets(false);
            }
        })
        .then(()=>{
            setIsDataReceived(true);
            
        });
    }

    const fetchMyEvents = async () => {
        const id = await AsyncStorage.getItem("user_id");
        // console.log(id);
        const url = APP_URL_EMU + "/api/events/user/" + id;
        fetch(url, {method: 'GET'})
            .then(result => result.json())
            .then((responseData) => {
                setEvents(responseData);
                setHasEvents(true);
            })
            .catch((e) => {console.error(e)})
    }

    useEffect(() => {
        // console.log("tickets test");
        getTickets();
        fetchMyEvents();
        return(() => {setTickets({})});
    },[]);

    useEffect(() => {
        fetchMyEvents();
    },[props.navigation])

    return(
        <SafeAreaView style={styles.container}>
            {isDataReceived ?
            !hasTickets || !hasEvents ? 
                <NoTickets/>
            :
                <MyTicketsAndEvents data={tickets} events={events} {...props}/>
            
            :
            <ActivityIndicator size='large' color={commonStyles.LIGHT_ORANGE}/>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:commonStyles.BLACK,
        height:'100%',
        width:"100%",
        display:'flex',
        justifyContent:'center',
        // alignItems:'center'
    },
    imgPart:{
        height:'40%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
        img:{
            height:180,
            width:180
        },
    h1Part:{
        height:'20%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:'12%'
    },
        h1:{
            fontFamily:'BebasNeue-Regular',
            color:'white',
            fontSize:25,
            textAlign:'center',
        },
    h2Part:{
        height:'20%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:'11%'
    },
        h2:{
            fontFamily:'BebasNeue-Regular',
            color:commonStyles.LIGHT_GRAY,
            fontSize:19,
            textAlign:'center',
        },
        h2Link:{
            fontFamily:'BebasNeue-Regular',
            color:commonStyles.LIGHT_ORANGE,
            fontSize:19,
            textAlign:'center',
        },
    linkPart:{
        height:'20%',
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
        marginHorizontal:'11%',
        flexDirection:'row'
    },
        clickablePart:{
            height:'20%',
            width:'48%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'row'
        },
            link:{
                fontFamily:'BebasNeue-Regular',
                color:commonStyles.MEDIUM_ORANGE,
                fontSize:17,
                textAlign:'center',
                marginRight:10,
            },
            imgArrow:{
                height:30,
                width:30
            }
});

export default UpcomingEventsView;
