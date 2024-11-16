import React, {useState, useEffect, useContext} from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, ActivityIndicator, Linking } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
const FAVORITES_KEY = '@favoritesAppGame';

import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

import CategoryGenres from '../../components/CategoryGenres';
import Platforms from '../../components/platforms';
import ModalDescription from '../../components/Modal';

import api from '../../services/api';

import { useNavigation } from '@react-navigation/native';

export default function Details( {route} ) {
  const navigation = useNavigation();
  const { slug } = route.params;

  const[infoGame, setInfoGame] = useState({});
  const[modalVisible, setModalVisible] = useState(false);
  const[loading, setLoading] = useState(true)

  useEffect(() => {

    async function getDetails(){
      await api.get(`games/${slug}?key=b595dd94557c46f7be447fb4efa796dd`)
      .then((res) => {
        setInfoGame(res.data);
        setLoading(false)
      }).catch((error) => {
        console.log(error)
      })
    }

    getDetails()

  },[])


  function handleCloseModal(){
    setModalVisible(!modalVisible)
  }

  async function handleLink(){
    let url = infoGame.website;

    const supported = await Linking.canOpenURL(url);

    if(supported){
      await Linking.openURL(url);
    }else{
      alert('Não é possivel abrir o link');
    }
  }

  async function handleFavorite(){
     try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
      const favoritesList = JSON.parse(favorites) || [];

      if (!favoritesList.some(game => game.id === infoGame.id)) {
        favoritesList.push(infoGame);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesList));
        alert('Item adicionado aos favoritos');
      } else {
        alert('O item já está na lista de favoritos');
      }
    } catch (error) {
      console.error('Erro ao adicionar aos favoritos:', error);
    }

};

 return (
  <SafeAreaView style={styles.container}>

    {loading ? (
       <ActivityIndicator size={30} color="#FFF" />
     ) : (
    
      <View style={{width: '100%', height: '100%'}}>

    <View style={{height: 200, width: '100%'}}>
    
      <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack() } >
        <Ionicons name="arrow-back" size={30} color="#FFF" />
      </TouchableOpacity>

          <TouchableOpacity style={styles.buttonFavorite} onPress={() => handleFavorite()} >
            <Feather name="bookmark" size={30} color="#FFF" />
          </TouchableOpacity>
    
      <Image source={{uri: `${infoGame.background_image_additional}`}} style={styles.logo} />

          <TouchableOpacity style={styles.buttonLink} onPress={() => handleLink()}>
           <Feather name="link" size={38} color="#FFF" />
          </TouchableOpacity>
    </View>

    <View style={styles.areaInfo}>
        <View style={styles.areaRating}>
          <AntDesign name="star" size={20} color="yellow" />
          <Text style={[styles.textInfo, {fontSize: 16}]}> {infoGame.rating}/5 </Text>
        </View>
        <Text style={[styles.textInfo, {fontSize: 20, fontWeight: 'bold'}]}>{infoGame.name} </Text>
    </View>

    <Text style={styles.titleDescription}>Genres</Text>


    <View style={styles.areaGenres}>
      <FlatList
        data={infoGame.genres}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => <CategoryGenres data={item} /> }
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{marginLeft: 10}}
      />
    </View>
    

    <Text style={styles.titleDescription}>Description </Text>
    <Text style={styles.description} numberOfLines={6} >{infoGame.description_raw} </Text>

    <TouchableOpacity style={styles.buttonDescription} onPress={() => setModalVisible(!modalVisible)}>
      <Text style={{color: '#FFF'}}>Read full description</Text>
    </TouchableOpacity>


    <Text style={{color: '#FFF', fontSize: 18, marginLeft: 10}}>Platforms</Text>

    <View>
      <FlatList
      data={infoGame.platforms}
      key={(item) => String(item.platform.id)}
      renderItem={({item}) => <Platforms data={item.platform} /> }
      numColumns={3}
      showsHorizontalScrollIndicator={false}
      style={{marginVertical: 10}}
      />
    </View>


    <Text style={{color: '#FFF', fontSize: 18, marginLeft: 10}}>Stores</Text>
    <View>
      <FlatList 
      data={infoGame.stores}
      key={(item) => String(item.id)}
      renderItem={({item}) => <Platforms data={item.store} />}
      numColumns={3}
      showsHorizontalScrollIndicator={false}
      style={{marginVertical: 10, marginEnd: 10, flexWrap: 'wrap'}}
      
     />
    </View>

   
      <ModalDescription data={infoGame} modalVisible={modalVisible} closeModal={()=> handleCloseModal() }/>
 
    </View>
       
     )}


  </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#050B18',
    alignItems: 'center',
    justifyContent: 'center'
  },
  areaInfo:{
    marginLeft: 10,
    marginTop: 12,
  },
  areaImage:{
    width: '100%',
    height: '100%'
  },
  areaRating:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  areaGenres:{
    marginTop: 8,
  },
  buttonBack:{
    position:'absolute',
    top: 0,
    left: 0,
    zIndex: 99,
    backgroundColor: '#000',
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginStart: 15
  },
  buttonFavorite:{
    position:'absolute',
    top: 0,
    right: 0,
    zIndex: 99,
    backgroundColor: '#000',
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginEnd: 15
  },
  buttonLink:{
    position: 'absolute',
    zIndex: 99,
    bottom: -25,
    right: 0,
    backgroundColor: '#FF455F',
    height: 70,
    width: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  textInfo:{
    color: '#FFF'
  },
  titleDescription:{
    fontSize: 18,
    color: '#FFF',
    marginLeft: 10,
    marginTop: 14,
    fontWeight: '500',
  },
  description:{
    color: '#FFF',
    marginLeft: 10,
    marginTop: 10,
    marginEnd: 10
  },
  logo:{
    width: '100%',
    height: '100%'
  },
  buttonDescription:{
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: '#0E5C88',
    height: 30,
    borderRadius: 4,
    marginLeft: 10,
    marginEnd: 10
  }
})