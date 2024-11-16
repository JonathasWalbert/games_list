import { Text, StyleSheet, View } from 'react-native';


export default function CategoryGenres({data}) {

 return (
   <View style={styles.container}>
      <Text style={styles.title}>{data.name}</Text>
   </View>
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
    fontWeight: 'bold'
  }
})