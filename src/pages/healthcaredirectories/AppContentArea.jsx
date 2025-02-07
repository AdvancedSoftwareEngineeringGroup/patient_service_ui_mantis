import Box from '@mui/material/Box';
import React from 'react';
import SideList from './SideList';
import { appContentWrapper, flexColumnGrow, sideListWrapper } from '@styles/styles';

import Appointments from './Appointments';
import Patients from './Patients';
import Nurses from './Nurses';
import Hospitals from './Hospitals';
import Physicians from './Physicians';
import Home from './Home';
import AddPatientForm from './AddForm/AddPatientForm';
import AddPhysicianForm from './AddForm/AddPhysicianForm';
import AddNurseForm from './AddForm/AddNurseForm';
import AddHospitalForm from './AddForm/AddHospitalForm';
import AddAppointmentForm from './AddForm/AddAppointmentForm';

const AppContentArea = ({ isOpen }) => {
  const sideBarWidth = isOpen ? '70px' : '250px';

  return (
    <>
      <Box component="main" sx={appContentWrapper}>
        <Box
          component="div"
          sx={{
            flexBasis: sideBarWidth,
            flexGrow: 0,
            flexShrink: 0,
            overflowY: 'auto',
            ...sideListWrapper
          }}
        >
          <SideList />
        </Box>
        <Box component="div" sx={flexColumnGrow}>
          <Box
            sx={{
              my: 2,
              width: `calc(100vw - ${sideBarWidth})`
            }}
          >
            &nbsp;
          </Box>
          <Box
            component="div"
            sx={{
              display: 'block',
              p: 2,
              minHeight: '100px',
              mb: 4,
              overflow: 'hidden',
              overflowY: 'auto',
              width: `calc(100vw - ${sideBarWidth})`
            }}
          >
            <Appointments />
            <AddAppointmentForm />
            <Patients />
            <AddPatientForm />
            <Nurses />
            <Home />
            <Physicians />
            <AddPhysicianForm />
            <Hospitals />
            <AddHospitalForm />
            <AddNurseForm />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AppContentArea;
