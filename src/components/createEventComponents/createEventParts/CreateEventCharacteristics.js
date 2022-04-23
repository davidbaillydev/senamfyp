import React, { useState, useEffect } from "react";
import { TouchableWithoutFeedback, StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, Button, FlatList, ScrollView } from "react-native";
import * as commonStyles from "../../../utils/commonStyles";
import * as data from "../../../utils/data";
import ReturnOrNext from "./ReturnOrNext";

const CreateEventCharacteristics = (props) => {

    const [eventTypesAll, setEventTypesAll] = useState([]);
    const [moodsAll, setMoodsAll] = useState([]);
    const [characsAll, setCharacsAll] = useState([]);

    const [onPlusTypes, setOnPlusTypes] = useState(false);
    const [onPlusMoods, setOnPlusMoods] = useState(false);
    const [onPlusCharacs, setOnPlusCharacs] = useState(false);

    const [errors,setErrors] = useState({});

    useEffect(()=>{
        if (props.category === "Evènements festifs"){
            setEventTypesAll(data.eventTypesAllFestifs);
            setMoodsAll(data.moodsAllFestifs);
            setCharacsAll(data.characsAllFestifs);
        } else {
            setEventTypesAll(data.eventTypesAllOthers);
            setMoodsAll(data.moodsAllOthers);
            setCharacsAll(data.characsAllOthers);
        }
    
    },[])

    const handleTypePressed = (item, index) => {
        if (props.category === "Evènements festifs"){
            setEventTypesAll([
                ...data.eventTypesAllFestifs.slice(0, index),
                { name: item.name, selected: !item.selected },
                ...data.eventTypesAllFestifs.slice(index + 1)
            ]);
        } else {
            setEventTypesAll([
                ...data.eventTypesAllOthers.slice(0, index),
                { name: item.name, selected: !item.selected },
                ...data.eventTypesAllOthers.slice(index + 1)
            ]);
        }
    }

    const handleMoodPressed = (item, index) => {
        item.selected = !item.selected;
        setMoodsAll([
            ...moodsAll.slice(0, index),
            item,
            ...moodsAll.slice(index + 1)
        ]);
    }

    const handleCharacPressed = (item, index) => {
        item.selected = !item.selected;
        setCharacsAll([
            ...characsAll.slice(0, index),
            item,
            ...characsAll.slice(index + 1)
        ]);
    }

    const dotWhite = require('../../../assets/CreateEvent/DotWhite.png');
    const dotTransp = require('../../../assets/CreateEvent/DotTransp.png');
    const dotOrange = require('../../../assets/CreateEvent/DotOrange.png')

    const handlePlusTypesPressed = () => {
        setOnPlusTypes(true)
    }

    const handlePlusMoodsPressed = () => {
        setOnPlusMoods(true)
    }

    const handlePlusCharacsPressed = () => {
        setOnPlusCharacs(true)
    }

    const handleSubmit = () => {
        var eventTypeSelected = "";
        var moodsSelected = [];
        var characsSelected = [];
        var current_errors = {};

        for (var i=0;i<eventTypesAll.length;i++){
            if (eventTypesAll[i].selected){
                eventTypeSelected = eventTypesAll[i].name;
            }
        }
        for (var i=0;i<moodsAll.length;i++){
            if (moodsAll[i].selected){
                moodsSelected.push(moodsAll[i].name);
            }
        }
        for (var i=0;i<characsAll.length;i++){
            if (characsAll[i].selected){
                characsSelected.push(characsAll[i].name);
            }
        }

        
        if (eventTypeSelected.length != 0){
            props.setType(eventTypeSelected)
            current_errors.types="";
        } else {
            current_errors.types="Veuillez sélectionner un type d'évènement";
        }
        moodsSelected.length == 0 ? props.setMoods(["Généraliste"]) : props.setMoods(moodsSelected);
        props.setCharacs(characsSelected);
        setErrors(current_errors);
        !current_errors.types ? props.navigation.navigate("MainInfos") : null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.headerContainer}>
                    <View style={styles.header}>
                        <View style={styles.headerImgPart}>
                            <Image style={styles.headerImg} source={require('../../../assets/CreateEvent/Characteristics.png')} />
                        </View>
                        <Text style={styles.headerTxt}>Caractéristiques de l'évènement</Text>
                    </View>
                </View>
                <View style={styles.itemContainer}>
                    <TouchableWithoutFeedback onPress={() => { setOnPlusTypes(false); setOnPlusMoods(false); setOnPlusCharacs(false) }}>
                        <View style={{ ...styles.contentTypes, borderColor: 'rgba(226, 122, 45,' + (onPlusTypes || onPlusMoods || onPlusCharacs ? '.35' : '1') + ')' }}>
                            <View style={styles.eventsTypePart}>
                                <Text style={{ ...styles.titlePart, opacity: onPlusTypes || onPlusMoods || onPlusCharacs ? 0.35 : 1 }}>Type d'évènement</Text>
                                {eventTypesAll.map((item, index) => (
                                    index < 3 ?
                                        <TouchableOpacity disabled={onPlusTypes || onPlusMoods || onPlusCharacs} key={index} style={styles.type} onPress={() => handleTypePressed(item, index)}>
                                            <Image style={styles.imgDot} source={item.selected ? dotOrange : (onPlusTypes || onPlusMoods || onPlusCharacs ? dotTransp : dotWhite)} />
                                            <Text style={{ ...styles.name, opacity: onPlusTypes || onPlusMoods || onPlusCharacs ? 0.35 : 1, color: item.selected ? commonStyles.MEDIUM_ORANGE : commonStyles.WHITE }}>{item.name}</Text>
                                        </TouchableOpacity>
                                        :
                                        null
                                ))}
                                <TouchableOpacity disabled={onPlusTypes || onPlusMoods || onPlusCharacs} style={styles.type} onPress={() => handlePlusTypesPressed()}>
                                    <Text style={{ ...styles.plus, opacity: onPlusMoods || onPlusCharacs ? 0.35 : 1, color: onPlusTypes ? commonStyles.MEDIUM_ORANGE : commonStyles.WHITE }}>+</Text>
                                    <Text style={{ ...styles.name, opacity: onPlusMoods || onPlusCharacs ? 0.35 : 1, color: onPlusTypes ? commonStyles.MEDIUM_ORANGE : commonStyles.WHITE }}>Plus de propositions</Text>
                                </TouchableOpacity>
                                {onPlusTypes ?
                                    <View style={styles.plusTypes}>
                                        {eventTypesAll.map((item, index) => (
                                            index >= 3 ?
                                                <TouchableOpacity key={index} style={styles.typeHidden} onPress={() => handleTypePressed(item, index)}>
                                                    <Image style={styles.imgDot} source={item.selected ? dotOrange : dotWhite} />
                                                    <Text style={{ ...styles.name, color: item.selected ? commonStyles.MEDIUM_ORANGE : commonStyles.WHITE }}>{item.name}</Text>
                                                </TouchableOpacity>
                                                :
                                                null
                                        ))}
                                    </View>
                                    : <></>}
                            </View>
                            {errors["types"] ? 
                            <View style={styles.errors}>
                                <Text style={commonStyles.ERROR_TEXT}>{errors["types"]}</Text>
                            </View>
                            :null}
                            <View style={styles.sepPart}>
                                <Image style={{ ...styles.sep, opacity: onPlusTypes || onPlusMoods || onPlusCharacs ? 0.35 : 1 }} source={require('../../../assets/CreateEvent/PointiSep.png')} />
                            </View>
                            <View style={styles.moodPart}>
                                <Text style={{ ...styles.titlePart, opacity: onPlusTypes || onPlusMoods || onPlusCharacs ? 0.35 : 1 }}>Type d'ambiance</Text>
                                {moodsAll.map((item, index) => (
                                    index < 3 ?
                                        <TouchableOpacity disabled={onPlusTypes || onPlusMoods || onPlusCharacs} key={index} style={styles.type} onPress={() => handleMoodPressed(item, index)}>
                                            <Image style={styles.imgDot} source={item.selected ? dotOrange : (onPlusTypes || onPlusMoods || onPlusCharacs ? dotTransp : dotWhite)} />
                                            <Text style={{ ...styles.name, opacity: onPlusTypes || onPlusMoods || onPlusCharacs ? 0.35 : 1, color: item.selected ? commonStyles.MEDIUM_ORANGE : commonStyles.WHITE }}>{item.name}</Text>
                                        </TouchableOpacity>
                                        :
                                        null
                                ))}
                                <TouchableOpacity disabled={onPlusTypes || onPlusMoods || onPlusCharacs} style={styles.type} onPress={() => handlePlusMoodsPressed()}>
                                    <Text style={{ ...styles.plus, opacity: onPlusTypes || onPlusCharacs ? 0.35 : 1, color: onPlusMoods ? commonStyles.MEDIUM_ORANGE : commonStyles.WHITE }}>+</Text>
                                    <Text style={{ ...styles.name, opacity: onPlusTypes || onPlusCharacs ? 0.35 : 1, color: onPlusMoods ? commonStyles.MEDIUM_ORANGE : commonStyles.WHITE }}>Plus de propositions</Text>
                                </TouchableOpacity>
                                {onPlusMoods ?
                                    <View style={styles.plusMoods}>
                                        {moodsAll.map((item, index) => (
                                            index >= 3 ?
                                                <TouchableOpacity key={index} style={styles.typeHidden} onPress={() => handleMoodPressed(item, index)}>
                                                    <Image style={styles.imgDot} source={item.selected ? dotOrange : dotWhite} />
                                                    <Text style={{ ...styles.name, color: item.selected ? commonStyles.MEDIUM_ORANGE : commonStyles.WHITE }}>{item.name}</Text>
                                                </TouchableOpacity>
                                                :
                                                null
                                        ))}
                                    </View>
                                    : <></>}
                            </View>
                            <View style={styles.sepPart}>
                                <Image style={{ ...styles.sep, opacity: onPlusTypes || onPlusMoods || onPlusCharacs ? 0.35 : 1 }} source={require('../../../assets/CreateEvent/PointiSep.png')} />
                            </View>
                            <TouchableOpacity disabled={onPlusTypes || onPlusMoods || onPlusCharacs} style={styles.plusCharacPart} onPress={() => handlePlusCharacsPressed()}>
                                <Text style={styles.plusTitlePart}>+</Text>
                                <Text style={styles.titlePart}>Plus de caractéristiques</Text>
                            </TouchableOpacity>
                            {onPlusCharacs ?
                                <View style={styles.plusCharacs}>
                                    {characsAll.map((item, index) => (
                                        <TouchableOpacity key={index} style={styles.typeHidden} onPress={() => handleCharacPressed(item, index)}>
                                            <Image style={styles.imgDot} source={item.selected ? dotOrange : dotWhite} />
                                            <Text style={{ ...styles.name, color: item.selected ? commonStyles.MEDIUM_ORANGE : commonStyles.WHITE }}>{item.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                : <></>}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
            <ReturnOrNext {...props} next={handleSubmit} return={"Category"} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: commonStyles.BLACK,
        height: '100%',
        width: "100%",
        position: "relative"
    },
    errors:{
        padding: commonStyles.WIDTH > 370 ? 8 : 5,
    },
    transpBlack: {
        position: "absolute",
        backgroundColor: commonStyles.BLACK,
        opacity: 0.4,
        width: "100%",
        height: "100%",
        zIndex: 1
    },
    plusTypes: {
        position: "absolute",
        top: commonStyles.WIDTH > 370 ? 115 : 90,
        left: commonStyles.WIDTH > 370 ? 150 : 120,
        padding: commonStyles.WIDTH > 370 ? 8 : 5,
        backgroundColor: commonStyles.BLACK,
        borderColor: commonStyles.MEDIUM_ORANGE,
        borderWidth: 2,
        borderRadius: 4,
        opacity: 1,
        zIndex: 2,
    },
    plusMoods: {
        position: "absolute",
        bottom: commonStyles.WIDTH > 370 ? 10 : 6,
        left: commonStyles.WIDTH > 370 ? 150 : 120,
        padding: commonStyles.WIDTH > 370 ? 8 : 5,
        backgroundColor: commonStyles.BLACK,
        borderColor: commonStyles.MEDIUM_ORANGE,
        borderWidth: 2,
        borderRadius: 4,
        opacity: 1,
        zIndex: 2,
    },
    plusCharacs: {
        position: "absolute",
        bottom: commonStyles.WIDTH > 370 ? 55 : 45,
        left: commonStyles.WIDTH > 370 ? 180 : 150,
        padding: commonStyles.WIDTH > 370 ? 8 : 5,
        backgroundColor: commonStyles.BLACK,
        borderColor: commonStyles.MEDIUM_ORANGE,
        borderWidth: 2,
        borderRadius: 4,
        opacity: 1,
        zIndex: 2,
    },
    scroll: {
        marginTop: "10%",
        width: "100%",
    },
    headerContainer: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        borderColor: commonStyles.MEDIUM_ORANGE,
        borderWidth: 2,
        borderRadius: 2,
        width: "85%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerImgPart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerImg: {
        width: commonStyles.WIDTH > 370 ? 22 : 20,
        height: commonStyles.WIDTH > 370 ? 22 : 20
    },
    headerTxt: {
        flex: 4,
        fontFamily: commonStyles.MAIN_FONT,
        fontSize: commonStyles.WIDTH > 370 ? 21 : 17,
        color: commonStyles.WHITE,
        padding: "3%",
        borderColor:commonStyles.MEDIUM_ORANGE,
        borderLeftWidth:2,
        paddingLeft:"7%",
    },
    itemContainer: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentTypes: {
        // borderColor:commonStyles.MEDIUM_ORANGE,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderRadius: 2,
        padding: '3%',
        width: '85%',
        justifyContent: 'center',
    },
    eventsTypePart: {
        flex: 2,
        paddingHorizontal: "5%",
        paddingTop: "5%",
    },
    titlePart: {
        fontFamily: commonStyles.MAIN_FONT,
        fontSize: commonStyles.WIDTH > 370 ? 20 : 16,
        color: commonStyles.WHITE,
        marginBottom: "4%"
    },
    type: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: commonStyles.WIDTH > 370 ? 3 : 2,
        width: "50%"
    },
    typeHidden: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: commonStyles.WIDTH > 370 ? 3 : 2,
        paddingHorizontal: "2%"
    },
    imgDot: {
        width: commonStyles.WIDTH > 370 ? 8 : 6,
        height: commonStyles.WIDTH > 370 ? 8 : 6,
    },
    name: {
        fontFamily: commonStyles.MAIN_FONT,
        fontSize: commonStyles.WIDTH > 370 ? 15 : 12,
        paddingLeft: commonStyles.WIDTH > 370 ? 8 : 6,
    },
    plus: {
        fontFamily: commonStyles.MAIN_FONT,
        fontSize: commonStyles.WIDTH > 370 ? 25 : 20,

    },
    sepPart: {
        height: commonStyles.WIDTH > 370 ? 30 : 25,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: "5%"
    },
    sep: {
        width: commonStyles.WIDTH > 370 ? 125 : 100
    },
    moodPart: {
        flex: 2,
        paddingHorizontal: "5%",
    },
    plusCharacPart: {
        flex: 1,
        paddingHorizontal: "5%",
        flexDirection: 'row',
        alignItems: 'center',
    },
    plusTitlePart: {
        fontFamily: commonStyles.MAIN_FONT,
        fontSize: commonStyles.WIDTH > 370 ? 25 : 20,
        color: commonStyles.WHITE,
        marginBottom: "4%",
        paddingRight: "3%"
    }
});

export default CreateEventCharacteristics;
