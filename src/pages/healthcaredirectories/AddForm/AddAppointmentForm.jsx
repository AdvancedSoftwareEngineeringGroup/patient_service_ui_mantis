import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const AddAppointmentForm = () => {
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState({
    title: '',
    start: null,
    end: null
  });

  const handleChange = (field) => (value) => {
    setAppointmentData({ ...appointmentData, [field]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add logic to save the appointment data here.
    console.log('Appointment Data:', appointmentData);
    navigate('/appointments'); // Redirect back to AppointmentList
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Add Appointment
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={appointmentData.title}
            onChange={(e) => handleChange('title')(e.target.value)}
            sx={{ mb: 2 }}
          />
          <DateTimePicker
            label="Start Date & Time"
            value={appointmentData.start}
            onChange={handleChange('start')}
            renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
          />
          <DateTimePicker
            label="End Date & Time"
            value={appointmentData.end}
            onChange={handleChange('end')}
            renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
          />

          <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Save Appointment
          </Button>
        </form>
      </Box>
    </LocalizationProvider>
  );
};

export default AddAppointmentForm;
