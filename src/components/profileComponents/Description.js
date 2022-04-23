import React, {useState, useRef} from 'react';
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MEDIUM_ORANGE, BASIC_TEXT, PROFILE_PICTURE_SIZE } from '../../utils/commonStyles';


const Description = ({value, isEditable, onSetDescription}) => {
    //const [isFocused, setIsFocused] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [savedDescription, setSavedDescription] = useState(value);


    const onEdit = () => {
        setIsEditing(true);
    }

    const onValidate = () => {
        setIsEditing(false);
        console.log("description sauvegardée : ", savedDescription)
        onSetDescription(savedDescription);
    }

    return(
        <View
            style={{
                borderColor: MEDIUM_ORANGE,
                borderWidth: 2,
                borderRadius: 5
            }}
        >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Image
                    source={require('../../assets/Profile/Desc.png')}
                    style={{
                        width: 15,
                        height: 15,
                        marginHorizontal: 5
                    }}
                />
                <Text style={BASIC_TEXT}>BIO</Text>
                {isEditable ?
                    isEditing ?
                    <TouchableOpacity
                        onPress={onValidate}
                    >
                        <Image
                            source={require('../../assets/Profile/check.png')}
                            style={{
                                width: 15,
                                height: 15,
                                marginHorizontal: 5
                            }}
                        />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={onEdit}
                    >
                        <Image
                            source={require('../../assets/Profile/Edit.png')}
                            style={{
                                width: 15,
                                height: 15,
                                marginHorizontal: 5
                            }}
                        />
                    </TouchableOpacity>
                    
                :
                <></>}
                
            </View>
            <TextInput
                style={BASIC_TEXT}
                value={savedDescription}
                onChangeText={(text) => {
                    setSavedDescription(text);
                }}
                editable={isEditing}
            />
        </View>
    );
}

const styles = StyleSheet.create({
})


export default Description;