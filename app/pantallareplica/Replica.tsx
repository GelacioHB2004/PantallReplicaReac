import React from 'react'; 
import { View, Text, TouchableOpacity, Image, Switch, StyleSheet } from 'react-native';

const replica = () => {
  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.profileIcon} />
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerText}>Registrarse</Text>
          </TouchableOpacity>
          <Switch style={styles.switchButton} />
        </View>
      </View>

      {/* Opciones principales con imágenes */}
      <View style={styles.topOptions}>
        <View style={[styles.optionCard, { backgroundColor: '#FFDADA' }]}>
          <Image source={require('./img/eliminar.png')} style={styles.optionImage} />
          <Text style={styles.optionText}>Junk Clean</Text>
        </View>
        <View style={[styles.optionCard, { backgroundColor: '#D4F8E8' }]}>
          <Image source={require('./img/impulsar.png')} style={styles.optionImage} />
          <Text style={styles.optionText}>Impulsar</Text>
        </View>
      </View>

      {/* Opciones adicionales */}
      <View style={styles.gridContainer}>
        <View style={styles.grid}>
          {[
            { name: 'Mis archivos', image: require('./img/mis_archivos.png') },
            { name: 'Historia', image: require('./img/historia.png') },
            { name: 'Suscripción', image: require('./img/suscripcion.png') },
            { name: 'Compartir', image: require('./img/compartir.png') },
            { name: 'Playlist', image: require('./img/playlist.png') },
            { name: 'Me gusta', image: require('./img/me_gusta.png') },
            { name: 'Ajustes', image: require('./img/ajustes.png') },
            { name: 'Subir', image: require('./img/subir.png') },
            { name: 'Realimentación', image: require('./img/realimentacion.png') },
            { name: 'Ayuda', image: require('./img/ayuda.png') },
          ].map((item, index) => (
            <View key={index} style={styles.gridItem}>
              <Image source={item.image} style={styles.gridImage} />
              <Text style={styles.gridText}>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Menú inferior con imágenes */}
      <View style={styles.bottomMenu}>
        {[
          { name: 'CASA', image: require('./img/casa.png') },
          { name: 'MÚSICA', image: require('./img/musica.png') },
          { name: 'GAME', image: require('./img/game.png') },
          { name: 'MIS FICHEROS', image: require('./img/mis_archivos.png') },
          { name: 'YO', image: require('./img/yo.png') },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <Image source={item.image} style={styles.menuImage} />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8', padding: 10 },
  headerContainer: { marginTop: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  profileIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ccc' },
  registerButton: { backgroundColor: 'red', padding: 8, borderRadius: 5 },
  registerText: { color: 'white', fontWeight: 'bold' },
  switchButton: { transform: [{ scale: 1.2 }] },

  topOptions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  optionCard: { flex: 1, padding: 20, margin: 5, borderRadius: 10, alignItems: 'center' },
  optionImage: { width: 50, height: 50, marginBottom: 5 },  
  optionText: { fontSize: 16, fontWeight: 'bold' },

  gridContainer: { flex: 1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { 
    width: '30%', 
    padding: 10, 
    backgroundColor: 'white', 
    margin: 5, 
    borderRadius: 10, 
    alignItems: 'center' 
  },
  gridImage: { width: 40, height: 40, marginBottom: 5 },  
  gridText: { fontSize: 14, textAlign: 'center' },

  bottomMenu: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingVertical: 10, 
    backgroundColor: 'white', 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0 
  },
  menuItem: { alignItems: 'center' },
  menuImage: { width: 30, height: 30, marginBottom: 5 },
  menuText: { fontSize: 12, fontWeight: 'bold' }
});

export default replica;
