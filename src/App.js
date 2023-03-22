import "./App.css";
import Login from "./Pages/Login";
import Reg from "./Pages/Reg";
import Home from "./Pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
// import Registration from "./Pages/Registration";

function App() {
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);
  const ProtectedRoute = ({ children }) => {
    // console.log("User");
    // console.log(currentUser);
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  // console.log(currentUser);
  return (
    <Router>
      {/* <Home/> */}
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/reg" element={<Reg />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
