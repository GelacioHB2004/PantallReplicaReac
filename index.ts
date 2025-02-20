import { registerRootComponent } from 'expo';

import App from './App';
import replica from './app/pantallareplica/Replica';
import calculadorapropinas from './src/Componentes/calculadorapropinas';
import calpropinas from './src/Componentes/calpropinas';


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(calpropinas);
