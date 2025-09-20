import { AppRegistry } from 'react-native';
import App from './App';

// Register the app
AppRegistry.registerComponent('HealthGamificationApp', () => App);

// Run the app
AppRegistry.runApplication('HealthGamificationApp', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
