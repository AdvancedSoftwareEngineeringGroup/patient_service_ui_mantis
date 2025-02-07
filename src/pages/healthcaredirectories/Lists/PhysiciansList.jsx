import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PatientService } from 'utils/api';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Modal, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const PhysiciansList = () => {
  const [physicianData, setPhysicianData] = useState([]);
  const [selectedPhysician, setSelectedPhysician] = useState({});
  const [loading, setLoading] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [physicianToDelete, setPhysicianToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('use effect called');
    const fetchPhysicians = async () => {
      try {
        // try to get the data from the api
        const data = await PatientService.getAllPhysicians();
        setPhysicianData(data);
      } catch (error) {
        console.log('Failed to fetch phycisians', error);
      }
    };

    fetchPhysicians();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'first_name',
      headerName: 'First Name',
      width: 200,
      editable: true
    },
    { field: 'last_name', headerName: 'Last Name', width: 200, editable: true },
    {
      field: 'specialty',
      headerName: 'Specialty',
      width: 100,
      editable: true
    },
    { field: 'dob', headerName: 'Date of Birth', width: 110 },
    { field: 'gender', headerName: 'Gender', width: 90 },
    { field: 'physician_id', headerName: 'Physician ID', width: 110 },
    { field: 'ssn', headerName: 'SSN', width: 130 },
    { field: 'address', headerName: 'Address', width: 200, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleViewPhysician(params.id)} color="primary">
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleDeletePhysician(params.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];

  const handleAddPhysician = () => {
    navigate('/physicians/add'); // Route to the physician intake form
  };
  const handleViewPhysician = async (physicianId) => {
    try {
      const physicianDetails = await PatientService.getPhysicianByPhysicianId(physicianId);
      setSelectedPhysician(physicianDetails);
      setOpenViewModal(true);
    } catch (error) {
      console.log('error loading selected patient');
      setOpenViewModal(false);
    }
  };
  const handleDeletePhysician = (id) => {
    setPhysicianToDelete(id);
    setOpenDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      await PatientService.deletePhysician(physicianToDelete);
      const updatedPhysicians = physicianData.filter((physician) => physician.id !== physicianToDelete);
      setPhysicianData(updatedPhysicians);
      setOpenDeleteModal(false);
      setLoading(false);
    } catch (error) {
      console.error('Failed to delete physician', error);
      setLoading(false);
      setOpenDeleteModal(false);
    }
  };

  const handleCloseModal = () => {
    setOpenViewModal(false);
    setOpenDeleteModal(false);
  };

  const handleProcessRowUpdate = async (newRow) => {
    try {
      await PatientService.updatePhysician(newRow);
      const updatedRows = physicianData.map((row) => (row.id === newRow.id ? newRow : row));
      setPhysicianData(updatedRows);
      return newRow;
    } catch (error) {
      console.error('Error updating patient', error);
      return;
    }
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
    <div style={{ height: 400, width: '100%' }}>
      <IconButton
        color="primary"
        aria-label="add physician"
        component="span"
        onClick={handleAddPhysician}
        style={{ position: 'absolute', right: 0, top: 100 }}
      >
        <Typography id="physician-details-title" variant="h6" component="h2">
          Add Physician
        </Typography>
        <AddCircleOutlineIcon />
      </IconButton>
      <DataGrid
        rows={physicianData}
        columns={columns}
        pageSize={5}
        checkboxSelection
        processRowUpdate={handleProcessRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
      <Modal
        open={openViewModal}
        onClose={handleCloseModal}
        aria-labelledby="physician-details-title"
        aria-describedby="physician-details-description"
      >
        <Box sx={modalStyle}>
          <Typography id="physician-details-title" variant="h6" component="h2">
            Physician Details
          </Typography>
          {selectedPhysician ? (
            <>
              <Typography id="physician-details-description" sx={{ mt: 2 }}>
                Full Name: {selectedPhysician.full_name}
              </Typography>
              <Typography>Specialty: {selectedPhysician.specialty}</Typography>
              <Typography>Date of Birth: {selectedPhysician.dob}</Typography>
              <Typography>Gender: {selectedPhysician.gender}</Typography>
              <Typography>SSN: {selectedPhysician.ssn}</Typography>
              <Typography>Address: {selectedPhysician.address}</Typography>
            </>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Box>
      </Modal>

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
            Are you sure you want to delete this patient?
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-around' }}>
            <Button onClick={confirmDelete} color="error">
              Yes
            </Button>
            <Button onClick={() => setOpenDeleteModal(false)}>No</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PhysiciansList;
