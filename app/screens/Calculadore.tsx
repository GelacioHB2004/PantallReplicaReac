import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from "react";
import Header from '../../src/Componentes/Header';
import Boton from '../../src/Componentes/boton';

const Calculadore = ()=>{
    const [V1,setV1]=useState<string>('');
    const [V2,setV2]=useState<string>('');
    const [Res,setRes]=useState<number | null>(0);

    const suma=()=>{
        const val1=parseFloat(V1);
        const val2=parseFloat(V2);
        setRes(val1+val2);
        setRes(Res);
    }

    return(
        <View style={styLes.container}>
             <Header titulo='Calculadora'
             nombre='Gelacio'
             imagen={require('../../assets/adaptive-icon.png')}/>
             <View>
                {}
                <Text>Valor 1</Text>
                <TextInput placeholder='Valor 1'/>
                <Text>Valor 2</Text>
                <TextInput placeholder='Valor 2'/>
                <View>
                    <Boton titulo='+' onPress={()=>{suma}}/>
                    <Boton titulo='-' onPress={()=>{}}/>
                    <Boton titulo='*' onPress={()=>{}}/>
                    <Boton titulo='/' onPress={()=>{}}/>
                </View>
                <View>
                    <TextInput
                </View>
             </View>
             <Foother fecha='14/02/2005' grupo='5B'/>
        </View>
     

    )

}
export default Calculadore;
const styLes=StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
})
