import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

const ProductosPorCategoria = () => {
  const router = useRouter();
  const { categoria } = useLocalSearchParams(); //Obtiene la categoría desde la URL
  interface Producto {
    id: number;
    title: string;
    image: string;
  }
  
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!categoria) return; // Si no hay categoría, no hacer nada

    const obtenerProductos = async () => {
      setCargando(true);
      try {
        const respuesta = await fetch(`https://fakestoreapi.com/products/category/${categoria}`);
        if (!respuesta.ok) {
          throw new Error(`Error al obtener productos: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        setProductos(datos);
        setCargando(false);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    obtenerProductos();
  }, [categoria]); // Se ejecuta cuando cambia la categoría

  return (
    <View style={styles.container}>
      {cargando ? (
        <View style={styles.loadscreen}>
          <Text style={styles.titulo}>Cargando productos...</Text>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <FlatList
          data={productos}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/producto/${item.id}`)} // 📌 Navega al detalle del producto
            >
              <Image source={{ uri: item.image }} style={styles.imagen} />
              <Text style={styles.texto}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.flatlist}
        />
      )}
    </View>
  );
};

export default ProductosPorCategoria;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  loadscreen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  flatlist: { width: '100%' },
  card: {
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  texto: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  imagen: { height: 100, width: 100, marginBottom: 10 },
});