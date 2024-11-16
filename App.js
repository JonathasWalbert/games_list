import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


import Routes from './src/routes/routes';

export default function App() {
  return (
    <NavigationContainer>
        <StatusBar barStyle='light-content' />
        <Routes />
    </NavigationContainer>
  );
}
