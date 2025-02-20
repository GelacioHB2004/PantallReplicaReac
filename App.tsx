import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ActivityIndicator, Button} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <ActivityIndicator size={'large'} color={'pink'}/>
      <Text>Mayel se quedo atras</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
