import { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';

import Games from '../../components/games';

import api from '../../services/api';

export default function GenresSearch( { route } ) {
  const { genresId } = route.params;

  const [gamesListGenres, setGamesListGenres] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    async function searchGenres(){
      await api.get(`/games?page_size=5&key=b595dd94557c46f7be447fb4efa796dd&genres=${genresId}`)
      .then((res) => {
        setGamesListGenres(res.data.results);
        setLoading(false);
      }).catch((error) => {
        console.log(error)
      })
    }

    searchGenres()

  },[])


 return ( 
  <SafeAreaView style={styles.container}>

    {loading ? (
      <ActivityIndicator size={'large'} color='#FFF' />
    ) : (
      <FlatList  
      data={gamesListGenres}
      keyExtractor={(item) => String(item.id)}
      renderItem={({item}) => <Games data={item} /> }
      />
    )}
      
</SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: '#050B18',
      justifyContent: 'center'
  }
})