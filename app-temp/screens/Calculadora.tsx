import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../Components/Header'
import Foother from '../Components/Foother'
import Boton from '../Components/Boton'

const Calculadora = () => {
    //estados de la app
    const [V1,setV1]=useState<string>('');
    const [V2,setV2]=useState<string>('');
    const [Res,setRes]=useState<number|null>(0);

    //logica del componente calculadora 
    const Suma=()=>{
        const val1=parseFloat(V1);
        const val2=parseFloat(V2);
        const resultado=val1+val2;
        setRes(resultado);
    }

    const Resta=()=>{
        const val1=parseFloat(V1);
        const val2=parseFloat(V2);
        setRes(val1-val2);
    }

    const Multiplicacion=()=>{
        const val1=parseFloat(V1);
        const val2=parseFloat(V2);
        setRes(val1*val2);
    }

    const Division=()=>{
        const val1=parseFloat(V1);
        const val2=parseFloat(V2);
        setRes(val1/val2);
    }

//Renderizado de nuestro componente
  return (
    <View style={styles.container}>
      <Header titulo='Calculadora Basica' 
      nombre='Luis Alberto Mendoza'
      imagen={require('../../assets/myAvatar.png')}/>
      <View>
        {/**Aqui va la calculadora */}
        <Text>Valor 1</Text>
        <TextInput placeholder='Valor 1'
        onChangeText={setV1}/>
        <Text>Valor 2</Text>
        <TextInput placeholder='Valor 2'
        onChangeText={(val)=>setV2(val)}/>
        <View>
            <Boton titulo='+' onPress={()=>{Suma()}}/>
            <Boton titulo='-' onPress={()=>{Resta()}}/>
            <Boton titulo='*' onPress={()=>{Multiplicacion()}}/>
            <Boton titulo='/' onPress={()=>{Division()}}/>
        </View>
        <Text>El resultado de la operacion es : {Res}</Text>
        <Text>valr 1 : {V1} y valor 2 : {V2}</Text>
      </View>
      <Foother fecha='14/02/2025' grupo='5B'/>
    </View>
  )
}

export default Calculadora

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }
})