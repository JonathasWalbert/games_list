import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../pages/Home";
import Details from "../pages/Details";
import Search from "../pages/Search";
import Favorites from "../pages/Favorites";
import GenresSearch from "../pages/GenresSearch";

const Stack = createNativeStackNavigator();

export default function Routes(){
  return(
    <Stack.Navigator>

      <Stack.Screen name="Home" component={Home} options={{headerShown: false}} /> 
      <Stack.Screen name="Details" component={Details} options={{headerShown: false}} /> 

      <Stack.Screen name="Search" component={Search} options={{
        headerStyle:{
          backgroundColor: '#050b18'
        },
        headerTintColor: '#FFF',
        headerBackTitle: '',
        title: ''
      }} /> 

      <Stack.Screen name="Favorites" component={Favorites}
      options={{
        headerStyle:{
          backgroundColor: '#050b18'
        },
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        title: 'My favorites',
        headerTitleAlign: 'left',
      }}
      /> 

      <Stack.Screen name='GenresSearch' component={GenresSearch}
      options={{
        headerStyle:{
          backgroundColor: '#050b18',
        },
        headerTitleStyle:{
          fontWeight: 'bold'
        },
        headerTintColor: '#FFF',
        title: '',
      }}
      />

    </Stack.Navigator>
  )
}