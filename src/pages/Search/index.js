import { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import Games from '../../components/games/'
import api from '../../services/api';

export default function Search( {route} ) {
  const { data } = route.params;

  const[gameSearched, setGameSearched] = useState({});
  const[loading, setLoading] = useState(true);
 
  useEffect(() => {
    async function searchGame(){
        await api.get(`/games?page_size=5&key=b595dd94557c46f7be447fb4efa796dd&search=${data}`)
        .then((res) => {
          if(res !== null){
            setGameSearched(res.data.results);
            setLoading(false);
          }
        }).catch((error) => {
          console.log(error)
          setLoading(false)
        })
    }

    searchGame();
 
  },[])

  


 return (
   <SafeAreaView style={styles.container}>
     {loading ? (
       <ActivityIndicator size={"large"} color="#FFF" />
     ) : (
       <FlatList
         data={gameSearched}
         keyExtractor={(item) => String(item.id)}
         renderItem={({ item }) => <Games data={item} />}
         ListEmptyComponent={() => <Text>Nenhum jogo encontrado...</Text>}
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