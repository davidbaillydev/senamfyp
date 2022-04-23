import React, { useState, useEffect } from "react";
import { PermissionsAndroid, TouchableWithoutFeedback, ScrollView, StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, Button, FlatList, TextInput } from "react-native";
import * as commonStyles from "../../../utils/commonStyles";
import * as functions from "../../../utils/functions";
import ReturnOrNext from "./ReturnOrNext";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { APP_URL_EMU } from "../../../utils/config";
import PriceDetail from "./PriceDetail";


function CreateEventPrices(props) {

    const [onUniqPrice, setOnUniqPrice] = useState(false);
    const [onDiffPrice, setOnDiffPrice] = useState(false);
    const [priceCounter, setPriceCounter] = useState([1]);

    const [categoriesNumber, setCategoriesNumber] = useState([""]);
    const [categoriesPrice, setCategoriesPrice] = useState([""]);
    const [categoriesName, setCategoriesName] = useState([""]);
    const [categoriesDescription, setCategoriesDescription] = useState([""]);
    const [categoriesTimerDateFrom, setCategoriesTimerDateFrom] = useState([""]);
    const [categoriesTimerDateTo, setCategoriesTimerDateTo] = useState([""]);
    const [categoriesTimerHourFrom, setCategoriesTimerHourFrom] = useState([""]);
    const [categoriesTimerHourTo, setCategoriesTimerHourTo] = useState([""]);
    const [categoriesInfo, setCategoriesInfo] = useState([""]);

    const dotWhite = require('../../../assets/CreateEvent/DotWhite.png');
    const dotOrange = require('../../../assets/CreateEvent/DotOrange.png');

    const [errors, setErrors] = useState({});

    const addPrice = () => {
        console.log(categoriesNumber);
        setPriceCounter(previousState => [...previousState, previousState[parseInt([previousState.length - 1])] + 1]);
        setCategoriesNumber([...categoriesNumber, ""]);
        setCategoriesPrice([...categoriesPrice, ""]);
        setCategoriesName([...categoriesName, ""]);
        setCategoriesDescription([...categoriesDescription, ""]);
        setCategoriesTimerDateFrom([...categoriesTimerDateFrom, ""]);
        setCategoriesTimerDateTo([...categoriesTimerDateTo, ""]);
        setCategoriesTimerHourFrom([...categoriesTimerHourFrom, ""]);
        setCategoriesTimerHourTo([...categoriesTimerHourTo, ""]);
        setCategoriesInfo([...categoriesInfo, ""]);
    }

    const deletePrice = (n) => {
        var index = n - 1;
        var newArray = [];
        for (var i = n; i < priceCounter.length; i++) {
            newArray.push(i);
        }
        setPriceCounter([
            ...priceCounter.slice(0, index),
            ...newArray
        ]);
        deleteCategoryNumber(n);
        deleteCategoryPrice(n);
        deleteCategoryName(n);
        deleteCategoryDescription(n);
        deleteCategoryTimerDateFrom(n);
        deleteCategoryTimerDateTo(n);
        deleteCategoryTimerHourFrom(n);
        deleteCategoryTimerHourTo(n);
        deleteCategoryInfo(n);
    }

    const pushCategoryNumber = (value, n) => {
        var index = n - 1;

        setCategoriesNumber([
            ...categoriesNumber.slice(0, index),
            value,
            ...categoriesNumber.slice(index + 1)
        ]);
    }

    const deleteCategoryNumber = (n) => {
        var index = n - 1;
        if (categoriesNumber[index]) {
            setCategoriesNumber([
                ...categoriesNumber.slice(0, index),
                ...categoriesNumber.slice(index + 1)
            ]);
        }
    }

    const pushCategoryPrice = (value, n) => {
        var index = n - 1;

        setCategoriesPrice([
            ...categoriesPrice.slice(0, index),
            value,
            ...categoriesPrice.slice(index + 1)
        ]);
    }

    const deleteCategoryPrice = (n) => {
        var index = n - 1;
        if (categoriesPrice[index]) {
            setCategoriesPrice([
                ...categoriesPrice.slice(0, index),
                ...categoriesPrice.slice(index + 1)
            ]);
        }
    }

    const pushCategoryName = (value, n) => {
        var index = n - 1;
        setCategoriesName([
            ...categoriesName.slice(0, index),
            value,
            ...categoriesName.slice(index + 1)
        ]);

    }

    const deleteCategoryName = (n) => {
        var index = n - 1;
        if (categoriesName[index]) {
            setCategoriesName([
                ...categoriesName.slice(0, index),
                ...categoriesName.slice(index + 1)
            ]);
        }
    }

    const pushCategoryDescription = (value, n) => {
        var index = n - 1;

        setCategoriesDescription([
            ...categoriesDescription.slice(0, index),
            value,
            ...categoriesDescription.slice(index + 1)
        ]);
    }

    const deleteCategoryDescription = (n) => {
        var index = n - 1;
        if (categoriesDescription[index]) {
            setCategoriesDescription([
                ...categoriesDescription.slice(0, index),
                ...categoriesDescription.slice(index + 1)
            ]);
        }
    }

    const pushCategoryTimerDateFrom = (event, date, n) => {

        if (event.type !== "dismissed") {
            var index = n - 1;

            setCategoriesTimerDateFrom([
                ...categoriesTimerDateFrom.slice(0, index),
                functions.formatDateForDB(date),
                ...categoriesTimerDateFrom.slice(index + 1)
            ]);
        }
    }

    const deleteCategoryTimerDateFrom = (n) => {

        var index = n - 1;
        if (categoriesTimerDateFrom[index]) {
            setCategoriesTimerDateFrom([
                ...categoriesTimerDateFrom.slice(0, index),
                ...categoriesTimerDateFrom.slice(index + 1)
            ]);
        }
    }

    const pushCategoryTimerDateTo = (event, date, n) => {
        if (event.type !== "dismissed") {
            var index = n - 1;
            setCategoriesTimerDateTo([
                ...categoriesTimerDateTo.slice(0, index),
                functions.formatDateForDB(date),
                ...categoriesTimerDateTo.slice(index + 1)
            ]);
        }
    }

    const deleteCategoryTimerDateTo = (n) => {
        var index = n - 1;
        if (categoriesTimerDateTo[index]) {
            setCategoriesTimerDateTo([
                ...categoriesTimerDateTo.slice(0, index),
                ...categoriesTimerDateTo.slice(index + 1)
            ]);
        }
    }

    const pushCategoryTimerHourFrom = (event, date, n) => {
        if (event.type !== "dismissed") {
            var index = n - 1;
            setCategoriesTimerHourFrom([
                ...categoriesTimerHourFrom.slice(0, index),
                functions.formatTimeForDB(date),
                ...categoriesTimerHourFrom.slice(index + 1)
            ]);
        }
    }

    const deleteCategoryTimerHourFrom = (n) => {
        var index = n - 1;
        if (categoriesTimerHourFrom[index]) {
            setCategoriesTimerHourFrom([
                ...categoriesTimerHourFrom.slice(0, index),
                ...categoriesTimerHourFrom.slice(index + 1)
            ]);
        }
    }

    const pushCategoryTimerHourTo = (event, date, n) => {
        if (event.type !== "dismissed") {
            var index = n - 1;
            setCategoriesTimerHourTo([
                ...categoriesTimerHourTo.slice(0, index),
                functions.formatTimeForDB(date),
                ...categoriesTimerHourTo.slice(index + 1)
            ]);
        }
    }

    const deleteCategoryTimerHourTo = (n) => {
        var index = n - 1;
        if (categoriesTimerHourTo[index]) {
            setCategoriesTimerHourTo([
                ...categoriesTimerHourTo.slice(0, index),
                ...categoriesTimerHourTo.slice(index + 1)
            ]);
        }
    }

    const pushCategoryInfo = (value, n) => {
        var index = n - 1;

        setCategoriesInfo([
            ...categoriesInfo.slice(0, index),
            value,
            ...categoriesInfo.slice(index + 1)
        ]);
    }

    const deleteCategoryInfo = (n) => {
        var index = n - 1;
        if (categoriesInfo[index]) {
            setCategoriesInfo([
                ...categoriesInfo.slice(0, index),
                ...categoriesInfo.slice(index + 1)
            ]);
        }
    }

    const handleSubmit = () => {
        var current_errors = {};

        props.setNumberOfCategory(priceCounter);

        for (let i = 0; i < priceCounter.length; i++) {
            if (categoriesNumber[i].length == 0) {
                current_errors.categoriesNumber = "Vous devez spécifier le nombre de personne pour chaque tarif"
            } else {
                current_errors.categoriesNumber = "";
            }

            if (categoriesPrice[i].length == 0) {
                current_errors.categoriesPrice = "Vous devez spécifier le prix pour chaque tarif"
            } else {
                current_errors.categoriesPrice = "";
                props.setCategoriesPrice(categoriesPrice);
            }

            if (categoriesName[i].length == 0) {
                current_errors.categoriesName = "Vous devez spécifier le titre de chaque tarif"
            } else {
                current_errors.categoriesName = "";
            }

            if (categoriesTimerDateFrom[i].length == 0 || categoriesTimerDateTo[i].length == 0 || categoriesTimerHourFrom[i].length == 0 || categoriesTimerHourTo[i].length == 0) {
                current_errors.categoriesTimer = "Vous devez spécifier entièrement le timer";
            } else {
                current_errors.categoriesTimer = "";
            }
        }

        !current_errors.categoriesNumber ? props.setCategoriesNumber(categoriesNumber) : null;
        !current_errors.categoriesName ? props.setCategoriesName(categoriesName) : null;
        !current_errors.categoriesPrice ? props.setCategoriesPrice(categoriesPrice) : null;
        // Facultatif
        props.setCategoriesDescription(categoriesDescription);
        if (!current_errors.categoriesTimer){
            props.setCategoriesTimerDateFrom(categoriesTimerDateFrom);
            props.setCategoriesTimerDateTo(categoriesTimerDateTo);
            props.setCategoriesTimerHourFrom(categoriesTimerHourFrom);
            props.setCategoriesTimerHourTo(categoriesTimerHourTo);
        }

        setErrors(current_errors);
        props.setCategoriesInfo(categoriesInfo);
        !current_errors.categoriesNumber &&
            !current_errors.categoriesName &&
            !current_errors.categoriesPrice &&
            !current_errors.categoriesTimer ?
            props.navigation.navigate("QRCodes") : null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll} keyboardShouldPersistTaps="handled">
                {errors.categoriesNumber ?
                    <View style={styles.error}>
                        <Text style={commonStyles.ERROR_TEXT}>{errors.categoriesNumber}</Text>
                    </View>
                    : null}
                {errors.categoriesName ?
                    <View style={styles.error}>
                        <Text style={commonStyles.ERROR_TEXT}>{errors.categoriesName}</Text>
                    </View>
                    : null}
                {errors.categoriesPrice ?
                    <View style={styles.error}>
                        <Text style={commonStyles.ERROR_TEXT}>{errors.categoriesPrice}</Text>
                    </View>
                    : null}
                {errors.categoriesTimer ?
                    <View style={styles.error}>
                        <Text style={commonStyles.ERROR_TEXT}>{errors.categoriesTimer}</Text>
                    </View>
                    : null}
                {errors.price ?
                    <View style={styles.error}>
                        <Text style={commonStyles.ERROR_TEXT}>{errors.price}</Text>
                    </View>
                    : null}
                <View style={styles.headerContainer}>
                    <View style={styles.header}>
                        <View style={styles.headerImgPart}>
                            <Image style={styles.headerImg} source={require('../../../assets/CreateEvent/Euro.png')} />
                        </View>
                        <Text style={styles.headerTxt}>Tarif(s) de l'évènement</Text>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.content}>
                        <View style={styles.uniqPart}>
                            <TouchableOpacity style={styles.title} onPress={() => { setOnUniqPrice(!onUniqPrice); setOnDiffPrice(false)}}>
                                <Image style={styles.dotTitle} source={onUniqPrice ? dotOrange : dotWhite} />
                                <Text style={{ ...styles.titleTxt, color: onUniqPrice ? commonStyles.MEDIUM_ORANGE : commonStyles.WHITE }}>Tarif unique</Text>
                            </TouchableOpacity>
                            {onUniqPrice ?
                                <PriceDetail n={1}
                                    categoryNumber={categoriesNumber[1]}
                                    categoryPrice={categoriesPrice[1]}
                                    categoryName={categoriesName[1]}
                                    categoryDescription={categoriesDescription[1]}
                                    categoryTimerDateFrom={categoriesTimerDateFrom[1]}
                                    categoryTimerDateTo={categoriesTimerDateTo[1]}
                                    categoryTimerHourFrom={categoriesTimerHourFrom[1]}
                                    categoryTimerHourTo={categoriesTimerHourTo[1]}
                                    setCategoryNumber={pushCategoryNumber}
                                    setCategoryPrice={pushCategoryPrice}
                                    setCategoryName={pushCategoryName}
                                    setCategoryDescription={pushCategoryDescription}
                                    setCategoryTimerDateFrom={pushCategoryTimerDateFrom}
                                    setCategoryTimerDateTo={pushCategoryTimerDateTo}
                                    setCategoryTimerHourFrom={pushCategoryTimerHourFrom}
                                    setCategoryTimerHourTo={pushCategoryTimerHourTo}
                                    setCategoryInfo={pushCategoryInfo}
                                />
                                :
                                null
                            }
                        </View>
                        <View style={styles.diffPart}>
                            <TouchableOpacity style={styles.title} onPress={() => { setOnDiffPrice(!onDiffPrice); setOnUniqPrice(false)}}>
                                <Image style={styles.dotTitle} source={onDiffPrice ? dotOrange : dotWhite} />
                                <Text style={{ ...styles.titleTxt, color: onDiffPrice ? commonStyles.MEDIUM_ORANGE : commonStyles.WHITE }}>Tarifs différenciés</Text>
                            </TouchableOpacity>
                            {onDiffPrice ?
                                <View>
                                    {priceCounter.map(n => (
                                        <PriceDetail key={n} n={n}
                                            deletePrice={deletePrice}
                                            categoryNumber={categoriesNumber[n]}
                                            categoryPrice={categoriesPrice[n]}
                                            categoryName={categoriesName[n]}
                                            categoryDescription={categoriesDescription[n]}
                                            categoryTimerDateFrom={categoriesTimerDateFrom[n]}
                                            categoryTimerDateTo={categoriesTimerDateTo[n]}
                                            categoryTimerHourFrom={categoriesTimerHourFrom[n]}
                                            categoryTimerHourTo={categoriesTimerHourTo[n]}
                                            setCategoryNumber={pushCategoryNumber}
                                            setCategoryPrice={pushCategoryPrice}
                                            setCategoryName={pushCategoryName}
                                            setCategoryDescription={pushCategoryDescription}
                                            setCategoryTimerDateFrom={pushCategoryTimerDateFrom}
                                            setCategoryTimerDateTo={pushCategoryTimerDateTo}
                                            setCategoryTimerHourFrom={pushCategoryTimerHourFrom}
                                            setCategoryTimerHourTo={pushCategoryTimerHourTo}
                                            setCategoryInfo={pushCategoryInfo}
                                        />
                                    ))}
                                    <TouchableOpacity style={styles.addPricePart} onPress={() => { addPrice() }}>
                                        <Image style={styles.plusImg} source={require('../../../assets/CreateEvent/Cross.png')} />
                                        <Text style={styles.addPrice}>Ajouter un tarif</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                null
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
            <ReturnOrNext {...props} return={"Photos"} next={handleSubmit} />
        </SafeAreaView>
    )

}


