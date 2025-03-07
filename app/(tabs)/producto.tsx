import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import Boton from '../../app-temp/Components/Boton'

const productoDetails = () => {
    
    const ruta=useRouter();
type producto={
        id: number,
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
        <View style={styles.card}>
            <Text>Producto : {props.title}</Text>
            <Text>Descripcion : {props.description}</Text>
            <Image source={{uri:props.image}} style={{height:100,width:100}}/>
            <Link href={'../productos/'+props.id} style={styles.link}>
                Ver Detalles...
            </Link>
            <Boton titulo='Ver Detalles...' onPress={()=>{
                ruta.push({
                    pathname:'../productos/[data]',
                    params:{'producto':JSON.stringify(props)}
                })
            }}/>
        </View>
    )
}

//pantalla UnloadScreen
const UnloadScreen=()=>{
    return(
        <View style={styles.loadscreen}>
            <Text style={styles.titulo}>Cargando Datos...</Text>
            <ActivityIndicator/>
        </View>
    )
}

//pantalla LoadScreen
const LoadScreen=()=>{
    return(
        <View style={styles.loadscreen}>
            <Text style={styles.titulo}>Datos de la Tienda...</Text>
            <Text style={styles.titulo}>Productos</Text>
            <FlatList data={Productos}
            renderItem={({item})=>
                <ProductoItem title={item.title} 
                description={item.description} 
                image={item.image}
                id={item.id}/>}
                keyExtractor={item => item.id?.toString() || Math.random().toString()}
            style={styles.flatlist}
            />
        </View>
    )
}

  return (
    <View style={styles.container}>
      
    
    {Cargando?UnloadScreen():LoadScreen()}

      
    </View>
  )
}

export default productoDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20
},
card: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
},
productImage: {
    height: 150,
    width: 150,
    borderRadius: 8,
    marginBottom: 10
},
productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5
},
productDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center'
},
link: {
    fontSize: 16,
    color: '#007BFF',
    marginVertical: 5,
    textDecorationLine: 'underline'
},
loadscreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20
},
flatlist: {
    width: '100%',
}
})