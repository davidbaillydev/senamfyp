import React, { useState, useEffect } from "react";
import { ImageBackground, PermissionsAndroid, TouchableWithoutFeedback, ScrollView, StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, Button, FlatList, TextInput } from "react-native";
import * as commonStyles from "../../../utils/commonStyles";
import ReturnOrNext from "./ReturnOrNext";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { APP_URL_EMU } from "../../../utils/config";
import PriceDetail from "./PriceDetail";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as functions from "../../../utils/functions";


function CreateEventQRCodes(props) {

    const [onPersonalize, setOnPersonalize] = useState(false);
    const [infos, setInfos] = useState([]);
    const [infosAddable, setInfosAddable] = useState([])
    const [currentTicket, setCurrentTicket] = useState(0);

    const [categoriesValidDateFrom, setCategoriesValidDateFrom] = useState([]);
    const [categoriesValidDateTo, setCategoriesValidDateTo] = useState([]);
    const [categoriesValidHourFrom, setCategoriesValidHourFrom] = useState([]);
    const [categoriesValidHourTo, setCategoriesValidHourTo] = useState([]);

    const [onHourFrom, setOnHourFrom] = useState(false);
    const [onHourTo, setOnHourTo] = useState(false);
    const [onDateFrom, setOnDateFrom] = useState(false);
    const [onDateTo, setOnDateTo] = useState(false);

    const [datesFrom, setDatesFrom] = useState([]);
    const [datesTo, setDatesTo] = useState([]);
    const [hoursFrom, setHoursFrom] = useState([]);
    const [hoursTo, setHoursTo] = useState([]);

    const infosFull = [
        "Titre du ticket",
        "Numéro du ticket",
        "Symbole de validité",
        "Catégo. de couleur",
        "Date d'achat",
        "Critère de validité",
        "Type d'évènement",
        "Prix du ticket",
        "Quantité achetée",
        "A remplir"
    ];

    useEffect(() => {
        initInfos();
        initCategoriesValid();
    }, [])

    const initInfos = () => {
        var array = [];
        var arrayAddable = [];
        for (let i = 0; i < props.numberOfCategory.length; i++) {
            array.push(["Titre du ticket", "Numéro du ticket", "Symbole de validité"])
        }
        for (let i = 0; i < props.numberOfCategory.length; i++) {
            arrayAddable.push(["Catégo. de couleur",
                "Date d'achat",
                "Critère de validité",
                "Type d'évènement",
                "Prix du ticket",
                "Quantité achetée",
                "A remplir"])
        }
        setInfos(array);
        setInfosAddable(arrayAddable);
    }

    const initCategoriesValid = () => {
        var hoursFrom = [];
        var hoursTo = [];
        var datesFrom = [];
        var datesTo = [];
        var infos = [];
        for (let i = 0; i < props.numberOfCategory.length; i++) {
            hoursFrom.push("");
            hoursTo.push("");
            datesFrom.push("");
            datesTo.push("");
        }
        setCategoriesValidHourFrom(hoursFrom);
        setCategoriesValidHourTo(hoursTo);
        setCategoriesValidDateFrom(datesFrom);
        setCategoriesValidDateTo(datesTo);
    }

    const pushDatesFrom = (event, date, n) => {

        if (event.type !== "dismissed") {

            setDatesFrom([
                ...datesFrom.slice(0, index),
                date,
                ...datesFrom.slice(index + 1)
            ]);
        }
    }

    const pushDatesTo = (event, date, n) => {
        if (event.type !== "dismissed") {
            var index = n;
            
            setDatesTo([
                ...datesTo.slice(0, index),
                date,
                ...datesTo.slice(index + 1)
            ]);
        }
    }

    const pushHoursFrom = (event, date, n) => {
        if (event.type !== "dismissed") {
            var index = n;

            setHoursFrom([
                ...hoursFrom.slice(0, index),
                date,
                ...hoursFrom.slice(index + 1)
            ]);
        }
    }
    const pushHoursTo = (event, date, n) => {
        if (event.type !== "dismissed") {
            var index = n;

            setHoursTo([
                ...hoursTo.slice(0, index),
                date,
                ...hoursTo.slice(index + 1)
            ]);
        }
    }

    const pushCategoryValidDateFrom = (event, date, n) => {

        if (event.type !== "dismissed") {

            var index = n;
            const strDate = date.toISOString();
            const dateData = strDate.split('T');
            const dateFormatted = dateData[0] + " " + (dateData[1].split('Z')[0]);
            setCategoriesValidDateFrom([
                ...categoriesValidDateFrom.slice(0, index),
                dateFormatted,
                ...categoriesValidDateFrom.slice(index + 1)
            ]);
        }
    }

    const pushCategoryValidDateTo = (event, date, n) => {
        if (event.type !== "dismissed") {
            var index = n;
            const strDate = date.toISOString();
            const dateData = strDate.split('T');
            const dateFormatted = dateData[0] + " " + (dateData[1].split('Z')[0]);
            setCategoriesValidDateTo([
                ...categoriesValidDateTo.slice(0, index),
                dateFormatted,
                ...categoriesValidDateTo.slice(index + 1)
            ]);
        }
    }

    const pushCategoryValidHourFrom = (event, date, n) => {
        if (event.type !== "dismissed") {
            var index = n;
            const strDate = date.toISOString();
            const dateData = strDate.split('T');
            const dateFormatted = dateData[0] + " " + (dateData[1].split('Z')[0]);
            setCategoriesValidHourFrom([
                ...categoriesValidHourFrom.slice(0, index),
                dateFormatted,
                ...categoriesValidHourFrom.slice(index + 1)
            ]);
        }
    }
    const pushCategoryValidHourTo = (event, date, n) => {
        if (event.type !== "dismissed") {
            var index = n;
            const strDate = date.toISOString();
            const dateData = strDate.split('T');
            const dateFormatted = dateData[0] + " " + (dateData[1].split('Z')[0]);
            setCategoriesValidHourTo([
                ...categoriesValidHourTo.slice(0, index),
                dateFormatted,
                ...categoriesValidHourTo.slice(index + 1)
            ]);
        }
    }

    const handleSubmit = () => {
        var hoursFrom = categoriesValidHourFrom;
        var hoursTo = categoriesValidHourTo;
        var datesFrom = categoriesValidDateFrom;
        var datesTo = categoriesValidDateTo;
        for (let i = 0; i < props.numberOfCategory.length; i++) {
            if (categoriesValidHourTo[i] == "") {
                hoursTo[i] = props.hourTo;
            }
            if (categoriesValidHourFrom[i] == "") {
                hoursFrom[i] = props.hourFrom;
            }
            if (categoriesValidDateTo[i] == "") {
                datesTo[i] = props.date;
            }
            if (categoriesValidDateFrom[i] == "") {
                datesFrom[i] = props.date;
            }
        }
        props.setCategoriesValidDateFrom(datesFrom);
        props.setCategoriesValidDateTo(datesTo);
        props.setCategoriesValidHourFrom(hoursFrom);
        props.setCategoriesValidHourTo(hoursTo);
        props.navigation.navigate("Recap")
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.headerContainer}>
                    <View style={styles.header}>
                        <View style={styles.headerImgPart}>
                            <Image style={styles.headerImg} source={require('../../../assets/CreateEvent/QRCode.png')} />
                        </View>
                        <Text style={styles.headerTxt}>Personnalisation des QR Codes</Text>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    {props.numberOfCategory.map((n) => (
                        <View key={n} style={styles.ticket}>
                            <ImageBackground source={require('../../../assets/MyTickets/ticket.png')} style={styles.imgBg}>
                                <View style={styles.precisions}>
                                    <View style={styles.date}>
                                        <Text style={styles.dateTxt}>Date : {functions.formatDate((new Date(props.date.split(" ")[0])).toLocaleDateString())}</Text>
                                    </View>
                                    <View style={styles.hour}>
                                        <Text style={styles.hourTxt}>Prix : {props.categoriesPrice[n - 1]} €</Text>
                                    </View>
                                    <View style={styles.place}>
                                        <Text style={styles.placeTxt}>Places : {props.categoriesNumber[n - 1]}</Text>
                                    </View>
                                </View>
                                <View style={styles.mainInfos}>
                                    <View style={styles.title}>
                                        <Text style={styles.titleTxt}>{props.categoriesName[n - 1]}</Text>
                                    </View>
                                    <View style={styles.QRAndPlus}>
                                        <TouchableOpacity style={styles.QR}>
                                            <Image source={require('../../../assets/MyTickets/QRCode.png')} style={styles.imgQR} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.Plus} onPress={() => { setOnPersonalize(true); setCurrentTicket(n - 1) }}>
                                            <Text style={styles.PlusTxt}>Personnaliser</Text>
                                            <Image source={require('../../../assets/MyTickets/arrowNext.png')} style={styles.imgArrowPlus} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    ))}
                    {/* {onPersonalize ? 
                <TouchableWithoutFeedback onPress={()=>{setOnPersonalize(false)}}>
                    <View style={styles.transp}>
                    </View>
                </TouchableWithoutFeedback> 
                : null} */}
                </View>

            </ScrollView>
            {onPersonalize ?
                <View style={styles.personalizeContainer}>
                    <View style={styles.validPart}>
                        <TouchableOpacity style={styles.closePersonalize} onPress={() => setOnPersonalize(false)}>
                            <Image style={styles.validIcon} source={require('../../../assets/CreateEvent/Cross.png')} />
                        </TouchableOpacity>
                        <View style={styles.validTitle}>
                            <Text style={styles.validTxt}>Valide à partir de :</Text>
                        </View>
                        <View style={styles.dateAndHourFrom}>
                            <TouchableOpacity style={styles.dateFrom} onPress={() => setOnDateFrom(true)}>
                                <Image style={styles.validIcon} source={require('../../../assets/CreateEvent/Date.png')} />
                                {datesFrom[currentTicket] ? <Text style={styles.validTxt}>{functions.formatDate(datesFrom[currentTicket].toLocaleDateString())}</Text> : <Text style={styles.validTxt}>XX/XX/XX</Text>}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hourFrom} onPress={() => setOnHourFrom(true)}>
                                <Image style={styles.validIcon} source={require('../../../assets/CreateEvent/Hour.png')} />
                                {hoursFrom[currentTicket] ? <Text style={styles.validTxt}>{functions.formatTime(hoursFrom[currentTicket].toLocaleTimeString())}</Text> : <Text style={styles.validTxt}>XX:XX</Text>}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.validTitle}>
                            <Text style={styles.validTxt}>Jusqu'au :</Text>
                        </View>
                        <View style={styles.dateAndHourFrom}>
                            <TouchableOpacity style={styles.dateFrom} onPress={() => setOnDateTo(true)}>
                                <Image style={styles.validIcon} source={require('../../../assets/CreateEvent/Date.png')} />
                                {datesTo[currentTicket] ? <Text style={styles.validTxt}>{functions.formatDate(datesTo[currentTicket].toLocaleDateString())}</Text> : <Text style={styles.validTxt}>XX/XX/XX</Text>}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hourFrom} onPress={() => setOnHourTo(true)}>
                                <Image style={styles.validIcon} source={require('../../../assets/CreateEvent/Hour.png')} />
                                {hoursTo[currentTicket] ? <Text style={styles.validTxt}>{functions.formatTime(hoursTo[currentTicket].toLocaleTimeString())}</Text> : <Text style={styles.validTxt}>XX:XX</Text>}
                            </TouchableOpacity>
                        </View>
                        {onHourFrom ?
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={new Date()}
                                mode={'time'}
                                is24Hour={true}
                                display="default"
                                onChange={(event, date) => { setOnHourFrom(false); pushHoursFrom(event, date, currentTicket); pushCategoryValidHourFrom(event, date, currentTicket); }}
                            />
                            : null}
                        {onDateFrom ?
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={new Date()}
                                mode={'date'}
                                is24Hour={true}
                                display="default"
                                onChange={(event, date) => { setOnDateFrom(false); pushDatesFrom(event, date, currentTicket); pushCategoryValidDateFrom(event, date, currentTicket) }}
                            />
                            : null}
                        {onHourTo ?
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={new Date()}
                                mode={'time'}
                                is24Hour={true}
                                display="default"
                                onChange={(event, date) => { setOnHourTo(false); pushHoursTo(event, date, currentTicket); pushCategoryValidHourTo(event, date, currentTicket); }}
                            />
                            : null}
                        {onDateTo ?
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={new Date()}
                                mode={'date'}
                                is24Hour={true}
                                display="default"
                                onChange={(event, date) => { setOnDateTo(false); pushDatesTo(event, date, currentTicket); pushCategoryValidDateTo(event, date, currentTicket) }}
                            />
                            : null}
                    </View>
                    {/* <View style={styles.infosScanPart}>
                        <View style={styles.validTitle}>
                            <Text style={styles.validTxt}>Informations affichées par le scan du QR Code :</Text>
                        </View>
                        <View style={styles.infosGrid}>
                            <View style={styles.firstLine}>
                            {infosFull.slice(0,3).map((value,index)=>(
                                <View key={index} style={styles.infosItem}>
                                    <Text style={styles.infosItemTxt}>{value}</Text>
                                </View>
                            ))}
                            </View>
                            {infos[currentTicket][3] ?
                            <View style={styles.firstLine}>
                            {infosFull.slice(3,6).map((value,index)=>{
                                return(
                                    infos[currentTicket][index+3] != undefined ?
                                <View key={index} style={styles.infosItem}>
                                    <Text style={styles.infosItemTxt}>{infos[currentTicket][index+3]}</Text>
                                </View>
                                    : null
                                )
                            })}
                            </View> : null}
                            {infos[currentTicket][6] ?
                            <View style={styles.firstLine}>
                            {infosFull.slice(6,9).map((value,index)=>{
                                 return(
                                    infos[currentTicket][index+6] != undefined ?
                                <View key={index} style={styles.infosItem}>
                                    <Text style={styles.infosItemTxt}>{infos[currentTicket][index+6]}</Text>
                                </View>
                                    : null
                                )
                            })}
                            </View> : null}
                            {infos[currentTicket][9] ? 
                            <View style={styles.firstLine}>
                                <View style={styles.infosItem}>
                                    <Text style={styles.infosItemTxt}>{infos[currentTicket][currentTicket][9]}</Text>
                                </View>
                            </View>
                            : null}
                        </View>
                    </View>
                    <View style={styles.addInfosPart}>
                        <View style={styles.validTitle}>
                            <Text style={styles.validTxt}>Ajouter des informations :</Text>
                        </View>
                        <View style={styles.infosGrid}>
                            {infosAddable[currentTicket][0] ?
                            <View style={styles.firstLine}>
                                {infosFull.slice(3,6).map((value,index)=>{
                                    return(
                                        infosAddable[currentTicket][index] != undefined ?
                                    <View key={index} style={styles.infosItem}>
                                        <Text style={styles.infosItemTxt}>{infosAddable[currentTicket][index]}</Text>
                                    </View>
                                        : null
                                    )
                                })}
                                </View> : null}
                                {infosAddable[currentTicket][3] ? 
                                <View style={styles.firstLine}>
                                {infosFull.slice(6,9).map((value,index)=>{
                                    return(
                                        infosAddable[currentTicket][index+3] != undefined ?
                                    <View key={index} style={styles.infosItem}>
                                        <Text style={styles.infosItemTxt}>{infosAddable[currentTicket][index+3]}</Text>
                                    </View>
                                        : null
                                    )
                                })}
                                </View> : null}
                                {infosAddable[currentTicket][6] ?
                                <View style={styles.firstLine}>
                                    <View  style={styles.infosItem}>
                                        <Text style={styles.infosItemTxt}>{infosAddable[currentTicket][6]}</Text>
                                    </View>
                                </View>:null}
                            </View>
                    </View> */}

                </View>
                : null}
            {onPersonalize ?
                <TouchableWithoutFeedback onPress={() => setOnPersonalize(false)}>
                    <View style={styles.transp}></View>
                </TouchableWithoutFeedback>
                : null}
            <ReturnOrNext {...props} return="Prices" next={handleSubmit} />
        </SafeAreaView>
    )

}


