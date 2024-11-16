import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import AntDesign from '@expo/vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';



export default function Games( {data, visible, removeItemList} ) {
  const navigation = useNavigation();

  const[visibleButton, setVisibleButton] = useState(visible)

  function handleRemoveItem(){
    removeItemList()
  }

 return (
   <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Details', { slug: data.slug })} >

    {visibleButton ? (
      <TouchableOpacity style={styles.buttonTrash} onPress={() => handleRemoveItem()}>
      <Feather name="trash" size={28} color="#FFF" />
     </TouchableOpacity>
    ) : (<></>)}
      
    

    <Image source={{uri:`${data?.background_image}`}} style={styles.logo}
          resizeMode='stretch'
          />

      <View style={styles.areaBottom}>
        <Text style={styles.title}> {data.name} </Text>

        <View style={styles.areaRating}>
          <AntDesign name="star" size={20} color="yellow" />
          <Text style={styles.rating}> {data.rating}/5 </Text>
        </View>
      </View>

   </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container:{
    backgroundColor: '#FFF',
    height: 200,
    width: '100%',
    marginVertical: 10,
  },
  logo:{
    width: '100%',
    height: '100%',
  },
  title:{
    color: '#dfdfdf',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rating:{
    color: '#dfdfdf',
    fontSize: 16,
  },
  areaRating:{
    flexDirection: 'row',
    alignItems:'center',
  },
  areaBottom:{
    position: 'absolute',
    bottom: 8,
    marginLeft: 8,
  },
  buttonTrash:{
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#FF455F',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 99,
    top:15,
    right:15,
  }
})