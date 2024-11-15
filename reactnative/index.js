import { AppRegistry } from 'react-native';
import App from './src/App'; // Make sure this path matches your project structure
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
