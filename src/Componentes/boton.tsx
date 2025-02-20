import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"
import React from "react"

type props={
    titulo:string,
    onPress:()=>void,
    variante:'primario'|'secundario'|'peligro',
    estilo:StyleProp<ViewStyle>
    disable:boolean,
    icono:React.ReactNode
    posicionIcono:'izquierda'|'derecha'
}
const Boton =(props:props)=>{

    const getVariantes=()=>{
        switch(props.variante){
            case 'secundario':return styles.secundario;
            case 'peligro':return styles.peligro;
            default: return styles.primario
        }
    }
    return(
        <Pressable onPress={props.onPress}style={styles.boton}>
            <Text>Boton</Text>
            disable=(props.disable)
        </Pressable>
    )

}
export default Boton;

const styles=StyleSheet.create({
    boton:{
        backgroundColor:'#482E1E',
        color:'white'
    },
    primario:{

    },
    secundario:{

    },
    peligro:{

    }
})