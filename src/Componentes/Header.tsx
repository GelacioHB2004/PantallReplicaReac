import { Image, requireNativeComponent, StyleSheet, Text, View } from 'react-native';
import React from "react";

const Header = ()=>{
    return(
        <View>
            <view>
                <Image source={require('../')}/>
            </view>
            <View>
                <Text>Titulo</Text>
                <Text>Nombre</Text>
            </View>
            
        </View>
     

    )

}
export default Header;

const styLes=StyleSheet.create({
    container:{
        flexDirection:'row',
    },
    titulo:{
        fontSize:20,
        fontWeight:'bold',
    },
    imagen:{
        width:50,
        height:50,
        borderRadius:50
    }
})
