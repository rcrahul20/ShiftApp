// export default MyShiftsScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useShifts } from './ShiftContext';
import ShiftItem from './ShiftItem';

const MyShiftsScreen = () => {
  const { shifts, cancelShift } = useShifts();
  const [groupedShifts, setGroupedShifts] = useState([]);


  

  // Function to group shifts by day and calculate total shifts and total hours
  const groupShiftsByDay = () => {
    
    console.log(shifts)
    const groupedShifts = {};
  
    shifts.forEach((shift) => {
      
   if(shift.booked){  
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
          shifts: [shift],
          totalShifts: 1,
          totalHours: shiftDuration,
        };
      } else {
        groupedShifts[dateKey].shifts.push(shift);
        groupedShifts[dateKey].totalShifts += 1;
        groupedShifts[dateKey].totalHours += shiftDuration;
      }
    }
  }
    );
  
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
  
  
useEffect(() => {
  // Update shifts 
  const groupedShifts = groupShiftsByDay();
  setGroupedShifts(groupedShifts);

}, [shifts]);

  const renderItem = ({ item }) => (
    <View style={styles.dayContainer}>
       <View style={{flexDirection:"row",alignItems:'center',padding:8,backgroundColor:'#F1F4F8'}}> 
      <Text style={styles.dateHeader}>{item.date} </Text>
      <Text style={styles.totalShifts}> {item.totalShifts} Shifts , </Text>
      <Text style={styles.totalHours}> {item.totalHours} hr</Text>
      </View>
      <FlatList
        data={item.shifts}
        keyExtractor={(shift) => shift.id}
        renderItem={({ item }) => (
          <ShiftItem shift={item} onCancel={() => cancelShift(item.id)} />
        )}
      />
    </View>
  );

  return (
    groupedShifts.length > 0?
    <View style={styles.container}>
      <FlatList
        data={groupedShifts}
        keyExtractor={(item) => item.date}
        renderItem={renderItem}
      />
    </View>:
    <View style={styles.containerCenter}>
    <Text style={styles.centeredText}>
      Note: Please Book Shift From Available Shifts.
    </Text>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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

export default MyShiftsScreen;
