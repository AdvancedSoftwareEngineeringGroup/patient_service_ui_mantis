// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { PatientService } from 'utils/api';
// import { DataGrid } from '@mui/x-data-grid';
// import { Button, IconButton, Modal, Box, Typography } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// const AppointmentsList = () => {
//   const [appointmentData, setAppointmentData] = useState([]);
//   const [selectedAppointment, setSelectedAppointment] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [openViewModal, setOpenViewModal] = useState(false);
//   const [openDeleteModal, setOpenDeleteModal] = useState(false);
//   const [appointmentToDelete, setAppointmentToDelete] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log('use effect called');
//     const fetchAppointments = async () => {
//       try {
//         const data = await PatientService.getAllAppointments();
//         setAppointmentData(data);
//       } catch (error) {
//         console.log('Failed to fetch appointments', error);
//         setAppointmentData([]);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     {
//       field: 'title',
//       headerName: 'Title',
//       width: 200,
//       editable: true
//     },
//     {
//       field: 'date',
//       headerName: 'Date',
//       width: 150,
//       editable: true
//     },
//     {
//       field: 'time',
//       headerName: 'Time',
//       width: 120,
//       editable: true
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       sortable: false,
//       width: 150,
//       renderCell: (params) => (
//         <>
//           <IconButton onClick={() => handleViewAppointment(params.id)} color="primary">
//             <VisibilityIcon />
//           </IconButton>
//           <IconButton onClick={() => handleDeleteAppointment(params.id)} color="error">
//             <DeleteIcon />
//           </IconButton>
//         </>
//       )
//     }
//   ];

//   const handleAddAppointment = () => {
//     navigate('/appointments/add'); // Route to the Add Appointment form
//   };

//   const handleViewAppointment = async (appointmentId) => {
//     try {
//       const appointmentDetails = await PatientService.getAppointmentByAppointmentId(appointmentId);
//       setSelectedAppointment(appointmentDetails);
//       setOpenViewModal(true);
//     } catch (error) {
//       console.log('Error loading selected appointment');
//       setOpenViewModal(false);
//     }
//   };

//   const handleDeleteAppointment = (id) => {
//     setAppointmentToDelete(id);
//     setOpenDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       setLoading(true);
//       await PatientService.deleteAppointment(appointmentToDelete);
//       const updatedAppointments = appointmentData.filter((appointment) => appointment.id !== appointmentToDelete);
//       setAppointmentData(updatedAppointments);
//       setOpenDeleteModal(false);
//       setLoading(false);
//     } catch (error) {
//       console.error('Failed to delete appointment', error);
//       setLoading(false);
//       setOpenDeleteModal(false);
//     }
//   };

//   const handleCloseModal = () => {
//     setOpenViewModal(false);
//     setOpenDeleteModal(false);
//   };

//   const handleProcessRowUpdate = async (newRow) => {
//     try {
//       await PatientService.updateAppointment(newRow);
//       const updatedRows = appointmentData.map((row) => (row.id === newRow.id ? newRow : row));
//       setAppointmentData(updatedRows);
//       return newRow;
//     } catch (error) {
//       console.error('Error updating appointment', error);
//       return;
//     }
//   };

//   const modalStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4
//   };

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <IconButton
//         color="primary"
//         aria-label="add appointment"
//         component="span"
//         onClick={handleAddAppointment}
//         style={{ position: 'absolute', right: 0, top: 100 }}
//       >
//         <Typography id="appointment-details-title" variant="h6" component="h2">
//           Add Appointment
//         </Typography>
//         <AddCircleOutlineIcon />
//       </IconButton>
//       <DataGrid
//         rows={appointmentData}
//         columns={columns}
//         pageSize={5}
//         checkboxSelection
//         processRowUpdate={handleProcessRowUpdate}
//         experimentalFeatures={{ newEditingApi: true }}
//       />
//       <Modal
//         open={openViewModal}
//         onClose={handleCloseModal}
//         aria-labelledby="appointment-details-title"
//         aria-describedby="appointment-details-description"
//       >
//         <Box sx={modalStyle}>
//           <Typography id="appointment-details-title" variant="h6" component="h2">
//             Appointment Details
//           </Typography>
//           {selectedAppointment ? (
//             <>
//               <Typography id="appointment-details-description" sx={{ mt: 2 }}>
//                 Title: {selectedAppointment.title}
//               </Typography>
//               <Typography>Date: {selectedAppointment.date}</Typography>
//               <Typography>Time: {selectedAppointment.time}</Typography>
//               <Typography>Notes: {selectedAppointment.notes}</Typography>
//             </>
//           ) : (
//             <Typography>Loading...</Typography>
//           )}
//         </Box>
//       </Modal>

