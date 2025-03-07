import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, useRouter } from 'expo-router';
import Boton from '../../app-temp/Components/Boton';

const Categorias = () => {
  const router = useRouter();
  const [categorias, setCategorias] = useState<string[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const obtenerCategorias = async () => {
      setCargando(true);
      try {
        const respuesta = await fetch('https://fakestoreapi.com/products/categories');
        if (!respuesta.ok) {
          throw new Error(`Error en la petición: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        setCategorias(datos);
        setCargando(false);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };
    obtenerCategorias();
  }, []);

  // Pantalla de Carga
  const LoadScreen = () => {
    return (
      <View style={styles.loadscreen}>
        <Text style={styles.titulo}>Cargando Categorías...</Text>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  };

  // Pantalla de Categorías
  const CategoriaItem = (categoria: string) => {
    return (
      <View style={styles.card}>
        <Text style={styles.texto}>{categoria}</Text>
        <Link href={`/categorias/${categoria}`} style={styles.link}>
          Ver Productos de {categoria}
        </Link>
        <Boton
          titulo={`Ver productos de ${categoria}`}
          onPress={() => router.push(`/categorias/${categoria}`)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {cargando ? (
        LoadScreen()
      ) : (
        <FlatList
          data={categorias}
          renderItem={({ item }) => CategoriaItem(item)}
          keyExtractor={(item) => item}
          style={styles.flatlist}
        />
      )}
    </View>
  );
};

export default Categorias;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadscreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  flatlist: {
    width: '100%',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  texto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  link: {
    fontSize: 20,
    color: 'blue',
    margin: 10,
  },
});
