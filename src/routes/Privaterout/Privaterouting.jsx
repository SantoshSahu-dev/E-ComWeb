
import { Navigate } from 'react-router-dom';

const Privaterouting = ({ children}) => {
    const token = localStorage.getItem("jwt_token");
    return token ? children : <Navigate to="/login" replace />;

}

export default Privaterouting
