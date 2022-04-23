import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { BASIC_TEXT, MAIN_FONT, WHITE, WIDTH } from '../../utils/commonStyles';
import CustomIconAndLabel from './CustomIconAndLabel';


const EventOverview = ({event, customStyle}) => {
    console.log(WIDTH);
    return(
        <View style={[styles.mainContainer, customStyle]}>
            <View style={styles.eventTypeAndNameContainer}>
                {/* Nom & type d'event */}
                <Text style={styles.detailsText}>{event.type} - {event.name}</Text>
            </View>
            <View style={styles.imgAndDetailsContainer}>
                {/* Photo et détails de l'event */}
                <Image
                    source={event.photo}
                    style={styles.imgStyle}
                />
                <View
                    style={styles.detailsContainer}
                >
                    {/* Détails de l'event */}
                    <CustomIconAndLabel
                        icon={require('../../assets/Search/localisation.png')}
                        labelComponent={
                            <Text style={styles.detailsText}>{event.district}</Text>
                        }
                    />
                    <View style={[styles.innerDetailsContainer]}>
                        <View style={{flex: 1}}>
                            <CustomIconAndLabel
                                icon={require('../../assets/Search/calendar_icon.png')}
                                labelComponent={
                                    <Text style={styles.detailsText}>{event.date}</Text>
                                }
                            />
                            <CustomIconAndLabel
                                icon={require('../../assets/Search/people_icon.png')}
                                labelComponent={
                                    <Text style={styles.detailsText}>{event.total_participants}</Text>
                                }
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <CustomIconAndLabel
                                icon={require('../../assets/Search/time_icon.png')}
                                labelComponent={
                                    <Text style={styles.detailsText}>{event.time}</Text>
                                }
                            />
                            <CustomIconAndLabel
                                icon={require('../../assets/Search/price_icon.png')}
                                labelComponent={
                                    <Text style={styles.detailsText}>{event.price}</Text>
                                }
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        
    },
    eventTypeAndNameContainer: {
        marginBottom: WIDTH > 370 ? 10 : 5
    },
    imgAndDetailsContainer: {
        flexDirection: 'row',
    },
    imgStyle: {
        width: '40%',
        height: '100%'
    },
    detailsContainer: {
        flex: 2,
        alignItems: 'stretch',
        marginLeft: WIDTH > 370 ? 15 : 10
    },
    detailsText: {
        color: WHITE,
        fontFamily: MAIN_FONT,
        fontSize: WIDTH > 370 ? 20 : 15
    },
    innerDetailsContainer: {
        flexDirection: 'row'
    }
})


export default EventOverview;