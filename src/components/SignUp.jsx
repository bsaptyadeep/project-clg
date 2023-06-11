import React, { useState } from 'react'
import StudentSignUp from './StudentSignUp';
import FacultySignUp from './FacultySignUp';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [activeUser, setActiveUser] = useState("Student");
    const navigate = useNavigate();

    return (
        <div className='signup-container'>
            <div className='signup-upper-container'>
                <ul>
                    <li className={activeUser==="Student"?"active-user":""} onClick={() => {
                        setActiveUser("Student")
                    }}>Student</li>
                    <li className={activeUser==="Faculty"?"active-user":""} onClick={() => {
                        setActiveUser("Faculty")
                    }}>Faculty</li>
                </ul>
            </div >
            <div className='signup-box'>
                {
                    activeUser === "Student" ?
                        <StudentSignUp /> :
                        <FacultySignUp />
                }
            </div>
            <p>Already Registerd <span
            onClick={() => {
                navigate("/signin")
            }}
            > Log In</span></p>
        </div >
    )
}

export default SignUp