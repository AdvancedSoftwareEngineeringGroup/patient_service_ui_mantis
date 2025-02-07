import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
// import Hospitals from 'pages/healthcaredirectories/Hospitals';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const Patients = Loadable(lazy(() => import('pages/healthcaredirectories/Lists/PatientsList')));
const AddPatients = Loadable(lazy(() => import('pages/healthcaredirectories/AddForm/AddPatientForm')));
const Physicians = Loadable(lazy(() => import('pages/healthcaredirectories/Lists/PhysiciansList')));
const AddPhysicians = Loadable(lazy(() => import('pages/healthcaredirectories/AddForm/AddPhysicianForm')));
const Nurses = Loadable(lazy(() => import('pages/healthcaredirectories/Lists/NursesList')));
const AddNurses = Loadable(lazy(() => import('pages/healthcaredirectories/AddForm/AddNurseForm')));
const Hospitals = Loadable(lazy(() => import('pages/healthcaredirectories/Lists/HospitalsList')));
const AddHospitals = Loadable(lazy(() => import('pages/healthcaredirectories/AddForm/AddHospitalForm')));
const Appointments = Loadable(lazy(() => import('pages/healthcaredirectories/Lists/AppointmentsList')));
const AddAppointments = Loadable(lazy(() => import('pages/healthcaredirectories/AddForm/AddAppointmentForm')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'patients',
      element: <Patients />
    },
    {
      path: 'patients/add',
      element: <AddPatients />
    },
    {
      path: 'physicians',
      element: <Physicians />
    },
    {
      path: 'physicians/add',
      element: <AddPhysicians />
    },
    {
      path: 'nurses',
      element: <Nurses />
    },
    {
      path: 'nurses/add',
      element: <AddNurses />
    },
    {
      path: 'hospitals',
      element: <Hospitals />
    },
    {
      path: 'hospitals/add',
      element: <AddHospitals />
    },
    {
      path: 'appointments',
      element: <Appointments />
    },
    {
      path: 'appointments/add',
      element: <AddAppointments />
    }
  ]
};

export default MainRoutes;
