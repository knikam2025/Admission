import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admission() {
    const [data, setData] = useState({ name: "", email: "", number: "", lastname: "" });
    const [users, setUsers] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const handleData = async (e) => {
        e.preventDefault();

        try {
            if (editing) {
                await axios.put(`http://localhost:3000/User/${currentId}`, data);
                alert("Data updated successfully!");
            } else {
                await axios.post('http://localhost:3000/User', data);
                alert("Data submitted successfully!");
            }
            setData({ name: "", email: "", number: "", lastname: "" });
            setEditing(false);
            fetchUsers();
        } catch (error) {
            console.error('Error:', error.message);
            alert("Error submitting data");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/Users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleEdit = (user) => {
        setData(user);
        setEditing(true);
        setCurrentId(user._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/User/${id}`);
            alert("Data deleted successfully!");
            fetchUsers();
        } catch (error) {
            console.error('Error:', error.message);
            alert("Error deleting data");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <div className='f-form'>
                <form onSubmit={handleData}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' id='name' value={data.name} onChange={handleChange} /><br />

                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" name='lastname' id='lastname' value={data.lastname} onChange={handleChange} /><br />
        
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id='email' value={data.email} onChange={handleChange} /><br />

                    <label htmlFor="number">Number</label>
                    <input type="number" name='number' id='number' value={data.number} onChange={handleChange} /><br />

                    <button type='submit'>{editing ? "Update" : "Submit"}</button>
                </form>
            </div>
            <div className='users-list'>
                <h2>Users List</h2>
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            {user.name} {user.lastname} - {user.email} - {user.number}
                            <button onClick={() => handleEdit(user)}>Edit</button>
                            <button onClick={() => handleDelete(user._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Admission;
