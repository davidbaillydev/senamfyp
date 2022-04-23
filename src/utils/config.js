
export const APP_URL_USB_FLO = "http://10.7.151.0:8000";
export const IP_ADR_FLO = "10.7.151.0";
export const GEO_API_KEY_FLO = "03420efabcb0433cb1fa58e95bed79ea";

export const APP_URL_USB_BAPT = "http://?.?.?.?:8000";
export const APP_URL_EMU = "https://api.findyourparty.fr";
//export const APP_URL_EMU = "http://10.0.2.2:8000";
export const LARAVEL_ECHO_PORT = 6001;





/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ UTILE POUR LE PAIEMENT ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// import WebView from "react-native-webview";
// import KRGlue from "@lyracom/embedded-form-glue";


// const get = function() {
    //     console.log("get");
    //     axios.get(APP_URL_USB + "/api/tickets")
    //         .then(function (response) {
    //             console.log(response.data);
    //         })
    //         .catch(function (error) {
    //             console.log("erreur de fetch des tickets : " + error);
    //         })
    // }

    // useEffect(() => {
        // console.log("loading payment form");
        // const publicKey = '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5';
        // const endPoint = 'https://api.lyra.com/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js'; /* should include https:// */

        // /* WARNING: You should always use promises chaining with KR method calls */
        // KRGlue.loadLibrary(endPoint, publicKey) /* Load the remote library */
        //     .then(({KR} ) => {
        //         console.log(KR);
        //         KR.setFormConfig({              /* set the minimal configuration */
        //             formToken: 'DEMO-TOKEN-TO-BE-REPLACED',
        //             'kr-language': 'en-US',                       /* to update initialization parameter */
        //         });
        //     })
        //     .then(({KR}) => KR.addForm('#myPaymentForm'))   /* create a payment form */
        //     .then(({KR, result}) => {
        //         KR.showForm(result.formId);
        //         console.log(result);
        //     }) /* show the payment form */
        //     .catch(e => console.log(e))
    // })