//       <Modal
//         open={openDeleteModal}
//         onClose={() => setOpenDeleteModal(false)}
//         aria-labelledby="delete-confirmation-title"
//         aria-describedby="delete-confirmation-description"
//       >
//         <Box sx={modalStyle}>
//           <Typography id="delete-confirmation-title" variant="h6" component="h2">
//             Confirm Deletion
//           </Typography>
//           <Typography id="delete-confirmation-description" sx={{ mt: 2 }}>
//             Are you sure you want to delete this appointment?
//           </Typography>
//           <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-around' }}>
//             <Button onClick={confirmDelete} color="error">
//               Yes
//             </Button>
//             <Button onClick={() => setOpenDeleteModal(false)}>No</Button>
//           </Box>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default AppointmentsList;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PatientService } from 'utils/api';
import { Button, IconButton, Modal, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const AppointmentsList = () => {
  const [appointmentData, setAppointmentData] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [loading, setLoading] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await PatientService.getAllAppointments();
        setAppointmentData(data);
      } catch (error) {
        console.log('Failed to fetch appointments', error);
        setAppointmentData([]);
      }
    };

    fetchAppointments();
  }, []);

  // Format data for react-big-calendar
  const events = appointmentData.map((appointment) => ({
    id: appointment.id,
    title: appointment.title,
    start: new Date(appointment.date + ' ' + appointment.time),
    end: new Date(appointment.date + ' ' + appointment.time)
  }));

  const handleAddAppointment = () => {
    navigate('/appointments/add'); // Route to the Add Appointment form
  };

  const handleViewAppointment = async (appointmentId) => {
    try {
      const appointmentDetails = await PatientService.getAppointmentByAppointmentId(appointmentId);
      setSelectedAppointment(appointmentDetails);
      setOpenViewModal(true);
    } catch (error) {
      console.log('Error loading selected appointment');
      setOpenViewModal(false);
    }
  };

  const handleDeleteAppointment = (id) => {
    setAppointmentToDelete(id);
    setOpenDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      await PatientService.deleteAppointment(appointmentToDelete);
      const updatedAppointments = appointmentData.filter((appointment) => appointment.id !== appointmentToDelete);
      setAppointmentData(updatedAppointments);
      setOpenDeleteModal(false);
      setLoading(false);
    } catch (error) {
      console.error('Failed to delete appointment', error);
      setLoading(false);
      setOpenDeleteModal(false);
    }
  };

  const handleCloseModal = () => {
    setOpenViewModal(false);
    setOpenDeleteModal(false);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Title and Add Appointment Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ flex: 1 }}>
          Appointment List
        </Typography>
        <IconButton
          color="primary"
          aria-label="add appointment"
          component="span"
          onClick={handleAddAppointment}
          sx={{
            '@media (max-width:600px)': {
              position: 'relative' // Prevents overflow for smaller screens
            },
            '@media (min-width:600px)': {
              position: 'relative' // Keeps the button aligned
            },
            px: 8
          }}
        >
          <AddCircleOutlineIcon />
          <Typography id="hospital-details-title" variant="h6" component="h2">
            Add Appointment
          </Typography>
        </IconButton>
      </Box>

      {/* Calendar */}
      <div style={{ height: '80vh' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectEvent={(event) => handleViewAppointment(event.id)} // When an event is clicked
          onSelectSlot={(slotInfo) => console.log(slotInfo)} // Optional: Handle slot selection
        />
      </div>

      {/* Appointment View Modal */}
      <Modal
        open={openViewModal}
        onClose={handleCloseModal}
        aria-labelledby="appointment-details-title"
        aria-describedby="appointment-details-description"
      >
        <Box sx={modalStyle}>
          <Typography id="appointment-details-title" variant="h6" component="h2">
            Appointment Details
          </Typography>
          {selectedAppointment ? (
            <>
              <Typography id="appointment-details-description" sx={{ mt: 2 }}>
                Title: {selectedAppointment.title}
              </Typography>
              <Typography>Date: {selectedAppointment.date}</Typography>
              <Typography>Time: {selectedAppointment.time}</Typography>
              <Typography>Notes: {selectedAppointment.notes}</Typography>
            </>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Box>
      </Modal>

      {/* Appointment Deletion Modal */}
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        aria-labelledby="delete-confirmation-title"
        aria-describedby="delete-confirmation-description"
      >
        <Box sx={modalStyle}>
          <Typography id="delete-confirmation-title" variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography id="delete-confirmation-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this appointment?
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-around' }}>
            <Button onClick={confirmDelete} color="error">
              Yes
            </Button>
            <Button onClick={() => setOpenDeleteModal(false)}>No</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AppointmentsList;
