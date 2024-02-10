import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const ShiftItem = ({ shift, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  useEffect(()=>{
    if(isLoading){
    setIsLoading(false)
    }
  },[shift])

  const onPress=(item)=>{
    // if(item.booked){
      setIsLoading(true)
      onCancel(item)
    // }
  
  }

  const startTime = formatTime(shift.startTime);
  const endTime = formatTime(shift.endTime);
// Convert the example date to a timestamp
const exampleDateTimestamp = new Date(new Date()).getTime();

// Check if the current time is greater than or equal to the example date timestamp
const isDateStarted = new Date().getTime() >= exampleDateTimestamp;

// Check if the current time is greater than or equal to the example timestamp
const isTimestampStarted = new Date().getTime() >= shift.startTime;
const isShiftStarted = isDateStarted && isTimestampStarted ;

  return (
    <View style={styles.shiftContainer}>
      <View style={styles.shiftDetails}>
        <Text style={styles.shiftTime}>{`${startTime} - ${endTime}`}</Text>
        <Text style={styles.shiftArea}>{shift.area}</Text>
      </View>
        <TouchableOpacity disabled={false} style={[styles.cancelButton,{borderColor: isShiftStarted?'#CBD2E1':'#E2006A'}]} onPress={()=>onPress(shift)}>
        {isLoading ? (
        <ActivityIndicator size="small" color={ isShiftStarted?'#CBD2E1':'#E2006A'} />
         ) :
          <Text style={[styles.buttonText,{color: isShiftStarted?'#CBD2E1':'#E2006A'}]}>Cancel</Text>
            }
          </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  shiftContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  shiftDetails: {
    flex: 1,
    flexDirection: 'column',
  },
  shiftTime: {
    fontSize: 16,
    color:'#4F6C92'
  },
  shiftArea: {
    fontSize: 14,
    color: '#CBD2E1',
  },
  cancelButton: {
    padding: 10,
    borderRadius: 15,
    borderWidth:1,
    width:90,
    alignItems:'center'

  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default ShiftItem;
