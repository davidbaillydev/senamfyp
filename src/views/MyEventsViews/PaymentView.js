import React, { useState, useEffect } from 'react';
import { SafeAreaView, Button, View, Text, Input, ActivityIndicator } from 'react-native';
import {WebView} from 'react-native-webview';
import { APP_URL_EMU } from '../../utils/config';
import KRGlue from '@lyracom/embedded-form-glue';
import { TEST_PUBLIC_KEY, USER_KEY } from '../../utils/keys';
import { fetchUserInfos, formatDateTimeForPayment, generateCode } from '../../utils/functions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LIGHT_ORANGE } from '../../utils/commonStyles';

//TESTS AVEC KRGLUE

// useEffect(() => {
//     console.log("loading payment form");
//     const publicKey = '30444361:testpublickey_IlySDenzMbCUQouFVoQxAVwikVNribUAHmfgrGkM3M0pz';
//     const endPoint = 'https://api.lyra.com/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js'; /* should include https:// */

//     /* WARNING: You should always use promises chaining with KR method calls */
//     KRGlue.loadLibrary(endPoint, publicKey) /* Load the remote library */
//         .then(({KR}) => {
//             console.log("KR returned : ", KR);
//             KR.setFormConfig({              /* set the minimal configuration */
//                 formToken: formToken,
//                 'kr-language': 'en-US',                       /* to update initialization parameter */
//             });
//         })
//         .then(({KR}) => KR.addForm('#myPaymentForm'))   /* create a payment form */
//         .then(({KR, result}) => {
//             KR.showForm(result.formId);
//             console.log(result);
//         }) /* show the payment form */
//         .catch(e => console.log(e))
// }, [formToken])

const pricing_object = {
    id: 8,
    event_id: 6,
    category: "VIP",
    price: 14.5
}

const event_name = "Afterwork au PK";

