import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as FYPStyles from '../../utils/commonStyles';
import { APP_URL_EMU } from "../../utils/config";

const LoginForm = (props) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errors,setErrors] = React.useState([]);

    const submitLogIn = (event) => {
        event.preventDefault();
        let bodyFormData = new FormData();
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);

        console.log(bodyFormData);

        fetch(APP_URL_EMU + "/api/login", { method: 'POST', body: bodyFormData })
            .then((response) => response.json())
            .then(async (responseData) => {
                if (responseData.errors){
                    setErrors(responseData.errors);
                } else if (responseData['error']){
                    setErrors(responseData)
                } else {
                    setErrors([]);
                }
                try {     
                    await AsyncStorage.setItem('api_token',responseData.api_token);
                    await AsyncStorage.setItem('user_id',responseData.id.toString());
                    console.log("go to menu");
                    props.menu();
                    props.connect(true);
                }
                catch (error) {
                    console.log(error)
                }
            })
            .catch((error) => {
                console.log(error);
                
            })
    }

    

    return (
        <View>
            <Text>Connexion</Text>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} onChangeText={setEmail} placeholder="Entrez votre email"></TextInput>
            { (errors) ? <Text style={styles.error}>{errors['email']}</Text> : <Text></Text>}
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput style={styles.input} onChangeText={setPassword} placeholder="Entrez un mot de passe" secureTextEntry={true}></TextInput>
            { (errors) ? <Text style={styles.error}>{errors['password']}</Text> : <Text></Text>}
            <Button onPress={submitLogIn} title="Se connecter"></Button>
            { (errors) ? <Text style={styles.error}>{errors['error']}</Text> : <Text></Text>}
            <Button title = "Menu" onPress={props.menu}/>
        </View>
    )

}

const styles = StyleSheet.create({
    label: {
        color: FYPStyles.BLACK,
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        backgroundColor: 'white',
    },
    error : {
        color:'red',
        fontSize:10
    }
});

export default LoginForm