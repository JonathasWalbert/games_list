import { View, StyleSheet, Text } from 'react-native';

export default function Platforms({data}) {
 return (
   <View style={styles.container}>
      <Text style={{color: '#FFF'}}>{data.name}</Text>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#0F172A',
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 4,
    paddingHorizontal: 8,
  }
})
