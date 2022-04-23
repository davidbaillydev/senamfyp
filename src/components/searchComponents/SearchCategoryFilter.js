import React, {useState,useEffect} from "react";
import { StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, Button, FlatList } from "react-native";
import * as commonStyles from "../../utils/commonStyles";
import * as data from "../../utils/data";

const SearchCategoryFilter = (props) => {

    return(
        <SafeAreaView style={[styles.container, props.customStyle]}>
            <FlatList
                ListHeaderComponent={()=>{
                    return(
                    <View style={styles.header}>
                        <View style={styles.headerImgPart}>
                            <Image style={styles.headerImg} source={require('../../assets/CreateEvent/Interrogation.png')}/>
                        </View>
                        <Text style={styles.headerTxt}>Catégorie de l'évènement</Text>
                    </View>)
                }}
                style={styles.list}
                data={data.eventCategories}
                renderItem={({ item, index, separators }) => (
                    <TouchableOpacity style={styles.type} onPress={() => props.handleSelectCategory(item.name)}>
                        <View style={styles.imgPart}>
                            <Image source={item.img} style={styles.img}/>
                        </View>
                        <Text style={styles.name}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        justifyContent:'center',
        alignItems:'center'
    },
        list:{
            width: commonStyles.SEARCH_VIEW_CONTAINERS_WIDTH,
            backgroundColor: commonStyles.BLACK
        },
        header:{
            borderColor:commonStyles.MEDIUM_ORANGE,
            borderWidth:2,
            borderRadius:2,
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
        },
            headerImgPart:{
                flex:1,
                justifyContent:'center',
                alignItems:'center',
            },
                headerImg: {
                    width:commonStyles.WIDTH > 370 ? 15 : 13,
                    height:commonStyles.WIDTH > 370 ? 22 : 20
                },
            headerTxt: {
                borderColor:commonStyles.MEDIUM_ORANGE,
                borderLeftWidth:2,
                paddingLeft:"7%",
                flex:4,
                fontFamily:commonStyles.MAIN_FONT,
                fontSize:commonStyles.WIDTH > 370 ? 22 : 18,
                color:commonStyles.WHITE,
                padding:"3%"
            },
        type:{
            borderColor:commonStyles.MEDIUM_ORANGE,
            borderBottomWidth:2,
            borderRightWidth:2,
            borderLeftWidth:2,
            borderRadius:2,
            height:commonStyles.WIDTH > 370 ? 100 : 75,
            flexDirection:'row',
            padding:'3%',
            justifyContent:'center',
            alignItems:'center',
            width:'100%',
        },
            imgPart: {
                flex:1.5,
                justifyContent:'center',
                alignItems:'flex-end'
            },
                img:{
                    width:"90%",
                    height:"70%"
                },
            name:{
                flex:3,
                fontFamily:commonStyles.MAIN_FONT,
                fontSize:commonStyles.WIDTH > 370 ? 22 : 18,
                color:commonStyles.WHITE,
                paddingLeft:'12%'
            },
});

export default SearchCategoryFilter;