export default CreateEventPrices

const styles = StyleSheet.create({
    container: {
        backgroundColor: commonStyles.BLACK,
        height: '100%',
        width: "100%",
    },
    error: {
        alignItems: 'center',
        marginBottom: "3%"
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
        borderColor: commonStyles.MEDIUM_ORANGE,
        borderLeftWidth: 2,
        paddingLeft: "7%",
    },
    contentContainer: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        borderColor: commonStyles.MEDIUM_ORANGE,
        borderWidth: 2,
        borderRadius: 2,
        width: "85%",
    },
    uniqPart: {
        padding: "5%"
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleTxt: {
        fontFamily: commonStyles.MAIN_FONT,
        fontSize: commonStyles.WIDTH > 370 ? 20 : 16,
        color: commonStyles.WHITE,
        paddingLeft: "5%"
    },
    dotTitle: {
        width: commonStyles.WIDTH > 370 ? 10 : 8,
        height: commonStyles.WIDTH > 370 ? 10 : 8
    },
    diffPart: {
        padding: "5%"
    },
    addPricePart: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: "5%",
        paddingHorizontal: "10%"
    },
    plusImg: {
        transform: [{ rotate: '45deg' }],
        width: commonStyles.WIDTH > 370 ? 12 : 9,
        height: commonStyles.WIDTH > 370 ? 12 : 9,
    },
    addPrice: {
        fontFamily: commonStyles.MAIN_FONT,
        fontSize: commonStyles.WIDTH > 370 ? 17 : 13,
        color: commonStyles.WHITE,
        paddingLeft: "5%"
    }

});