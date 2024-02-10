// AvailableScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useShifts } from './ShiftContext';
import ShiftItem from './ShiftItem';
import ShiftItemAvailable from './ShiftItemAvailable';

const AvailableShiftsScreen = () => {
    const { shifts, cancelShift ,bookShift} = useShifts();
    const [groupedShifts,setGroupedShifts] = useState();

  const getUniqueAreas = () => {
    // Extract unique areas from shifts
    const uniqueAreas = Array.from(new Set(shifts.map((shift) => shift.area)));
    return uniqueAreas;
  };

  const filterShiftsByArea = (area) => {
    return shifts.filter((shift) => shift.area === area);
  };

  const uniqueAreas = getUniqueAreas();
  const defaultArea = uniqueAreas.length > 0 ? uniqueAreas[0] : null;

  const [selectedArea, setSelectedArea] = useState(defaultArea);
  const [shiftsInSelectedArea, setShiftsInSelectedArea] = useState([]);

  useEffect(() => {
    // Update shifts in the selected area when the selectedArea changes
    setShiftsInSelectedArea(filterShiftsByArea(selectedArea));
  }, [selectedArea , shifts]);

const renderItem = ({ item }) => (
    <View style={styles.dayContainer}>
       <View style={{flexDirection:"row",alignItems:'center',padding:8,backgroundColor:'#F1F4F8'}}> 
      <Text style={styles.dateHeader}>{item.date} </Text>
      </View>
      <FlatList
        data={item.shifts}
        keyExtractor={(shift) => shift.id}
        renderItem={({ item }) => (
          <ShiftItemAvailable shift={item} onCancel={() => cancelShift(item)} onBook={() => bookShift(item)}/>
        )}
      />
    </View>
  );
  useEffect(()=>{
    setGroupedShifts(groupShiftsByDay());

  },[shiftsInSelectedArea]) 

  const isShiftDisabled = (shift) => {
    // Replace this with your actual booked shifts data
    const bookedShifts = [];
  
    return bookedShifts.some((bookedShift) => {
      // Check for overlap between the current shift and booked shifts
      return shift.startTime < bookedShift.endTime && shift.endTime > bookedShift.startTime;
    });
  };
  

  // Function to group shifts by day and calculate total shifts and total hours
  const groupShiftsByDay = () => {
    const groupedShifts = {};
  
    shiftsInSelectedArea.forEach((shift) => {
      const shiftDate = new Date(shift.startTime);
      const currentDate = new Date();
      const dateKey = shiftDate.toLocaleDateString();
  
      const shiftDuration = (shift.endTime - shift.startTime) / (60 * 60 * 1000); // in hours
  
      if (!groupedShifts[dateKey]) {
        let formattedDate;
  
        if (shiftDate.toDateString() === currentDate.toDateString()) {
          formattedDate = 'Today';
        } else {
          const tomorrowDate = new Date(currentDate);
          tomorrowDate.setDate(currentDate.getDate() + 1);
  
          if (shiftDate.toDateString() === tomorrowDate.toDateString()) {
            formattedDate = 'Tomorrow';
          } else {
            formattedDate = shiftDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
          }
        }
  
        groupedShifts[dateKey] = {
          date: formattedDate,
          shifts: [{
            ...shift,
            disabled: isShiftDisabled(shift), // Set disabled key based on overlap with booked shifts
          }],
          totalShifts: 1,
          totalHours: shiftDuration,
        };
      } else {
        groupedShifts[dateKey].shifts.push({
          ...shift,
          disabled: isShiftDisabled(shift), // Set disabled key based on overlap with booked shifts
        });
        groupedShifts[dateKey].totalShifts += 1;
        groupedShifts[dateKey].totalHours += shiftDuration;
      }
    });
  
    const sortedShifts = Object.values(groupedShifts).sort((a, b) => {
      if (a.date === 'Today') return -1;
      if (b.date === 'Today') return 1;
      if (a.date === 'Tomorrow') return -1;
      if (b.date === 'Tomorrow') return 1;
      return new Date(a.date) - new Date(b.date);
    });
  
    return sortedShifts.map((data) => ({
      ...data,
      totalHours: data.totalHours.toFixed(0), // Round to two decimal places
    }));
  };
   
  

  return (
    <View style={styles.container}>
      {/* Area Selector */}
      <FlatList
        horizontal
        data={uniqueAreas}
        keyExtractor={(area) => area}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.areaItem,{borderColor:item === selectedArea ?'#004FB4':'#CBD2E1'}]}
            onPress={() => setSelectedArea(item)}
          >
            <Text style={[styles.areaText ,{color:item === selectedArea ?'#004FB4':'#CBD2E1'}]}>{item}</Text>
            <Text style={[styles.totalShiftsText,{color:item === selectedArea ?'#004FB4':'#CBD2E1'}]}>{'('+filterShiftsByArea(item).length+')'}</Text>
          </TouchableOpacity>
        )}
      />

      {/* List of Shifts in the Selected Area */}
      
      <Text style={styles.header}>My Shifts</Text>
      <FlatList
        data={groupedShifts}
        keyExtractor={(item) => item.date}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    areaItem: {
        padding: 10,
        borderRadius: 15,
        borderWidth:1,
        alignItems:'center',
        flexDirection:'row',
        height:48,
        margin:10  
    },
      areaText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      totalShiftsText: {
        paddingLeft: 6,
      },  shiftItem: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  shiftText: {
    fontSize: 14,
  },
  
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',

  },
  centeredText: {
    color: 'black',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  dayContainer: {
    marginBottom: 20,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#4F6C92',
    marginRight:4
  },
  totalShifts: {
    fontSize: 16,
    color:'#CBD2E1'
  },
  totalHours: {
    fontSize: 16,
    color:'#CBD2E1'

  },

});

export default AvailableShiftsScreen;
