import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'


const data = () => {
    const {producto}= useLocalSearchParams();
    //convierte producto a json y guardalo en otra variable
    const productoJson = JSON.parse(producto+'');
  return (
    <View>
      <Text>detalles del producto : {productoJson.title} </Text>
    </View>
  )
}

export default data;

const styles = StyleSheet.create({})