import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { PatientService } from "../../utils/api";
import { PatientService } from 'utils/api';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Modal, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const HospitalsList = () => {
  const [hospitalData, setHospitalData] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState({});
  const [loading, setLoading] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [hospitalToDelete, setHospitalToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('use effect called');
    const fetchHospitals = async () => {
      try {
        // try to get the data from the api
        const data = await PatientService.getAllHospitals();
        setHospitalData(data);
      } catch (error) {
        console.log('Failed to fetch hospitals', error);
      }
    };

    fetchHospitals();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      editable: true
    },
    // { field: 'dob', headerName: 'Date of Birth', width: 110 },
    // { field: 'gender', headerName: 'Gender', width: 90 },
    // { field: 'physician_id', headerName: 'Physician ID', width: 110 },
    // {
    //   field: 'insurances',
    //   headerName: 'Insurance',
    //   width: 200,
    //   editable: true
    // },
    // { field: 'ssn', headerName: 'SSN', width: 130 },
    { field: 'address', headerName: 'Address', width: 200, editable: true },
    { field: 'city', headerName: 'City', width: 200, editable: true },
    { field: 'state', headerName: 'State', width: 200, editable: true },
    { field: 'zip', headerName: 'Zip-Code', width: 200, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleViewHospital(params.id)} color="primary">
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteHospital(params.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];

  const handleAddHospital = () => {
    navigate('/hospitals/add'); // Route to the Hospital intake form
  };
  const handleViewHospital = async (hospitalId) => {
    try {
      const hospitalDetails = await PatientService.getHospitalByHospitalId(hospitalId);
      setSelectedHospital(hospitalDetails);
      setOpenViewModal(true);
    } catch (error) {
      console.log('error loading selected hospital');
      setOpenViewModal(false);
    }
  };
  const handleDeleteHospital = (id) => {
    setHospitalToDelete(id);
    setOpenDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      await PatientService.deleteHospital(hospitalToDelete);
      const updatedHospitals = hospitalData.filter((hospital) => hospital.id !== hospitalToDelete);
      setHospitalData(updatedHospitals);
      setOpenDeleteModal(false);
      setLoading(false);
    } catch (error) {
      console.error('Failed to delete patient', error);
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
      await PatientService.updateHospital(newRow);
      const updatedRows = hospitalData.map((row) => (row.id === newRow.id ? newRow : row));
      setHospitalData(updatedRows);
      return newRow;
    } catch (error) {
      console.error('Error updating hospital', error);
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
        aria-label="add patient"
        component="span"
        onClick={handleAddHospital}
        style={{ position: 'absolute', right: 0, top: 100 }}
      >
        <AddCircleOutlineIcon />
        <Typography id="hospital-details-title" variant="h6" component="h2">
          Add Hospital
        </Typography>
      </IconButton>
      <DataGrid
        rows={hospitalData}
        columns={columns}
        pageSize={5}
        checkboxSelection
        processRowUpdate={handleProcessRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
      <Modal
        open={openViewModal}
        onClose={handleCloseModal}
        aria-labelledby="hospital-details-title"
        aria-describedby="hospital-details-description"
      >
        <Box sx={modalStyle}>
          <Typography id="hospital-details-title" variant="h6" component="h2">
            Hospital Details
          </Typography>
          {selectedHospital ? (
            <>
              <Typography id="hospital-details-description" sx={{ mt: 2 }}>
                Name: {selectedHospital.name}
              </Typography>
              {/* <Typography>Date of Birth: {selectedPatient.dob}</Typography>
              <Typography>Gender: {selectedPatient.gender}</Typography>
              <Typography>SSN: {selectedPatient.ssn}</Typography> */}
              <Typography>Address: {selectedHospital.address}</Typography>
              <Typography>City: {selectedHospital.city}</Typography>
              <Typography>State: {selectedHospital.state}</Typography>
              <Typography>Zip-Code: {selectedHospital.zip}</Typography>
              {/* <Typography>Insurances: {selectedPatient.Insurances}</Typography> */}
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
            Are you sure you want to delete this hospital?
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

export default HospitalsList;
