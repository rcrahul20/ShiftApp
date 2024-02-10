
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { CartContext } from '../CartContext';

export function CartIcon({navigation}) {
  const {getItemsCount,isLogin,setLogin} = useContext(CartContext);
  return (
    <>
   {!isLogin?
    <View style={styles.container}>
    <Text style={styles.text} 
     onPress={() => {
       navigation.navigate('Login');
     }}
   >Login </Text>
   </View>
   : <>
   <View style={styles.container}>
   <Text style={styles.text} 
    onPress={() => {
      setLogin(false);
    }}
  >Logout </Text>
  </View>
   <View style={styles.container}>
       
      <Text style={styles.text} 
        onPress={() => {
          navigation.navigate('Cart');
        }}
      >Cart ({getItemsCount()})</Text>
    </View></>
    }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    backgroundColor: 'orange',
    height: 48,
    padding: 12,
    borderRadius: 32 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
