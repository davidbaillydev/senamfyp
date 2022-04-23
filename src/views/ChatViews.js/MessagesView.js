import React, { useEffect, useState } from "react";
import { PermissionsAndroid,TouchableOpacity, StyleSheet, View, Text, FlatList, ActivityIndicator, TextInput, Button, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchUserInfos } from "../../utils/functions";
import { APP_URL_EMU, IP_ADR_FLO, LARAVEL_ECHO_PORT } from "../../utils/config";
import * as commonStyles from "../../utils/commonStyles";
import DocumentPicker from "react-native-document-picker";
import RNFS from 'react-native-fs';
import axios from 'axios';
import Echo from "laravel-echo";
import socketio from "socket.io-client";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
import { useCallback } from "react/cjs/react.development";
import RNFetchBlob from 'rn-fetch-blob';


//console.log("url : ", 'http://' + IP_ADR_FLO + ':' + LARAVEL_ECHO_PORT);

const MessagesView = (props) => {

    const [user, setUser] = useState({});
    const [interlocutor, setInterlocutor] = useState({});

    const [history, setHistory] = useState([]);
    const [isHistoryReceived, setIsHistoryReceived] = useState(false);

    const [message, setMessage] = useState("");
    const [file,setFile] = useState("");

    const [echoMess, setEchoMess] = useState("");
    //console.log("echo mess state : ", echoMess);

    const [errors,setErrors] = React.useState([]);

    const [fileResponse, setFileResponse] = useState([]);

    const echo = new Echo({
        host: 'http://localhost:6001',
        broadcaster: 'socket.io',
        client: socketio,
    });

    useEffect(() => {
        echo.channel('chats').listen('.chatEvent', ev => {
                console.log("Msg reçu par echo : ", ev);
                setEchoMess(ev);
            })
    });

    useEffect(() => {
        //Get user infos
        fetchUserInfos()
            .then(result => {
                //console.log("result : ", result);
                setUser(result);
            })
        
        //console.log(props.route.params.interlocutor_id);
        if(props.route.params.interlocutor_id !== undefined) {
            //Get interlocutor infos
            fetch(APP_URL_EMU + "/api/users/" + props.route.params.interlocutor_id, { method: 'GET' })
                .then(response => response.json())
                .then(responseData => {
                    //console.log("interlocuteur trouvé : ", responseData);
                    setInterlocutor(responseData);
                })
                .catch(err => console.log("err recherche interlocuteur ", err))
        } else {
            console.log("Penser à passer l'id de l'interlocuteur en paramètres de route");
        }
        
    }, []);

    useEffect(() => {
        //Get history
        //console.log("user : ", user);
        //console.log("interlocutor : ", interlocutor);
        if(Object.entries(interlocutor).length !== 0 && JSON.stringify(user) !== {}) {
            //console.log("getting history of : ", interlocutor.id, "and", user.id);
            fetch(APP_URL_EMU + "/api/chats/" + interlocutor.id + "/" + user.id, { method: 'GET' })
                .then(response => response.json())
                .then(responseData => {
                    //console.log("messages : ", responseData);
                    setHistory(responseData);
                    setIsHistoryReceived(true);
                })
                .catch(err => console.log("err recup historique : " + err))
        }
    }, [user, interlocutor]);

    const renderMsg = ({ item }) => {
        //console.log(item.sender_id, " ", item.receiver_id, " ", item.content, " ", item.date);
        const msg_style = (item.sender_id === user.id) ? styles.my_msg_container : styles.other_msg_container;
        //console.log(item.id);
        return(<>
        <Text style={msg_style}>{item.date + " : " + item.content}</Text>
        {item.file && <TouchableOpacity style={msg_style} onPress={()=>checkPermission(item.file)}><Text>{item.file}</Text></TouchableOpacity>}
        </>
        );
    }

    const checkPermission = async (file) => {
 
        if (Platform.OS === 'ios') {
          downloadFile(file);
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission Required',
                message:
                  'Application needs access to your storage to download File',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // Start downloading
              downloadFile(file);
              console.log('Storage Permission Granted.');
            } else {
              // If permission denied then show alert
              Alert.alert('Error','Storage Permission Not Granted');
            }
          } catch (err) {
            // To handle permission related exception
            console.log("++++"+err);
          }
        }
      };

      const downloadFile = (fileUrl) => {
   
        // Get today's date to add the time suffix in filename
        let date = new Date();
        // File URL which we want to download
        let FILE_URL = APP_URL_EMU + "/" + fileUrl;    
        // Function to get extention of the file url
        let file_ext = "pdf"
       
        file_ext = '.' + file_ext;
       
        // config: To get response by passing the downloading related options
        // fs: Root directory path to download
        const { config, fs } = RNFetchBlob;
        let RootDir = fs.dirs.PictureDir;
        let options = {
          fileCache: true,
          addAndroidDownloads: {
            path:
              RootDir+
              '/file_' + 
              Math.floor(date.getTime() + date.getSeconds() / 2) +
              file_ext,
            description: 'downloading file...',
            notification: true,
            // useDownloadManager works with Android only
            useDownloadManager: true,   
          },
        };
        config(options)
          .fetch('GET', FILE_URL)
          .then(res => {
            // Alert after successful downloading
            console.log('res -> ', JSON.stringify(res));
            alert('File Downloaded Successfully.');
          });
      };

    const onSendMessage = () => {
        console.log("message envoyé");
        const currDate = new Date().toISOString();
        const dateData = currDate.split('T');
        const dateFormatted = dateData[0] + " " + (dateData[1].split('Z')[0]);
        // console.log(dateData);
        // console.log(dateFormatted);

        let bodyFormData = 
        {
        'sender_id':user.id,
        'receiver_id':interlocutor.id,
        'content':message,
        'file':file,
        'date':dateFormatted};
        // bodyFormData.append('sender_id', user.id);
        // bodyFormData.append('receiver_id', interlocutor.id);
        // bodyFormData.append('content', message);
        // bodyFormData.append('file',file);
        // bodyFormData.append('date', dateFormatted);
        // console.log(bodyFormData);
        console.log(file.length);

        axios.post(APP_URL_EMU + "/api/chats/postMessage", bodyFormData, {maxBodyLength:200000000})
            .then((responseData) => {
                console.log(responseData.data.errors);
                if (responseData.data.errors){
                   
                    setErrors(responseData.data.errors);
                } else if (responseData.data['error']){
                    setErrors(responseData.data)
                } else {
                    setErrors([]);
                }
            })
            .catch(error => console.log(error));
    }

    const handleDocumentSelection = useCallback(async () => {
        try {
          const response = await DocumentPicker.pick({
            presentationStyle: 'fullScreen',
            type: [DocumentPicker.types.pdf],
            copyTo:"cachesDirectory"
          });
          console.log(response[0].fileCopyUri);
          setFileResponse(response[0]);
          RNFS.readFile(response[0].fileCopyUri,'base64').then((response) => {
              setFile("data:application/pdf;base64,"+response);
          });
        } catch (err) {
          console.warn(err);
        }
      }, []);

    return(
        <SafeAreaView style={styles.main_container}>
            {(isHistoryReceived) ?
            <View style={styles.content_container}>
                <View>
                    <Text style={{fontWeight: 'bold', fontSize: 24, color: commonStyles.BLACK}}>You discuss with {interlocutor.pseudo}</Text>
                    <View style={{maxHeight: 450}}>
                        <FlatList
                                data={history}
                                renderItem={renderMsg}
                                keyExtractor={item => item.id}
                        />
                    </View>
                    
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.content}>
                        {fileResponse ? <Text
                        style={styles.uri}
                        numberOfLines={1}
                        ellipsizeMode={'clip'}>
                        {fileResponse.uri}
                        </Text> : null}
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="Ecrivez votre message ici"
                            value={message}
                            onChangeText={newText => setMessage(newText)}
                        />
                    </View>
                    <Button title="Envoyer" onPress={onSendMessage} />
                    <Button title="Choisir un fichier" onPress={handleDocumentSelection} />
                </View>
            </View>
             :
            <ActivityIndicator size='large' color={commonStyles.LIGHT_ORANGE}/>
            }
        </SafeAreaView>
            
    );
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1 
    },
    content_container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        height:"10%"
    },
    content :{
        flexDirection: 'column',
        flex:1,
    },
    my_msg_container: {
        alignSelf: "flex-end"
    },
    other_msg_container: {
        alignSelf: "flex-start"
    },
    textInputStyle: {
        backgroundColor: 'white',
        flex: 1,
    }
});

export default MessagesView;
