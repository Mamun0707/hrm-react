import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';
import { Link } from 'react-router-dom';

function Accounts() {
    const[data, setData]=useState([]);
    useEffect(() => {
        getDatas();
    }, []);

    function getDatas() {
        axios.get(`${process.env.REACT_APP_API_URL}/employee/index`).then(function(response) {
            setData(response.data.data);
        });
    }
    const deleteData = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/employee/${id}`).then(function(response){
            getDatas();
        });
    }
  return (
    <AdminLayout>
        <div className="main-content container-fluid">
            <div className="page-title">
                <div className="row">
                    <div className="col-12 col-md-6 order-md-1 order-last">
                        <h3>Employee</h3>
                    </div>
                    <div className="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" className='breadcrumb-header'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                                <li className="breadcrumb-item active" aria-current="page">List</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="row" id="table-bordered">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">All Designation</h4>
                            <Link to={'/employee/add'} className='btn btn-primary float-right' >Add New</Link>
                        </div>
                        <div className="card-content">
                            <div className="table-responsive">
                                <table className="table table-bordered mb-0">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>phone_no</th>
                                            <th>designation_id</th>
                                            <th>department_id</th>
                                            <th>education</th>
                                            <th>salary</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {data && data.map((d, key) =>
                                        <tr key={d.id}>
                                            <td className="text-bold-500">{d.name}</td>
                                            <td>{d.email}</td>
                                            <td>{d.phone_no}</td>
                                            <td>{d.designation_id}</td>
                                            <td>{d.department_id}</td>
                                            <td>{d.education}</td>
                                            <td>{d.salary}</td>
                                            <td>
                                                <Link to={`/employee/edit/${d.id}`} className='btn btn-info' >Edit</Link>
                                                <button type='button' onClick={() => deleteData(d.id)} className='btn btn-danger'>Delete</button>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </AdminLayout>    
  )
}

export default Accounts