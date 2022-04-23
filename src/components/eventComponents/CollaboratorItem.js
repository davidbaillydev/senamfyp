import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert, ActivityIndicator,SafeAreaView, ScrollView, Image, PermissionsAndroid, Platform } from "react-native";
import UserTextInput from "./UserTextInput";
import SelectDropdown from "react-native-select-dropdown";
import * as data from "../../utils/data";

const CollaboratorItem = (props) => {

    return(
        <View>
            <Text style={styles.label}>Collaborateur {props.n}</Text>
            <UserTextInput onUserChange={props.setUser}></UserTextInput>
            <SelectDropdown
                data={data.roleCollaborator}
                onSelect={(selectedItem, index) => {
                    props.setRole(selectedItem);
                }}
                defaultButtonText={"Role"}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
                buttonStyle={styles.dropdownButtonStyle}
                buttonTextStyle={styles.textStyle}
            />
        </View>
       
    );

}
    

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
    },
})

export default CollaboratorItem;