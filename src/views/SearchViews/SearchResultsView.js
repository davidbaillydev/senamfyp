import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, Image } from 'react-native'
import { GRAY, WHITE, WIDTH } from "../../utils/commonStyles";
import EventOverview from "../../components/searchComponents/EventOverview";
import { SafeAreaView } from "react-native-safe-area-context";
import { keyExtractor } from "react-native/Libraries/Lists/VirtualizeUtils";




const SearchResultsView = (props) => {
    //console.log("events in search results : ", props.data);

    return(
        <View style={[props.customStyle, styles.mainContainer]}>
            {props.data.length !== 0
            ?
            <FlatList
                data={props.data}
                renderItem={({item}) => {
                    return(
                        <>
                            <EventOverview event={item} customStyle={{marginVertical: 15}}/>
                            <View style={styles.lineSeparatorContainer}>
                                <Image
                                    source={require("../../assets/MyTickets/barre.png")}
                                    style={styles.lineSeparatorImg}
                                />
                            </View>
                            
                        </>
                    );
                }}
                keyExtractor={item => item.id}
            />
            :
            <Text style={{color: WHITE}}>Aucun evenement trouvé</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'stretch'
    },
    lineSeparatorContainer: {
        width: '100%',
        alignItems: 'center'
    },
    lineSeparatorImg: {
        width: WIDTH > 370 ? 250 : 210,
        height: 20
    }
})

export default SearchResultsView;