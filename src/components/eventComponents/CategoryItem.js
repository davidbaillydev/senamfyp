import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert, ActivityIndicator,SafeAreaView, ScrollView, Image, PermissionsAndroid, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

const CategoryItem = (props) => {

    const [showPicker, setShowPicker] = useState(false);
    const [datePickerShow,setDatePickerShow] = useState(false);
    const [hourTo,setHourTo] = useState("Fin validité");
    const [hourFrom,setHourFrom] = useState("Début validité");

    const handleDateSelection = () => {
        setShowPicker(true);
        setDatePickerShow(true);
    }
    const handleTimeSelection = () => {
        setShowPicker(true);
        setDatePickerShow(false);
    }

    return(
        <View>
            <Text style={styles.label}>Catégorie {props.n}</Text>
            <TextInput style={styles.input} onChangeText={(value) => props.setCategoryName(value,props.n)} placeholder="Nom"></TextInput>
            <TextInput style={styles.input} onChangeText={(value) => props.setCategoryNumber(value,props.n)} placeholder="Nombre" keyboardType="numeric"></TextInput>
            <TextInput style={styles.input} onChangeText={(value) => props.setCategoryPrice(value,props.n)} placeholder="Prix" keyboardType="numeric"></TextInput>
            <View style={styles.buttonDateTimePickerContainer}>
                <Button title={hourFrom.toString()} onPress={handleDateSelection}/>
                <Button title={hourTo.toString()} onPress={handleTimeSelection}/>
            </View>
            {showPicker ?
                    datePickerShow ?
                        <DateTimePicker
                            value={new Date()}
                            mode={'time'}
                            is24Hour={true}
                            display="default"
                            onChange={(event, date) => {
                                setShowPicker(false);
                                setHourFrom(date.toLocaleTimeString())
                                props.setCategoryHourFrom(date.toLocaleDateString());
                            }}
                        />
                        :
                        <DateTimePicker
                            value={new Date()}
                            mode={'time'}
                            display="default"
                            onChange={(event, date) => {
                                setShowPicker(false);
                                setHourTo(date.toLocaleTimeString())
                                props.setCategoryHourTo(date.toLocaleTimeString());
                            }}
                        />
                    :
                    <></>
                }
            <TextInput style={styles.input} onChangeText={(value) => props.setCategoryComment(value,props.n)} placeholder="Commentaire à afficher sur le QRCode"></TextInput>
        </View>
       
    );

}
    

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
    },
})

export default CategoryItem;