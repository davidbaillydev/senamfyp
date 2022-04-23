import { StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomIconAndLabel from "../../components/searchComponents/CustomIconAndLabel";
import CustomLocationTextInput from "../../components/searchComponents/CustomLocationTextInput";

import Filters from "../../components/searchComponents/Filters";
import LocationTextInput from "../../components/searchComponents/LocationTextInput";
import SearchCategoryFilter from "../../components/searchComponents/SearchCategoryFilter";
import { SEARCH_CONTAINER_RADIUS, BASIC_TEXT, BLACK, DARK_ORANGE, HEIGHT, HERO_HEIGHT, INPUT_HEIGHT, MAIN_FONT, MEDIUM_ORANGE, SEARCH_INPUT, SEARCH_VIEW_CONTAINERS_WIDTH, WHITE, WIDTH } from "../../utils/commonStyles";
import { APP_URL_EMU } from "../../utils/config";

import BasicSearchView from "../SearchViews/BasicSearchView";
import SearchResultsView from "../SearchViews/SearchResultsView";

const type = "TYPE EVENEMENT";
const nom = "NOM EVENEMENT";
const lieu = "LIEU DE L'EVENEMENT";
const date = "XX/XX/XX";
const hour = "XX H XX";
const nbParticipants = "XX";
const price = "XX €";

const eventTemplate = {"id": 1, "name" : nom, "type": type, "photo": require('../../assets/Examples_Images/Img1.png'),"district" : lieu, "date": date, "time": hour, "total_participants": nbParticipants, "price": price}
const eventTemplate2 = {"id": 2, "name" : nom, "type": type, "photo": require('../../assets/Examples_Images/Img2.png'),"district" : lieu, "date": date, "time": hour, "total_participants": nbParticipants, "price": price}
const eventTemplate3 = {"id": 3, "name" : nom, "type": type, "photo": require('../../assets/Examples_Images/Img3.png'),"district" : lieu, "date": date, "time": hour, "total_participants": nbParticipants, "price": price}
const eventTemplate4 = {"id": 4, "name" : nom, "type": type, "photo": require('../../assets/Examples_Images/Img1.png'),"district" : lieu, "date": date, "time": hour, "total_participants": nbParticipants, "price": price}
const listEventTemplates = [eventTemplate,eventTemplate2, eventTemplate3, eventTemplate4];

const SearchView = (props) => {

    const [searchLocation, setSearchLocation] = useState({"properties": {"label": ""}});
    console.log("search location selected : ", searchLocation);
    const [category, setCategory] = useState("");
    console.log("category selected : ", category);

    //0 : Aucune recherche lancée encore | 1 : lieu
    //2 : type d'événement | 3 : date (calendrier ou dates flexibles) | 4 : Premiers résultats de recherche
    const [searchStep, setSearchStep] = useState(0);
    const [searchResults, setSearchResults] = useState(listEventTemplates);

    const increaseStep = () => {
        setSearchStep(previousStep => previousStep+1);
    }

    const decreaseStep = () => {
        setSearchStep(previousStep => previousStep-1);
    }

    const onSelectCategory = (categ) => {
        console.log("appel");
        increaseStep();
        setCategory(categ);
    }

    return(
        <SafeAreaView style={styles.mainContainer}>
            {(searchStep>0 && searchStep<4) ?
            <TouchableOpacity
                onPress={decreaseStep}
                style={{position: 'absolute', zIndex: 5, margin: 15}}
            >    
                <Image 
                    source={require('../../assets/white_arrow.png')}
                    style={{width: WIDTH*0.072, height: WIDTH*0.072}}
                />
            </TouchableOpacity>
            :
            <></>
            }
            
            <View style={styles.headerContainer}>
                <Image
                    source={require('../../assets/Search/search_background_2.png')}
                    style={styles.headerImg}
                />
                {/* Donne le point de départ aux filtres qui survolent les résultats */}
                <View  style={{width: '100%', zIndex: 5}}> 
                    {/* Conteneur qui survole les résultats de recherche */}
                    <View style={{width: '100%', position: 'absolute'}}>
                        {searchStep === 0 ?
                            <TouchableOpacity
                                onPress={increaseStep}
                                style={{top: -INPUT_HEIGHT/2, alignItems: 'center'}}
                            >
                                <View style={styles.searchBar}>
                                    <View style={styles.searchIconContainer}>
                                        <Image
                                            source={require('../../assets/Bottom_Navbar/search.png')}
                                            style={styles.searchIcon}
                                        />
                                    </View>
                                    <View
                                        style={SEARCH_INPUT}
                                    >
                                        <Text style={styles.searchBarText}>
                                            Rechercher un événement
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        :
                            <></>
                        }
                        {searchStep === 1 ?
                            <View style={{width: '100%', alignItems: 'center'}}>
                                <CustomLocationTextInput
                                    onSetLocation={setSearchLocation}
                                    savedValue={searchLocation.properties.label}
                                />
                                <View style={{width: SEARCH_VIEW_CONTAINERS_WIDTH, zIndex: 5}}>
                                    <TouchableOpacity
                                        onPress={increaseStep}
                                        style={{
                                            position: 'absolute',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            right: 0
                                        }}
                                    >    
                                        <Text style={[BASIC_TEXT, {marginRight: 5}]}>Suivant</Text>
                                        <Image 
                                            source={require('../../assets/white_next_arrow.png')}
                                            style={{width: WIDTH*0.072, height: WIDTH*0.072}}
                                        />
                                    </TouchableOpacity>
                                </View>
                                
                            </View>
                        :
                            <></>
                        }
                        {searchStep === 2 ?
                            <SearchCategoryFilter
                                handleSelectCategory={onSelectCategory}
                                customStyle={{top: -25}}
                            />
                        :
                            <></>
                        }
                        {searchStep === 3 ?
                            <Text style={{color: WHITE}}>Sélection des dates</Text>
                        :
                            <></>
                        }
                        {searchStep === 4 ?
                            <Text style={{color: WHITE}}>Résultats recherche basique</Text>
                        :
                            <></>
                        }
                    </View>
                </View>
                
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
                {/* Pour décaler les résultats de recherche */}
                <View style={{height: INPUT_HEIGHT}}/>
                <SearchResultsView
                    customStyle={[styles.searchResultsContainer, {opacity: (searchStep>0&&searchStep<4) ? 0.5 : 1}]}
                    data={searchResults}
                />
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: BLACK,
        flex: 1,
        alignItems: 'stretch'
    },
    headerContainer: {
        //height: HERO_HEIGHT,
        justifyContent: 'flex-start',
        alignItems: 'center'

    },
    headerImg: {
        height: HEIGHT*0.2,
        width: '100%'
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'stretch',
        width: SEARCH_VIEW_CONTAINERS_WIDTH
    },
    searchIconContainer: {
        paddingHorizontal: 15,
        backgroundColor: BLACK,
        borderColor: MEDIUM_ORANGE,
        borderTopLeftRadius: SEARCH_CONTAINER_RADIUS,
        borderBottomLeftRadius: SEARCH_CONTAINER_RADIUS,
        borderWidth: 2,
        borderRightWidth: 0
    },
    searchIcon: {
        width: INPUT_HEIGHT,
        height: INPUT_HEIGHT,
    },
    searchBarText: {
        color: WHITE,
        fontFamily: MAIN_FONT,
        fontSize: WIDTH > 370 ? 25 : 20
    },
    searchResultsContainer: {
        width: SEARCH_VIEW_CONTAINERS_WIDTH,
    },
    
});

export default SearchView;
