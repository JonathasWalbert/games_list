import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
const FAVORITES_KEY = '@favoritesAppGame';

import Games from '../../components/games';


export default function Favorites() {
  const [gamesFavoritesList, setGamesFavoritesList] = useState([]);
  const [isTrue, setIsTrue] = useState(false); 

  useEffect(() => {
    setIsTrue(true);

    async function getListFavorites(){
      try {
        const favoritesData = await AsyncStorage.getItem(FAVORITES_KEY);
        const favoritesList = JSON.parse(favoritesData) || [];
        setGamesFavoritesList(favoritesList);
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    }
    
    getListFavorites()
    
  }, [])


  async function removeItemListGames(game){
    const removeGame = gamesFavoritesList.filter(item => item.id !== game.id)

    setGamesFavoritesList(removeGame);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(removeGame));
  }


 return (
   <SafeAreaView style={styles.container}>
      <FlatList
      data={gamesFavoritesList}
      keyExtractor={(item) => String(item.id)}
      renderItem={({item}) => ( <Games data={item} visible={isTrue} removeItemList={() => removeItemListGames(item)} /> ) }
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => <Text style={styles.empty}> Nenhum jogo favoritado... </Text>}/>
   </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#050B18',
  },
  empty:{
    textAlign: 'center',
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 20,
  },

})