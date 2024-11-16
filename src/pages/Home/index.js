import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, TextInput, Keyboard, ActivityIndicator } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import api from '../../services/api';

import { useNavigation } from '@react-navigation/native';

import Genres from '../../components/genres'
import Games from '../../components/games';


export default function Home() {
  const navigation = useNavigation();


  const [listGenres, setListGenres] = useState({});
  const [games, setGames] = useState({});
  const [gameSearchInput, setGameSearchInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function getGenres(){
      await api.get('/genres?key=b595dd94557c46f7be447fb4efa796dd')
      .then((res) => {
        setListGenres(res.data.results);
      setLoading(false);
      }).catch((error) => {
        console.log(error)
      })
    }

    async function getGames(){
      await api.get('games?page_size=5&key=b595dd94557c46f7be447fb4efa796dd')
      .then((res) => {
        setGames(res.data.results);
        setLoading(false);
      }).catch((error) => {
        console.log(error)
      })
    }

    getGenres()
    getGames()

  },[])

  function handleSearch(){

    if(gameSearchInput !== ''){
      navigation.setOptions({title: 'Search'})
      navigation.navigate('Search', {data: gameSearchInput});
      setGameSearchInput('');
      Keyboard.dismiss();
      return;
    }else
    alert('Digite o nome do jogo...');
  }


 return (
   <SafeAreaView style={styles.container}>
     <View style={styles.containerHeader}>
       <View style={{ flexDirection: "row" }}>
         <Text style={[styles.title, { color: "#FFF" }]}>Dev</Text>
         <Text style={[styles.title, { color: "#FF455F" }]}>Games</Text>
       </View>

       <TouchableOpacity
         style={styles.areaBtn}
         onPress={() => navigation.navigate("Favorites")}
       >
         <Feather name="bookmark" size={26} color="#FFF" />
       </TouchableOpacity>
     </View>

     <View style={styles.areaInput}>
       <TextInput
         style={styles.input}
         placeholder="Procurando por qual jogo ?"
         placeholderTextColor="#FFF"
         value={gameSearchInput}
         onChangeText={(text) => setGameSearchInput(text)}
       />
       <TouchableOpacity
         style={styles.buttonSearch}
         onPress={() => handleSearch()}
       >
         <Feather name="search" size={34} color="#FF455F" />
       </TouchableOpacity>
     </View>

     <View style={styles.areaListGenres}>
       {loading ? (
         <ActivityIndicator size={30} color="#FFF" />
       ) : (
         <FlatList
           data={listGenres}
           keyExtractor={(item) => String(item.id)}
           renderItem={({ item }) => <Genres data={item} />}
           style={styles.list}
           horizontal={true}
           showsHorizontalScrollIndicator={false}
         />
       )}
     </View>

     <Text style={styles.titleDescription}>Trending games</Text>

     {loading ? (
       <ActivityIndicator size={30} color="#FFF" />
     ) : (
       <FlatList
         data={games}
         keyExtractor={(item) => String(item.id)}
         renderItem={({ item }) => <Games data={item} />}
         showsVerticalScrollIndicator={false}
       />
     )}
   </SafeAreaView>
 );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#050B18',
  },
  containerHeader:{
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 8,
  },
  title:{
    fontSize: 32,
    fontWeight: 'bold'
  },
  areaBtn:{
    backgroundColor: '#1F2430',
    width: 45,
    height: 45,
    borderRadius: 45/2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaListGenres:{
    marginLeft: 10,
    marginTop: 12,
  },
  areaInput:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 18,
  },
  input:{
    height: 50,
    backgroundColor: '#1F2430',
    width: '85%',
    borderRadius: 22,
    padding: 12,
    fontSize: 18,
    color: '#FFF'
  },
  buttonSearch:{
    marginHorizontal: 8
  },
  titleDescription:{
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 18,
    fontSize: 20,
  }
})
