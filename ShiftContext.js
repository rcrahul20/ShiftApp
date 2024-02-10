// contexts/ShiftContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ShiftContext = createContext();

export const ShiftProvider = ({ children }) => {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    // Fetch shifts from the API
    axios.get('http://52.183.143.97:3000/shifts')
      .then(response => setShifts(response.data))
      .catch(error => console.error('Error fetching shifts', error));
  }, []);

  const bookShift = async (shiftDetails) => {
    console.log("bookshift1",shiftDetails)
    try {
      // Call your API to book the shift
  
      const response = await axios.post(`http://52.183.143.97:3000/shifts/${shiftDetails.id}/book`);
      console.log('respons1',response);
      if (!response.data.success) {
        // Handle the error
        console.log('Failed to book the shift');
        return;
      }
      // Update the state with the booked shift
      const updatedShifts = shifts.map((shift) =>
        shift.id === shiftDetails.id ? { ...shift, booked: true } : shift
      );
      setShifts(updatedShifts);
    } catch (error) {
      console.log('Error booking shift:', error);
    }
  };

  

  const cancelShift = async(shiftDetails) => {
    console.log('cancelshiftID',shiftDetails.id)

    // Implement the logic to cancel a shift by making a POST request to the API
    // Update the local state accordingly
    // Handle errors and validation

    try {
      // Call your API to book the shift
      console.log('respons1');
      const response = await axios.post(`http://52.183.143.97:3000/shifts/${shiftDetails.id}/cancel`);
      console.log('respons1',response);
   
      console.log('response',response);

      if (!response.data.success) {
        // Handle the error
        console.log('Failed to book the shift');
        return;
      }
      // Update the state with the booked shift
      const updatedShifts = shifts.map((shift) =>
        shift.id === shiftDetails.id ? { ...shift, booked: false } : shift
      );
      setShifts(updatedShifts);
    } catch (error) {
      console.log('Error booking shift:', error);
    }
 

  };

  const values = {
    shifts,
    bookShift,
    cancelShift,
  };

  return (
    <ShiftContext.Provider value={values}>
      {children}
    </ShiftContext.Provider>
  );
};

export const useShifts = () => {
  const context = useContext(ShiftContext);
  if (!context) {
    throw new Error('useShifts must be used within a ShiftProvider');
  }
  return context;
};
