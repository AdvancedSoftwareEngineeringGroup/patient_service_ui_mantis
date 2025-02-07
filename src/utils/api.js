import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_APP_API_URL;

const PatientService = {
  //  --------------   patient  ----------------------------------------------//
  getAllPatients: async () => {
    const { data } = await axios.request({
      url: `${BASE_URL}/patients`
    });

    const patientsList = data.map((patient) => {
      return {
        ...patient,
        full_name: patient.first_name + ' ' + patient.last_name
      };
    });

    return patientsList;
  },
  getPatientByPatientId: async (patientId) => {
    console.log('getPatientByPatientId:: ', patientId);
    try {
      const { data } = await axios.get(`${BASE_URL}/patients/${patientId}`);
      return {
        ...data,
        full_name: data.first_name + ' ' + data.last_name
      };
    } catch (error) {}
  },
  updatePatient: async (patient) => {
    try {
      const { data } = await axios.patch(`${BASE_URL}/patients/${patient.id}`, patient);
      return data;
    } catch (error) {}
  },
  deletePatient: async (patientId) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/patients/${patientId}`);
      return data;
    } catch (error) {}
  },
  createPatient: async (patient) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/patients`, patient);
      return data;
    } catch (error) {}
  },

  // -------- physicians ------------------------------------------------------------------------------//
  getAllPhysicians: async () => {
    const { data } = await axios.request({
      url: `${BASE_URL}/physicians`
    });

    const physiciansList = data.map((physician) => {
      return {
        ...physician,
        full_name: physician.first_name + ' ' + physician.last_name
      };
    });

    return physiciansList;
  },
  getPhysicianByPhysicianId: async (physicianId) => {
    console.log('getPhysicianByPhysicianId:: ', physicianId);
    try {
      const { data } = await axios.get(`${BASE_URL}/physicians/${physicianId}`);
      return {
        ...data,
        full_name: data.first_name + ' ' + data.last_name
      };
    } catch (error) {}
  },
  updatePhysician: async (physician) => {
    try {
      const { data } = await axios.patch(`${BASE_URL}/physicians/${physician.id}`, physician);
      return data;
    } catch (error) {}
  },
  deletePhysician: async (physicianId) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/physicians/${physicianId}`);
      return data;
    } catch (error) {}
  },
  createPhysician: async (physician) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/physicians`, physician);
      return data;
    } catch (error) {}
  },

  //----- nurses ------------------------------------------------------------------------------- //
  getAllNurses: async () => {
    const { data } = await axios.request({
      url: `${BASE_URL}/nurses`
    });

    const nursesList = data.map((nurse) => {
      return {
        ...nurse,
        full_name: nurse.first_name + ' ' + nurse.last_name
      };
    });

    return nursesList;
  },
  getNurseByNurseId: async (nurseId) => {
    console.log('getNurseByNurseId:: ', nurseId);
    try {
      const { data } = await axios.get(`${BASE_URL}/nurses/${nurseId}`);
      return {
        ...data,
        full_name: data.first_name + ' ' + data.last_name
      };
    } catch (error) {}
  },
  updateNurse: async (nurse) => {
    try {
      const { data } = await axios.patch(`${BASE_URL}/nurses/${nurse.id}`, nurse);
      return data;
    } catch (error) {}
  },
  deleteNurse: async (nurseId) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/nurses/${nurseId}`);
      return data;
    } catch (error) {}
  },
  createNurse: async (nurse) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/nurses`, nurse);
      return data;
    } catch (error) {}
  },

  // hospital  -----------------------------------------------------------------------------------//
  getAllHospitals: async () => {
    const { data } = await axios.request({
      url: `${BASE_URL}/hospitals`
    });

    const hospitalsList = data.map((hospital) => {
      return {
        ...hospital,
        full_name: hospital.name
      };
    });

    return hospitalsList;
  },
  getHospitalByHospitalId: async (hospitalId) => {
    console.log('getHospitalByHospitalId:: ', hospitalId);
    try {
      const { data } = await axios.get(`${BASE_URL}/hospitals/${hospitalId}`);
      return {
        ...data,
        full_name: data.name
      };
    } catch (error) {}
  },
  updateHospital: async (hospital) => {
    try {
      const { data } = await axios.patch(`${BASE_URL}/hospitals/${hospital.id}`, hospital);
      return data;
    } catch (error) {}
  },
  deleteHospital: async (hospitalId) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/hospitals/${hospitalId}`);
      return data;
    } catch (error) {}
  },
  createHospital: async (hospital) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/hospitals`, hospital);
      return data;
    } catch (error) {}
  }

  // appointments  -----------------------------
  // getAllAppointments: async () => {
  //   const { data } = await axios.request({
  //     url: `${BASE_URL}/appointments`
  //   });

  //   const appointmentsList = data.map((appointment) => {
  //     return {
  //       ...appointment,
  //       full_title: appointment.title, // Example of computed property, adjust as needed
  //     };
  //   });

  //   return appointmentsList;
  // },

  // getAppointmentById: async (appointmentId) => {
  //   console.log('getAppointmentById:: ', appointmentId);
  //   try {
  //     const { data } = await axios.get(`${BASE_URL}/appointments/${appointmentId}`);
  //     return {
  //       ...data,
  //       full_title: data.title, // Example of computed property
  //     };
  //   } catch (error) {
  //     console.error('Failed to fetch appointment by ID', error);
  //   }
  // },

  // updateAppointment: async (appointment) => {
  //   try {
  //     const { data } = await axios.patch(`${BASE_URL}/appointments/${appointment.id}`, appointment);
  //     return data;
  //   } catch (error) {
  //     console.error('Failed to update appointment', error);
  //   }
  // },

  // deleteAppointment: async (appointmentId) => {
  //   try {
  //     const { data } = await axios.delete(`${BASE_URL}/appointments/${appointmentId}`);
  //     return data;
  //   } catch (error) {
  //     console.error('Failed to delete appointment', error);
  //   }
  // },

  // createAppointment: async (appointment) => {
  //   try {
  //     const { data } = await axios.post(`${BASE_URL}/appointments`, appointment);
  //     return data;
  //   } catch (error) {
  //     console.error('Failed to create appointment', error);
  //   }
  // }
};

export { PatientService };
