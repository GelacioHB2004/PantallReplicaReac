import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Foother from '../../app-temp/Components/Foother';

const ProductoDetalle = () => {
  const { id } = useLocalSearchParams(); 
  interface Producto {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  }

  const [producto, setProducto] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProducto = async () => {
      setCargando(true);
      try {
        const respuesta = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!respuesta.ok) {
          throw new Error(`Error al obtener el producto: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        setProducto(datos);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProducto();
  }, [id]);

  if (cargando) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Cargando producto...</Text>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (!producto) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Producto no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: producto.image }} style={styles.imagen} />
        <Text style={styles.titulo}>{producto.title}</Text>
        <Text style={styles.descripcion}>{producto.category}</Text>
        <Text style={styles.precio}>Precio: ${producto.price}</Text>
        <Text style={styles.categoria}>Categoría: {producto.category}</Text>
      </View>

      <Foother fecha="20/02/2025" grupo="5B" />
    </View>
  );
};

export default ProductoDetalle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  descripcion: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  precio: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 5,
  },
  categoria: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
  },
  imagen: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});