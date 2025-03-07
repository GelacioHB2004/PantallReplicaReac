import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../Components/Header'
import Foother from '../Components/Foother'
import Boton from '../Components/Boton'

const FakeStore = () => {

    type producto={
        id: number,
        title: string,
        price: number,
        description: string,
        category: string,
        image: string,
        rating: {
            rate: number,
            count: number
        }
    }

    const [Product,setProduct]=useState<producto>();
    const [loading,setLoading]=useState<boolean>(true);

    //pantalla unload
    const UnLoadScreen=()=>{
        return(
            <View>
                <Text>Esperando Datos...</Text>
                <ActivityIndicator/>
                <Boton titulo='Cargar datos...' 
                onPress={()=>{Consultar()}}/>
            </View>
        )
    }

    //pantalla con datos cargados
    const LoadScreen=()=>{
        return(
            <View>
                <Text>Datos Cargados...</Text>
                <Text>Producto : {Product?.title}</Text>
                <Text>Precio : ${Product?.price}</Text>
                <Text>Descripcion : {Product?.description}</Text>
                <Image source={{uri:Product?.image}} style={{width:200,height:200}}/>
            </View>
        )
    }

    const Consultar= async ()=>{
        setLoading(true);
        try {
            const respuesta= await fetch('https://fakestoreapi.com/products/1');
            
            //preguntamos si no quiso diosito
            if(!respuesta.ok){
                throw new Error ('Problema al obtener datos : ${respuesta.status}');
            }
            //si si quiso pasamos la respuesta a json
            const datos= await respuesta.json();
            //guardamos los datos en el estado product
            setProduct(datos);
            setLoading(false);
        } catch (error) {
            console.log('Ocurrio un error al consultar los datos....',error);
        }

    }

  return (
    <View style={styles.container}>
        <Header titulo='Fake Store...' 
        nombre='MTI. Luis Alberto Mendoza'
        imagen={require('../../assets/icon.png')}/>

        {loading?UnLoadScreen():LoadScreen()}

      <Foother fecha='20/02/2025' grupo='5B'/>
    </View>
  )
}

export default FakeStore

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-between',
    }
})