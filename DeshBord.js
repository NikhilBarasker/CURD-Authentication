import React, { useEffect, useState} from 'react';
import { useNavigate,useLocation,Link } from 'react-router-dom';
import { Table, TableBody, TableHead, TableRow, styled, Button } from '@mui/material';
import { getUserInfo,deleteUser } from './CallApi';
export default function DeshBord() {
  
  const { state } = useLocation();
  const info = state && state.info;
  const [user,setUser]=useState({})
    const navigate = useNavigate();
  useEffect(() => {
    getDetails()  
  },[])
  const getDetails =async () => {
    await getUserInfo();
    setUser(info)
    console.log({ info });
  }
  const userDelete = async (id) => {
    await deleteUser(id);
    navigate('/');
    alert('User has been deleted')
  }
  useEffect(() => {
    const disableBackButton = (e) => {
      e.preventDefault();
      window.history.forward();
    };
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = disableBackButton;

    return () => {
      window.onpopstate = null;
    };
  }, []);

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <th>Id</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <th>{user.id}</th>
            <th>{user.name}</th>
            <th>{user.dob}</th>
            <th>{user.gender}</th>
            <th>{user.email}</th>
            <th>{user.phone}</th>
            <th>{user.address}</th>
            <th>{<Button variant='secondary' component={Link} to={`/edit/${user.id}`} >Edit</Button>}</th>
            <th>{<Button onClick={()=>userDelete(user.id)} >Delete</Button>}</th>
         </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
