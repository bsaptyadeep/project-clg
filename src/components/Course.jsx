import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Course = () => {
    const [course, setCourse] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [studentEnrolled, setStudentEnrolled] = useState([]);
    console.log(studentEnrolled)

    const enrollCourse = async ({ facultyId, courseId, studentId, subjectName }) => {
        const res = await axios.post("https://software-proj.onrender.com/enroll", {
            facultyId: facultyId,
            courseId: courseId,
            studentId: studentId,
            subjectName: subjectName
        })

        alert(res.data.success ? "Enrolled SuccessFull" : "Some Problem Ocurred! Try Again")
    }

    const getAllCourse = async () => {
        const res = await axios.get("https://software-proj.onrender.com/course")
        setCourse([...res.data.courses])
    }

    const getAllStudentEnroll = async () => {
        const res = await axios.get(`https://software-proj.onrender.com/enroll/allenrollbystudent/${user.id}`)
        setStudentEnrolled([...res.data.enroll])
    }

    useEffect(() => {
        getAllCourse();
        if (user.userType === "Student")
            getAllStudentEnroll();

    }, [])

    return (
        <div className='course-container'>
            <h1>
                Courses
            </h1>
            {
                user.userType === "Admin" ?
                    <button onClick={() => {
                        navigate("/addcourse")
                    }}>Add Course</button> : null
            }
            {user.userRole !== "Faculty" ? (<>
                <h1>All Courses</h1>
                <div className='all-course-container'>
                    {
                        course?.length === 0 ?
                            null :
                            (
                                course?.map((cor, i) => (
                                    <div className='course-container violet-box'>
                                        <h2>{cor.subjectCode}</h2>
                                        <p>{cor.subjectName}</p>
                                        <p>{cor.courseSyllabus}</p>
                                        {user.userType === "Student" ?
                                            (
                                                <button onClick={() => {
                                                    enrollCourse({
                                                        facultyId: cor.facultyId,
                                                        studentId: user.id,
                                                        courseId: cor._id,
                                                        subjectName: cor.subjectName
                                                    }
                                                    )
                                                }
                                                } className='enroll-btn'>Enroll Now</button>
                                            ) : null}
                                    </div>
                                ))
                            )
                    }
                </div>
            </>
            ) : null}
            {user.userType === "Student" ? <h2>Enrolled Courses</h2> : null}
            <div className='enrolled-courses'>
                {
                    user.userType === "Student" && studentEnrolled?.length !== 0 ?
                        (
                            studentEnrolled?.map((en) => (
                                <div className='course-container green-box'>
                                    <h2>{en.subjectName}</h2>
                                    <p>{en.facultyId}</p>
                                </div>
                            ))
                        ) : null
                }

            </div>


        </div>
    )
}

export default Course