// project import
import dashboard from './dashboard';
import pages from './page';
import utilities from './utilities';
import support from './support';
import healthcaredirectories from './healthcaredirectories';
import Patients from 'pages/healthcaredirectories/Patients';
import Physicians from 'pages/healthcaredirectories/Physicians';
import PatientsList from 'pages/healthcaredirectories/Lists/PatientsList';
import PhysiciansList from 'pages/healthcaredirectories/Lists/PhysiciansList';
import Nurses from 'pages/healthcaredirectories/Nurses';
import NursesList from 'pages/healthcaredirectories/Lists/NursesList';
import Hospitals from 'pages/healthcaredirectories/Hospitals';
import HospitalsList from 'pages/healthcaredirectories/Lists/HospitalsList';
import Appointments from 'pages/healthcaredirectories/Appointments';
import AppointmentsList from 'pages/healthcaredirectories/Lists/AppointmentsList';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [
    dashboard,
    healthcaredirectories,
    pages,
    utilities,
    support,
    Patients,
    Physicians,
    PatientsList,
    PhysiciansList,
    Nurses,
    NursesList,
    Hospitals,
    HospitalsList,
    Appointments,
    AppointmentsList
  ]
};

export default menuItems;
