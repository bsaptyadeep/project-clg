import React, { useState } from 'react'
import StudentSigIn from './StudentSigIn';
import AdminSignIn from './AdminSignIn';
import FacultySignIn from './FacultySignIn';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const SignIn = () => {
    const [activeUser, setActiveUser] = useState("Student");
    const navigate = useNavigate();

    return (
        <div className='signin-container'>
            <div className='signin-upper-container'>
                <ul>
                    <li className={activeUser==="Student"?"active-user":""} onClick={() => {
                        setActiveUser("Student")
                    }}>Student</li>
                    <li className={activeUser==="Admin"?"active-user":""} onClick={() => {
                        setActiveUser("Admin")
                    }}>Admin</li>
                    <li className={activeUser==="Faculty"?"active-user":""} onClick={() => {
                        setActiveUser("Faculty")
                    }}>Faculty</li>
                </ul>
            </div >
            <div className='signin-box'>
                {
                    activeUser==="Student"?
                    <StudentSigIn />:
                    (activeUser==="Admin"?<AdminSignIn/> : <FacultySignIn />)
                }
            </div>
            <p>Didn't Register?<span
            onClick={() => {
                navigate("/signup")
            }}
            >Register Now</span></p>
        </div >
    )
}

export default SignIn