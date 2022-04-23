import React, { useState, useEffect } from "react";
import {Text, TouchableWithoutFeedback, StyleSheet, SafeAreaView, TextInput, Image, View, TouchableOpacity, Button, FlatList, ScrollView } from "react-native";
import * as commonStyles from "../../../utils/commonStyles";
import * as data from "../../../utils/data";
import FYPTextInput from "./FYPTextInput";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as functions from "../../../utils/functions";

function PriceDetail(props) {

    const [inputNb,setInputNb] = useState(null);
    const [inputPrice,setInputPrice] = useState(null);
    const [descInput,setDescInput] = useState(null);
    const [onDescAndTitle,setOnDescAndTitle] = useState(false);
    const [onTimer,setOnTimer] = useState(false);
    const [onHourFrom,setOnHourFrom] = useState(false);
    const [onHourTo,setOnHourTo] = useState(false);
    const [onDateFrom,setOnDateFrom] = useState(false);
    const [onDateTo,setOnDateTo] = useState(false);
    const [onDesc,setOnDesc] = useState(false);

    const [dateFrom,setDateFrom] = useState(null);
    const [dateTo,setDateTo] = useState(null);
    const [hourFrom,setHourFrom] = useState(null);
    const [hourTo,setHourTo] = useState(null);

    return(
        <View style={styles.container}>
            {props.n !== 1 ? 
            <TouchableOpacity style={styles.deletePrice} onPress={() => props.deletePrice(props.n)}>
                <Image style={styles.deleteImg} source={require('../../../assets/CreateEvent/Plus.png')} />
            </TouchableOpacity> : null}
            <View style={styles.nbAndPrice}>
                <TouchableOpacity style={styles.nb} onPress={() => inputNb.focus()}>
                    <Image style={styles.imgIcon} source={require('../../../assets/CreateEvent/Persons.png')} />
                    <TextInput
                        style={styles.contentTxt}
                        placeholder="XX"
                        placeholderTextColor={commonStyles.DARK_WHITE}
                        keyboardType="numeric"
                        onChangeText={(value) => props.setCategoryNumber(value,props.n)}
                        ref={(input) => setInputNb(input)}
                        value={props.number}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.price} onPress={() => inputPrice.focus()}>
                    <Image style={styles.imgIcon} source={require('../../../assets/CreateEvent/Euro.png')} />
                    <TextInput
                        style={styles.contentTxt}
                        placeholder="XX"
                        placeholderTextColor={commonStyles.DARK_WHITE}
                        keyboardType="numeric"
                        onChangeText={(value) => props.setCategoryPrice(value,props.n)}
                        ref={(input) => setInputPrice(input)}
                        value={props.price}
                    />
                </TouchableOpacity>
            </View>
            {onDescAndTitle
            ?
            <>
            <FYPTextInput placeholder="Titre" n={props.n} setText={props.setCategoryName} text={props.categoryName}/>
            <TouchableOpacity style={styles.descTitle} onPress={()=>{setOnDesc(!onDesc);descInput.focus()}}>
                <Text style={styles.descTitleTxt}>Description</Text>
                {onDesc ? 
                <TouchableOpacity style={styles.cross} onPress={()=>{setOnDesc(false);descInput.blur()}}>
                    <Image style={styles.crossImgLittle} source={require('../../../assets/CreateEvent/Cross.png')}/> 
                </TouchableOpacity>
                : 
                <Image style={styles.editImgLittle} source={require('../../../assets/CreateEvent/Edit.png')}/>
                }
            </TouchableOpacity>
            <View style={styles.descContent}>
                <TextInput 
                placeholder="Entrez un texte"
                placeholderTextColor={commonStyles.DARK_WHITE}
                multiline={true}
                onEndEditing={()=>setOnDesc(false)} 
                onFocus={()=>setOnDesc(true)} 
                ref={input => setDescInput(input)} 
                style={styles.descInput}
                onChangeText={(text)=>props.setCategoryDescription(text)}
                value={props.CategoryDescription}/>
            </View>
            </>
            :
            <TouchableOpacity style={styles.addDescAndTitle} onPress={()=>setOnDescAndTitle(true)}>
                <Image style={styles.plusIcon} source={require('../../../assets/CreateEvent/Cross.png')} />
                <Text style={styles.contentTxt}>Ajouter une description et un titre</Text>
            </TouchableOpacity>
            }
            {onTimer ?
            <>
            <View style={styles.timer}>
                <View style={styles.froms}>
                    <TouchableOpacity style={styles.dateFrom} onPress={()=>setOnDateFrom(true)}>
                        {dateFrom ? <Text style={styles.contentTxt}>Du  {functions.formatDateFromPicker(dateFrom)}</Text> : <Text style={styles.contentTxt}>Du XX/XX/XX</Text>}
                        <Image style={styles.editImgLittle} source={require('../../../assets/CreateEvent/Edit.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.hourFrom} onPress={()=>setOnHourFrom(true)}>
                        {hourFrom ? <Text style={styles.contentTxt}>A  {functions.formatTimeFromPicker(hourFrom)}</Text> : <Text style={styles.contentTxt}>A XX:XX</Text>}
                        <Image style={styles.editImgLittle} source={require('../../../assets/CreateEvent/Edit.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.tos}>
                    <TouchableOpacity style={styles.dateFrom} onPress={()=>setOnDateTo(true)}>
                        {dateTo ? <Text style={styles.contentTxt}>Au  {functions.formatDateFromPicker(dateTo)}</Text> : <Text style={styles.contentTxt}>Au XX/XX/XX</Text>}
                        <Image style={styles.editImgLittle} source={require('../../../assets/CreateEvent/Edit.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.hourFrom} onPress={()=>setOnHourTo(true)}>
                        {hourTo ? <Text style={styles.contentTxt}>A  {functions.formatTimeFromPicker(hourTo)}</Text> : <Text style={styles.contentTxt}>A XX:XX</Text>}
                        <Image style={styles.editImgLittle} source={require('../../../assets/CreateEvent/Edit.png')}/>
                    </TouchableOpacity>
                </View>
                {onHourFrom ?
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={'time'}
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) =>{setOnHourFrom(false);setHourFrom(date);props.setCategoryTimerHourFrom(event,date,props.n);}}
                />
                :null}
                {onDateFrom ?
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) =>{setOnDateFrom(false);setDateFrom(date);props.setCategoryTimerDateFrom(event,date,props.n)}}
                />
                :null}
                {onHourTo ?
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={'time'}
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) =>{setOnHourTo(false);setHourTo(date);props.setCategoryTimerHourTo(event,date,props.n);}}
                />
                :null}
                {onDateTo ?
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) =>{setOnDateTo(false);setDateTo(date);props.setCategoryTimerDateTo(event,date,props.n)}}
                />
                :null}
            </View>
            </>
            :
            <TouchableOpacity style={styles.addTimer} onPress={()=>setOnTimer(true)}>
                <Image style={styles.plusIcon} source={require('../../../assets/CreateEvent/Cross.png')} />
                <Text style={styles.contentTxt}>Ajouter un timer</Text>
            </TouchableOpacity>
            }
            <FYPTextInput placeholder="Demande d'information" n={props.n} setText={props.setCategoryInfo} text={props.categoryInfo}/>
            <Image style={styles.sep} source={require('../../../assets/MyTickets/barre.png')}/>
        </View>
    );
}

