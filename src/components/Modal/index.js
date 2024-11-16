import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity, ScrollView, Modal } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

export default function ModalDescription( {data, closeModal, modalVisible} ) {
 return (
  
   <Modal
   animationType='slide'
   transparent={true}
   visible={modalVisible}
   >
    
    <View style={styles.container}>
      <View style={styles.areaModal}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
    

        <View style={styles.areaHeader}>
            <TouchableOpacity style={styles.buttonBack} onPress={closeModal}>
            <Ionicons name="arrow-back" size={40} color="#FFF" />
            </TouchableOpacity>

            <Text style={styles.title}>Description</Text>
        </View>

          <Text style={{color: '#FFF', marginTop: 12}}> {data.description_raw} </Text>

          </ScrollView>
        </View>
        
      </View>
   </Modal>
   
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  areaModal:{
    backgroundColor: '#0f172a',
    width: '100%',
    height: '100%',
    padding: 15,
  },
  areaHeader:{
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  title:{
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
    marginStart: 15,
  },
  buttonBack:{
    backgroundColor: '#000',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
    marginStart: 15,
  },
  scrollViewContent: {
    flexGrow: 1,
    marginTop: 12
  },
})