const PaymentView = (props) => {

    //const [formToken, setFormToken] = useState("");

    const [user, setUser] = useState({});
    const [userId, setUserId] = useState(0);
    const [actionMode, setActionMode] = useState("INTERACTIVE");
    const [amount, setAmount] = useState("9952");
    const [ctxMode, setCtxMode] = useState("TEST");
    const [currency, setCurrency] = useState("978");
    const [pageAction, setPageAction] = useState("PAYMENT");
    const [paymentConfig, setPaymentConfig] = useState("SINGLE");
    const [siteId, setSiteId] = useState(USER_KEY);
    const [transDate, setTransDate] = useState(formatDateTimeForPayment());
    const [transId, setTransId] = useState(generateCode(6));
    const [version, setVersion] = useState("V2");
    const [ticketCode, setTicketCode] = useState(generateCode(8));
    const [signature, setSignature] = useState("");
    const [redirectionUrl, setRedirectionUrl] = useState("");
    
    console.log("user id dans la payment view : ", userId);

    console.log("code de transaction généré : ", transId);

    console.log("signature : ", signature);

    // const onInitPayment = () => {
    //     console.log("Demande initiation d'un paiement");
        
    //     //get keys
    //     fetch(APP_URL_EMU + "/api/keys/header", {method: 'GET'})
    //         .then(response => response.json())
    //         .then((responseData) => {
    //             console.log("Clé recupérée pour le formToken : ", responseData);
    //             onFetchChargePayment(responseData);
    //         })
    //         .catch(e => console.log("erreur init payment : ", e))
    // }

    // const onFetchChargePayment = (header) => {
    //     const bodyFormData = new FormData();
    //     bodyFormData.append('amount',20);
    //     bodyFormData.append('currency', "EUR");
    //     fetch('https://api.systempay.fr/api-payment/V4/Charge/CreatePayment',{
    //         method: 'POST',
    //         headers: {
    //             Authorization: header,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             amount: 500,
    //             currency: "EUR",
    //             orderId: "CX-1254"
    //         })
    //     })
    //         .then(response => response.json())
    //         .then(responseData => {
    //             //console.log("form token reçu : ", responseData.answer.formToken);
    //             console.log("form token reçu : ", responseData);
    //             setFormToken(responseData.answer.formToken);
    //         })
    //         .catch(e => console.log(e))
    // }

    useEffect(() => {
        if(userId === 0) {
            fetchUserInfos()
                .then(user => {
                    console.log("user dans payment : ", user);
                    setUser(user);
                    setUserId(user.id);
                })
        }
    });

    const getFormSignature = () => {
        console.log("ticket code dans le get form sign : ", ticketCode);

        const params = {
            "vads_action_mode": actionMode,
            "vads_amount": amount,
            "vads_trans_date": transDate,
            "vads_ctx_mode": ctxMode,
            "vads_currency": currency,
            "vads_page_action": pageAction,
            "vads_payment_config": paymentConfig,
            "vads_site_id": siteId,
            "vads_trans_id": transId,
            "vads_version": version,
            //Infos acheteur
            "vads_cust_id": user.id,
            "vads_cust_first_name": user.pseudo,
            "vads_cust_email": user.email,
            "vads_cust_title": user.sex,
            "vads_cust_phone": user.phone,
            //Retour automatique apres paiement
            "vads_redirect_success_message": "Vous allez être redirigé vers votre site marchand",
            "vads_redirect_success_timeout": "5",
            "vads_redirect_error_message": "Vous allez être redirigé vers votre site marchand",
            "vads_redirect_error_timeout":  "5",
            "vads_return_mode": "GET",
            //Infos personnalisées
            "vads_ext_info_user_id": userId,
            "vads_ext_info_event_id": pricing_object.event_id,
            "vads_ext_info_pricing_id": pricing_object.id,
            "vads_ext_info_ticket_code": ticketCode,
        };
        fetch(APP_URL_EMU + "/api/keys/signature/" + JSON.stringify(params), {method: 'GET'})
            .then(response => response.json())
            .then(responseData => {
                console.log("signature reçue : ", responseData);
                setSignature(responseData);
            })
            .catch(e => console.log("erreur signature : ", e));
    }

    useEffect(() => {
        if(signature !== "") {
            onSubmitPaymentDataForm();
        } else {
            console.log("Signature vide");
        }
    }, [signature]);

    const onSubmitPaymentDataForm = () => {
        const bodyFormData = new FormData();
        console.log("ticket code dans le submit : ", ticketCode);
        //Champs obligatoires
        bodyFormData.append("vads_action_mode", actionMode);
        bodyFormData.append("vads_amount", amount);
        bodyFormData.append("vads_trans_date", transDate);
        bodyFormData.append("vads_ctx_mode", ctxMode);
        bodyFormData.append("vads_currency", currency);
        bodyFormData.append("vads_page_action", pageAction);
        bodyFormData.append("vads_payment_config", paymentConfig);
        bodyFormData.append("vads_site_id", siteId);
        bodyFormData.append("vads_trans_id", transId);
        bodyFormData.append("vads_version", version);
        //Infos acheteur
        bodyFormData.append("vads_cust_id", user.id),
        bodyFormData.append("vads_cust_first_name", user.pseudo),
        bodyFormData.append("vads_cust_email", user.email),
        bodyFormData.append("vads_cust_title", user.sex),
        bodyFormData.append("vads_cust_phone", user.phone),
        //Retour automatique apres paiement
        bodyFormData.append("vads_redirect_success_message", "Vous allez être redirigé vers votre site marchand"),
        bodyFormData.append("vads_redirect_success_timeout", "5"),
        bodyFormData.append("vads_redirect_error_message", "Vous allez être redirigé vers votre site marchand"),
        bodyFormData.append("vads_redirect_error_timeout",  "5"),
        bodyFormData.append("vads_return_mode", "GET"),
        //Infos en plus
        bodyFormData.append("vads_ext_info_user_id", userId),
        bodyFormData.append("vads_ext_info_event_id", pricing_object.event_id),
        bodyFormData.append("vads_ext_info_pricing_id", pricing_object.id),
        bodyFormData.append("vads_ext_info_ticket_code", ticketCode),
        //Signature
        bodyFormData.append("signature", signature);

        // const params = {
        //     "vads_action_mode": actionMode,
        //     "vads_amount": amount,
        //     "vads_trans_date": transDate,
        //     "vads_ctx_mode": ctxMode,
        //     "vads_currency": currency,
        //     "vads_page_action": pageAction,
        //     "vads_payment_config": paymentConfig,
        //     "vads_site_id": siteId,
        //     "vads_trans_id": transId,
        //     "vads_version": version,
        //     "signature": signature
        // };
        
        //console.log(bodyFormData);

        fetch("https://paiement.systempay.fr/vads-payment/entry.silentInit.a", {
            method: "POST",
            body: bodyFormData
        })
            .then(response => response.json())
            .then((responseData) => {
                console.log(responseData);
                console.log(responseData.status);
                setRedirectionUrl(responseData.redirect_url);
            })
            .catch(e => console.log("erreur submit data : ", e))

    }



    return(
        <SafeAreaView style={{flex: 1}}>
            {userId === "" ?
                <ActivityIndicator size='large' color={LIGHT_ORANGE}/>
            :
                redirectionUrl === "" ?
                    <View>
                        <Text>
                            Vous êtes sur le point d'acheter un ticket pour l'evenement {event_name} au prix de {pricing_object.price}€
                        </Text>
                        <Button onPress={getFormSignature} title="Oui, payer"/>
                    </View>
                :
                    <View style={{flex: 1}}>
                        <WebView
                            source={{ uri: redirectionUrl }}
                        />
                    </View>}
            
            
        </SafeAreaView>
    );
}


{/* <input type="hidden" name="vads_capture_delay" value="0" />
                                        <input type="hidden" name="vads_order_id" value="CX-1254" />
                                        <input type="hidden" name="vads_payment_cards" value="CB" /> */}

export default PaymentView;