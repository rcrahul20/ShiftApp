import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const ShiftItemAvailable = ({ shift, onCancel ,onBook }) => {
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
    console.log("item",item);
    if(item.booked){
      setIsLoading(true)
      onCancel(item)
    }else{
      setIsLoading(true)
      onBook(item)

    }


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
        {shift.booked || shift.disabled? <Text style={[styles.shiftArea,{color:shift.disabled ?'#E2006A':'#CBD2E1'}]}>{shift.disabled ? 'Overlapping' :'Booked'}</Text>
        :null}
      </View>
 
        <TouchableOpacity disabled={isShiftStarted || shift.disabled} style={[styles.cancelButton,{borderColor: isShiftStarted || shift.disabled?'#CBD2E1': !shift.booked  ?'#16A64D':'#E2006A'}]} onPress={()=>onPress(shift)}>
        {isLoading ? (
        <ActivityIndicator size="small" color={ isShiftStarted || shift.disabled?'#CBD2E1': !shift.booked  ?'#16A64D':'#E2006A'} />
         ) :
          <Text style={[styles.buttonText,{color: isShiftStarted || shift.disabled ?'#CBD2E1': !shift.booked ?'#16A64D':'#E2006A'}]}>{!shift.booked || shift.disabled ?'Book':'Cancel'}</Text>
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
    flexDirection: 'row',
  },
  shiftTime: {
    fontSize: 16,
    color:'#4F6C92',
    flex:.8
  },
  shiftArea: {
    fontSize: 16,
    color: '#CBD2E1',
    fontWeight:'bold'
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

export default ShiftItemAvailable;
