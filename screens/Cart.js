import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { CartContext } from '../CartContext';

export function Cart ({navigation}) {

  const {items, getItemsCount, getTotalPrice,removeItemToCart} = useContext(CartContext);

  console.log("items",items)
  function Totals() {
    let [total, setTotal] = useState(0);
    useEffect(() => {
      setTotal(getTotalPrice());
    });
    return (
       <View style={styles.cartLineTotal}>
          <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
          <Text style={styles.lineRight}>$ {total}</Text>
       </View>
    );
  }

  function renderItem({item}) {
    return (
       <>
       <View style={styles.cartLine}>
          <Text style={styles.lineLeft}>{item.itemList.title} x {item.qty}</Text>
          <Text style={styles.lineRight}>$ {item.totalPrice}</Text>
       </View>
       <TouchableOpacity onPress={()=>{removeItemToCart(item.itemList);}}>
       <Text style={[styles.lineLeft,{paddingLeft:10,color:'red'}]}>Remove</Text> 
       </TouchableOpacity>
       </>

    );
  }
  
  return (
    <FlatList
      style={styles.itemsList}
      contentContainerStyle={styles.itemsListContainer}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ListFooterComponent={Totals}
    />
  );
}

const styles = StyleSheet.create({
  cartLine: { 
    flexDirection: 'row',
  },
  cartLineTotal: { 
    flexDirection: 'row',
    borderTopColor: '#dddddd',
    borderTopWidth: 1
  },
  lineTotal: {
    fontWeight: 'bold',    
  },
  lineLeft: {
    fontSize: 20, 
    lineHeight: 40, 
    color:'#333333' 
  },
  lineRight: { 
    flex: 1,
    fontSize: 20, 
    fontWeight: 'bold',
    lineHeight: 40, 
    color:'#333333', 
    textAlign:'right',
  },
  itemsList: {
    backgroundColor: '#eeeeee',
  },
  itemsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
