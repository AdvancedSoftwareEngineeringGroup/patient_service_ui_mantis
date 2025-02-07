import { useLocation } from 'react-router-dom';
import HospitalsList from './Lists/HospitalsList';

const Hospitals = () => {
  const location = useLocation();

  if (location.pathname === '/hospitals') {
    return (
      <>
        <h1>Hospitals</h1>
        <Hospitals />
      </>
    );
  }
};

export default Hospitals;
