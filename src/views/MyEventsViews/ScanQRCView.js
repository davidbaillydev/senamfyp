import React from "react";
import { Button, View, TouchableOpacity, Text, ActivityIndicator, FlatList } from "react-native";
import { useState } from "react";
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraScreen } from "react-native-camera-kit";
import { APP_URL_EMU } from "../../utils/config";
import { LIGHT_ORANGE } from "../../utils/commonStyles";
import { QR_VALUE_SEPARATOR } from "../../utils/globalConst";

const ScanQRCView = ({navigation}) => {

    const [eventId, setEventID] = useState(21);
    //const [qrValue, setQrValue] = useState('');
    const [hasScanned, setHasScanned] = useState(false);
    const [scanResult, setScanResult] = useState(undefined);


    const fetchTicket = (code) => {
        const url = APP_URL_EMU + "/api/tickets/" + eventId + "/" + code;
        console.log(url);
        fetch(url, {method: 'GET'})
            .then(result => result.json())
            .then((responseData) => {
                console.log("retour fetch ticket : ", responseData);
                setScanResult({'code': code, 'tickets': responseData});
                // vérifier si un ticket a été trouvé ou non
                // vérifier si il est expiré ou non
            })
            .catch((e) => {console.log("Erreur fetch ticket: ", e)})
    }

    const handleScan = (event) => {
        if(!hasScanned) {
            let qrValue = event.nativeEvent.codeStringValue
            console.log("--------------------------------");
            console.log("Valeur du QR Code : ", qrValue);
            console.log("--------------------------------");
            //setQrValue(code);
            fetchTicket(qrValue);
        }
        setHasScanned(true);
        
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            {hasScanned ?
                (scanResult === undefined) ?
                    <ActivityIndicator />
                :
                    <ScanResultView
                        message={scanResult.message}
                        code={scanResult.code}
                        tickets={scanResult.tickets}
                    />
            :
                <SafeAreaView style={{flex: 1}}>
                    <CameraScreen
                        showFrame={true}
                        // Show/hide scan frame
                        scanBarcode={true}
                        // Can restrict for the QR Code only
                        laserColor={'red'}
                        // Color can be of your choice
                        frameColor={'white'}
                        // If frame is visible then frame color
                        colorForScannerFrame={'blue'}
                        // Scanner Frame color
                        onReadCode={handleScan}
                    />
                    {/* <QRCode
                    //QR code value
                    value="Bonjour"
                    //size of QR Code
                    size={250}
                    //Color of the QR Code (Optional)
                    color="black"
                    //Background Color of the QR Code (Optional)
                    backgroundColor="white"
                    /> */}
                    <Button
                        title="stop scan"
                        onPress={() => {navigation.goBack()}}
                    />
                </SafeAreaView>
            }
        </SafeAreaView>
        
        
    );
}

const ScanResultView = ({code, tickets}) => {
    console.log("code : ", code);
    console.log("tickets : ", tickets);

    if(tickets.length === 1 && tickets[0].is_available) {
        //let bodyFormData = new FormData();
        //bodyFormData.append("invalidate_value", 0);

        const url = APP_URL_EMU + "/api/tickets/invalidate/" + tickets[0].id;
        console.log(url);
        fetch(url, {method: 'POST'})//, body: bodyFormData})
            .then((response) => {
                return response.json();
            })
            .then(responseData => console.log("retour invalidate : ", responseData))
            .catch(e => console.log("erreur invalidation ", e))
    }   

    return(
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {tickets.length === 0 ?
                <Text>Aucun ticket trouvé lors du scan</Text>
            :
                <View>
                    {tickets.length === 1 ?
                        tickets[0].is_available ?
                            <Text>Ticket trouvé et valide</Text>
                        :
                            <Text>Ticket trouvé mais non valide</Text>
                    :
                        <FlatList
                            data={tickets}
                            renderItem={({item}) => {
                                return(<Text>Plusieurs tickets trouvés, id de l'user : {item.user_id}</Text>);
                            }}
                        />
                    }
                </View>
                
            }   
        </SafeAreaView>
    );
}

export default ScanQRCView;