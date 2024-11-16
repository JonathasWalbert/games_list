import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Genres( {data} ) {
  const navigation = useNavigation();

  function handleGenresSearch(){
    navigation.setOptions({ title: `${data.name}`})
    navigation.navigate('GenresSearch', {genresId: data.id});
    
  }
  
 return (
   <TouchableOpacity style={styles.container} onPress={() => handleGenresSearch()} >
      <Text style={styles.title}>{data.name}</Text>
   </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container:{
    height: 30,
    backgroundColor: '#64748B',
    paddingHorizontal: 8,
    borderRadius: 8,
    marginRight: 8,
    justifyContent: 'center'
  },
  title:{
    color: '#FFF',
    fontSize: 14,
  }
})