export default CreateEventQRCodes

const styles = StyleSheet.create({
    container: {
        backgroundColor: commonStyles.BLACK,
        height: '100%',
        width: "100%",
    },

    scroll: {
        marginTop: "10%",
        width: "100%",
    },
    transp: {
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: commonStyles.BLACK,
        opacity: 0.35,
        zIndex: 1
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
        borderColor: commonStyles.MEDIUM_ORANGE,
        borderLeftWidth: 2,
        paddingLeft: "7%",
    },
    contentContainer: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    ticket: {
        marginVertical: "5%",
        // alignItems: 'center',
        // position:'relative'
    },
    ticketPart: {
        width: "100%",
        height: commonStyles.HEIGHT > 600 ? 130 : 110,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgBg: {
        display: 'flex',
        flexDirection: 'row',
        height: commonStyles.HEIGHT > 600 ? 130 : 110,
        width: commonStyles.WIDTH > 370 ? 320 : 270,
    },
    precisions: {
        flex: 1.2,
        display: 'flex',
    },
    date: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: "15%"
    },
    dateTxt: {
        fontFamily: commonStyles.MAIN_FONT,
        color: commonStyles.MEDIUM_ORANGE,
        fontSize: commonStyles.WIDTH > 370 ? 15 : 13,
    },
    hour: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: "30%"
    },
    hourTxt: {
        fontFamily: commonStyles.MAIN_FONT,
        color: commonStyles.MEDIUM_ORANGE,
        fontSize: commonStyles.WIDTH > 370 ? 15 : 13,
    },
    place: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: "15%"
    },
    placeTxt: {
        fontFamily: commonStyles.MAIN_FONT,
        color: commonStyles.MEDIUM_ORANGE,
        fontSize: commonStyles.WIDTH > 370 ? 15 : 13,
    },
    mainInfos: {
        flex: 2,
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleTxt: {
        fontFamily: commonStyles.MAIN_FONT,
        color: commonStyles.MEDIUM_ORANGE,
        fontSize: commonStyles.WIDTH > 370 ? 20 : 17,
    },
    QRAndPlus: {
        flex: 3,
        flexDirection: 'row'
    },
    QR: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    imgQR: {
        width: commonStyles.WIDTH > 370 ? 80 : 70,
        height: commonStyles.WIDTH > 370 ? 80 : 70,
    },
    Plus: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'row',
        paddingBottom: "8%",
        paddingRight: "5%"
    },
    PlusTxt: {
        fontFamily: commonStyles.MAIN_FONT,
        color: commonStyles.MEDIUM_ORANGE,
        fontSize: commonStyles.WIDTH > 370 ? 15 : 13,
        marginRight: "5%",
        paddingBottom: "2%"
    },
    imgArrowPlus: {
        height: commonStyles.WIDTH > 370 ? 20 : 18,
        width: commonStyles.WIDTH > 370 ? 20 : 18,
    },
    personalizeContainer: {
        zIndex: 2,
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        top: commonStyles.WIDTH > 370 ? 15 : 3
    },
    validPart: {
        flex: 1,
        borderColor: commonStyles.MEDIUM_ORANGE,
        borderWidth: 2,
        borderRadius: 2,
        width: "88%",
        paddingHorizontal: "5%",
        paddingVertical: "2%",
        backgroundColor: commonStyles.BLACK
    },
    validTitle: {
        paddingVertical: "2%",
    },
    validTxt: {
        fontFamily: commonStyles.MAIN_FONT,
        color: commonStyles.WHITE,
        fontSize: commonStyles.WIDTH > 370 ? 16 : 13,
    },
    dateAndHourFrom: {
        flexDirection: 'row',
        paddingVertical: "2%",
    },
    dateFrom: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    hourFrom: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    validIcon: {
        width: commonStyles.WIDTH > 370 ? 22 : 20,
        height: commonStyles.WIDTH > 370 ? 22 : 20,
        marginRight: "7%"
    },
    infosScanPart: {
        flex: 1,
        borderColor: commonStyles.MEDIUM_ORANGE,
        borderWidth: 2,
        borderRadius: 2,
        width: "88%",
        paddingHorizontal: "5%",
        paddingVertical: "2%",
        backgroundColor: commonStyles.BLACK
    },
    firstLine: {
        flexDirection: 'row',
        paddingVertical: "1.5%",
    },
    infosItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },
    infosItemTxt: {
        fontFamily: commonStyles.MAIN_FONT,
        color: commonStyles.WHITE,
        fontSize: commonStyles.WIDTH > 370 ? 13 : 10.5,
        borderColor: commonStyles.MEDIUM_ORANGE,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        padding: commonStyles.WIDTH > 370 ? 6 : 4
    },
    addInfosPart: {
        flex: 1,
        borderColor: commonStyles.MEDIUM_ORANGE,
        borderWidth: 2,
        borderRadius: 2,
        width: "88%",
        paddingHorizontal: "5%",
        paddingVertical: "2%",
        backgroundColor: commonStyles.BLACK
    },
    closePersonalize: {
        zIndex: 3,
        position: 'absolute',
        right: 0,
        top: commonStyles.WIDTH > 370 ? 12 : 10
    }
});