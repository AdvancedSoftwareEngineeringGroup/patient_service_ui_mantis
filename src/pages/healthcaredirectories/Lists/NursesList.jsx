import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { PatientService } from "../../utils/api";
import { PatientService } from 'utils/api';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Modal, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const NursesList = () => {
  const [nurseData, setNurseData] = useState([]);
  const [selectedNurse, setSelectedNurse] = useState({});
  const [loading, setLoading] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [nurseToDelete, setPatientToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('use effect called');
    const fetchNurses = async () => {
      try {
        // try to get the data from the api
        const data = await PatientService.getAllNurses();
        setNurseData(data);
      } catch (error) {
        console.log('Failed to fetch nurses', error);
      }
    };

    fetchNurses();
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
          <IconButton onClick={() => handleViewNurse(params.id)} color="primary">
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteNurse(params.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];

  const handleAddNurse = () => {
    navigate('/nurses/add'); // Route to the nurse intake form
  };
  const handleViewNurse = async (nurseId) => {
    try {
      const nurseDetails = await PatientService.getNurseByNurseId(nurseId);
      setSelectedNurse(nurseDetails);
      setOpenViewModal(true);
    } catch (error) {
      console.log('error loading selected nurse');
      setOpenViewModal(false);
    }
  };
  const handleDeleteNurse = (id) => {
    setNurseToDelete(id);
    setOpenDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      await PatientService.deleteNurse(nurseToDelete);
      const updatedNurses = nurseData.filter((nurse) => nurse.id !== nurseToDelete);
      setNurseData(updatedNurses);
      setOpenDeleteModal(false);
      setLoading(false);
    } catch (error) {
      console.error('Failed to delete nurse', error);
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
      await PatientService.updateNurse(newRow);
      const updatedRows = nurseData.map((row) => (row.id === newRow.id ? newRow : row));
      setNurseData(updatedRows);
      return newRow;
    } catch (error) {
      console.error('Error updating nurse', error);
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
        aria-label="add nurse"
        component="span"
        onClick={handleAddNurse}
        style={{ position: 'absolute', right: 0, top: 100 }}
      >
        <Typography id="nurse-details-title" variant="h6" component="h2">
          Add Nurse
        </Typography>
        <AddCircleOutlineIcon />
      </IconButton>
      <DataGrid
        rows={nurseData}
        columns={columns}
        pageSize={5}
        checkboxSelection
        processRowUpdate={handleProcessRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
      <Modal
        open={openViewModal}
        onClose={handleCloseModal}
        aria-labelledby="nurse-details-title"
        aria-describedby="nurse-details-description"
      >
        <Box sx={modalStyle}>
          <Typography id="nurse-details-title" variant="h6" component="h2">
            Nurse Details
          </Typography>
          {selectedNurse ? (
            <>
              <Typography id="nurse-details-description" sx={{ mt: 2 }}>
                Full Name: {selectedNurse.full_name}
              </Typography>
              <Typography>Date of Birth: {selectedNurse.dob}</Typography>
              <Typography>Gender: {selectedNurse.gender}</Typography>
              <Typography>SSN: {selectedNurse.ssn}</Typography>
              <Typography>Address: {selectedNurse.address}</Typography>
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
            Are you sure you want to delete this nurse?
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

export default NursesList;
