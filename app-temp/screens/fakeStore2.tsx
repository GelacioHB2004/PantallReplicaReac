import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Foother from '../Components/Foother'

const FakeStore2 = () => {
type producto={
        id?: number,
        title: string,
        price?: number,
        description: string,
        category?: string,
        image: string,
        rating?: {
            rate: number,
            count: number
        }
}
//estados productos, cargando
const [Productos,setProductos]=useState<producto[]>([]);
const [Cargando, setCargando]=useState<boolean>(true);

useEffect(()=>{
    const consultar= async ()=>{
        setCargando(true);
        try {
            //llamamos al API
            const respuesta= await fetch('https://fakestoreapi.com/products');
            //verificamos que no existan errores
            if(!respuesta.ok){
                //lanzamos un error y terminamos la funcion
                throw new Error('Error al realizar la peticion: ${respuesta.status}');
            }
            //ahora pasamos la respuesta a json
            const datos = await respuesta.json();
            //pasamos los datos al estado de productos para ya trabajar con el 
            setProductos(datos);
            console.log(datos);
            //pasamos el estado de cargando a falso para poder deplegar la pantalla 
            setCargando(false);
        } catch (error) {
            console.log('Error al obtener los dartos : ',error);
        }
    }
    consultar();
    //en esta funcion hacemos todo lo que tenega que ver con la llmada del API
},[]/**parametro vacio para que se ejecute solo una vez */)

//Pantalla renderItem
const ProductoItem=(props:producto)=>{
    return(
        <View style={styles.containerItem}>
            <Text>Producto : {props.title}</Text>
            <Text>Descripcion : {props.description}</Text>
            <Image source={{uri:props.image}} style={{height:100,width:100}}/>
        </View>
    )
}

//pantalla UnloadScreen
const UnloadScreen=()=>{
    return(
        <View>
            <Text>Cargando Datos...</Text>
            <ActivityIndicator/>
        </View>
    )
}

//pantalla LoadScreen
const LoadScreen=()=>{
    return(
        <View>
            <Text>Datos de la Tienda...</Text>
            <FlatList data={Productos}
            renderItem={({item})=><ProductoItem title={item.title} description={item.description} image={item.image}/>}
            keyExtractor={item => item.id?.toString() || Math.random().toString()}
            />
        </View>
    )
}

  return (
    <View style={styles.container}>
      <Header titulo='Lista de Productos' 
      nombre='MTI. Luis Alberto Mendoza'
      imagen={require('../../assets/guero.png')}/>

    {Cargando?UnloadScreen():LoadScreen()}

      <Foother fecha='21/02/2025' grupo='5B'/>
    </View>
  )
}

export default FakeStore2

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center'
    },
    containerItem:{
        backgroundColor:'#FF55',
        borderColor:'black',
        borderWidth:2,
        borderRadius:10
    }
})