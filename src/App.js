import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useState, createContext } from "react";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import AddCourse from './components/AddCourse';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({
    userType: "",
    id: ""
  });

  return (
    <div className="App">
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