export default PriceDetail;

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:"10%"
    },
    deletePrice:{
        position:"absolute",
        right:15,
        top:5
    },
    deleteImg:{
        width: commonStyles.WIDTH > 370 ? 20 : 15,
        height: commonStyles.WIDTH > 370 ? 20 : 15,
        transform:[{rotate:'45deg'}]
    },
    nbAndPrice: {
        flex:1,
        flexDirection: 'row',
        paddingTop:"5%"
    },
        nb:{
            flexDirection: 'row',
            flex:1,
            alignItems: 'center',
        },
            imgIcon:{
                width: commonStyles.WIDTH > 370 ? 20 : 15,
                height: commonStyles.WIDTH > 370 ? 20 : 15
            },
            contentTxt:{
                fontFamily: commonStyles.MAIN_FONT,
                fontSize: commonStyles.WIDTH > 370 ? 18 : 15,
                color: commonStyles.WHITE,
                paddingLeft:commonStyles.WIDTH > 370 ? 15 : 10,
                height:commonStyles.WIDTH > 370 ? 40 : 40,
            },
            editImgLittle: {
                width: commonStyles.WIDTH > 370 ? 15 : 12,
                height: commonStyles.WIDTH > 370 ? 15 : 12,
                marginLeft:"10%"
            },
        price:{
            flexDirection: 'row',
            flex:1,
            alignItems: 'center',
        },
    addDescAndTitle: {
        flexDirection: 'row',
        flex:1,
        paddingTop:"3%"
        
    },
        plusIcon:{
            transform:[{rotate:'45deg'}],
            width: commonStyles.WIDTH > 370 ? 12 : 9,
            height: commonStyles.WIDTH > 370 ? 12 : 9,
            marginTop:"1%"
        },
    addTimer:{
        flexDirection: 'row',
        flex:1,
    },
    sep:{
        width:"100%",
        height:15,
        marginTop:"5%"
    },
    descImg:{
        width: commonStyles.WIDTH > 370 ? 20 : 15,
        height: commonStyles.WIDTH > 370 ? 20 : 15,
    },
    crossImgLittle:{
        width: commonStyles.WIDTH > 370 ? 15 : 12,
        height: commonStyles.WIDTH > 370 ? 15 : 12,
    },
    cross:{
        position: 'absolute',
        right:0
    },
    descTitle:{
        flexDirection: 'row',
        marginTop:"3%"
    },
    descTitleTxt:{
        fontFamily: commonStyles.MAIN_FONT,
        fontSize: commonStyles.WIDTH > 370 ? 18 : 15,
        color: commonStyles.WHITE,
        marginLeft: "2%"
    },
    descContent: {
        height:80,
        overflow:"hidden",
    },
    descInput:{
        fontFamily: commonStyles.MAIN_FONT,
        fontSize: commonStyles.WIDTH > 370 ? 15 : 13,
        color: commonStyles.WHITE,
        width:"95%",
        overflow: "hidden"
    },
    timer:{
        flexDirection: 'row',
    },
    froms:{
        flex:1
    },
    tos:{
        flex:0.9
    },
    dateFrom:{
        flexDirection: 'row',

    },
    hourFrom:{
        flexDirection: 'row',
    }
});