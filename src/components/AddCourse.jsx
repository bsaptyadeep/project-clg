import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
    const [data, setData] = useState({
        facultyId: "",
        subjectCode: "",
        subjectName: "",
        courseSyllabus: ""
    })
    const [faculty, setFaculty] = useState([]);
    const navigate = useNavigate();

    const getAllFaculties = async () => {
        const res = await axios.get("https://software-proj.onrender.com/faculty")
        setFaculty([...res.data.faculty])
    }

    const onhandleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://software-proj.onrender.com/course", data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            alert(res.data.success ? "Course Added SuccessFull" : "Some Problem Ocurred! Try Again")
            navigate("/")
        } catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        getAllFaculties()
    }, [])

    return (
        <div className='addcourse-container'>
            <div className='addcourse-form'>
                <h1>Add Course</h1>
                <form onSubmit={onSubmit}>
                    <select name="facultyId" required onChange={onhandleChange} id="facltyId">
                        <option defaultValue="Select">Select faculty</option>
                        {
                            faculty?.length === 0 ?
                                null : (
                                    faculty?.map((fact, i) => (
                                        <option key={i} value={fact.id}>{fact.userName}</option>
                                    ))
                                )
                        }
                    </select>
                    <input type='text' required onChange={onhandleChange} value={data.subjectCode} name='subjectCode' placeholder='Enter a subject Code' />
                    <input type='text' required onChange={onhandleChange} value={data.subjectName} name='subjectName' placeholder='Enter a subject Name' />
                    <input type='text' required onChange={onhandleChange} value={data.courseSyllabus} name='courseSyllabus' placeholder='Enter a courseSyllabus' />
                    <button type='submit'>Save Course</button>
                </form>
            </div>
        </div>
    )
}

export default AddCourse