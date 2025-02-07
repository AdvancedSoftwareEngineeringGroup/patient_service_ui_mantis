import { useLocation } from "react-router-dom";
import PhysiciansList from "./Lists/PhysiciansList";

const Physicians = () => {
  const location = useLocation();

  if (location.pathname === "/physicians") {
    return (
      <>
        <h1>Physicians</h1>
        <PhysiciansList />
      </>
    );
  }
};

export default Physicians;
