import React, {useEffect, useState, useContext} from 'react';
import {
  Text, 
  Image, 
  View, 
  ScrollView, 
  SafeAreaView, 
  Button, 
  StyleSheet
  } from 'react-native';

import { getProduct } from '../services/ProductsService.js';
import { CartContext } from '../CartContext';

export function ProductDetails({route}) {
  const { productId,item } = route.params;
  console.log("item",item)
  const [product, setProduct] = useState({});
  
  const { addItemToCart,isLogin } = useContext(CartContext);
  
  useEffect(() => {
    setProduct([item]);
  },[]);
  
  function onAddToCart() {
    isLogin?
    addItemToCart(item):
    alert("please login")
    ;
  }
  
  return (
    <SafeAreaView>
      {product?.length >0 ?
      <ScrollView>
        <Image
          style={styles.image}
          source={{ uri: item.images[0]}}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.price}>$ {item.price}</Text>

          <Text style={styles.description}>{item.description}</Text>
            <Button
            onPress={onAddToCart}
            title="Add to cart"
            / >
        </View>
      </ScrollView>
      :<></>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  image: {
    height: 300,
    width: '100%'
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color:'black'
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color:'black'

  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 16,
  },
});
