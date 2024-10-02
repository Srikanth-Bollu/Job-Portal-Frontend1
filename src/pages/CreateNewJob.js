import React, { useState } from 'react';
import HeaderTop from '../pages/global/HeaderTop'
import Layout from '../pages/global/Layout'

const CreateNewJob = () => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    salary: '',
    location: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    // Check if all fields are filled
    if (!jobData.title || !jobData.description || !jobData.salary || !jobData.location) {
      setError('All fields are required!');
      return;
    }
  
    try {
      const response = await fetch('https://job-portal-application-backend1.onrender.com/api/newjob/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });
  
      const result = await response.json();
  
      // Log result to inspect the backend response
      console.log('Response:', result);
  
      if (response.ok) {
        setSuccess('New job created successfully!');
        setJobData({
          title: '',
          description: '',
          salary: '',
          location: ''
        });
      } else {
        setError(result.message || 'Error creating new job');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error creating new job');
    }
  };
  

  // Inline styles
  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#555',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '10px',
  };

  const successStyle = {
    color: 'green',
    marginBottom: '10px',
  };

  return (
    <div>
      <HeaderTop />
      <Layout />
      
      <div style={containerStyle}>
        <div>
          <p style={{ backgroundColor: 'yellow', fontSize: '20px', textAlign: 'center' }}>
            Welcome !!
          </p>
          
        </div>
        <div>
          <h2 style={headerStyle}>Create New Job</h2>
          {error && <p style={errorStyle}>{error}</p>}
          {success && <p style={successStyle}>{success}</p>}
          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>
              Title:
              <input
                type="text"
                name="title"
                value={jobData.title}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </label>

            <label style={labelStyle}>
              Description:
              <input
                type="text"
                name="description"
                value={jobData.description}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </label>

            <label style={labelStyle}>
              Salary:
              <input
                type="text"
                name="salary"
                value={jobData.salary}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </label>

            <label style={labelStyle}>
              Location:
              <input
                type="text"
                name="location"
                value={jobData.location}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </label>

            <button type="submit" style={buttonStyle}>
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewJob;


