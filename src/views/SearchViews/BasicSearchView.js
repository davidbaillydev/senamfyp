import React, { useState } from 'react';
import { TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WHITE } from '../../utils/commonStyles';

const BasicSearchView = () => {

    const [searchValue, setSearchValue] = useState("");
    console.log(searchValue);

    const onSearch = () => {
        console.log(searchValue);
    }

    const SearchStack = createNativeStackNavigator();

    return(
        <SafeAreaView style={{flex: 1, justifyContent:'center'}}>
            <TextInput
                style={{backgroundColor: WHITE}}
                onChangeText={(val)=>setSearchValue(val)}
            />
            <Button title="RECHERCHER" onPress={onSearch}/>
        </SafeAreaView>
        
    );
}

export default BasicSearchView;