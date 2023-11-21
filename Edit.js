import styled from '@emotion/styled'
import { FormControl, FormGroup, InputLabel, Input, Typography, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { getUser,editUserInfo } from './CallApi'
const Container = styled(FormGroup)`
width:50%;
margin : 5% auto 0 auto;
& > div {
    margin-top:20px;
}

`
const defaultValues = {
    name: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    address: ''
}
export default function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        loadUserDetails();    
    }, [])
    const loadUserDetails = async() => {
        const response = await getUser(id);
        setUsers(response.data.user)
        console.log(response.data.user);
    }
    
    const [users,setUsers]=useState(defaultValues)
    const onValueChange = (e) => {
        setUsers({...users,[e.target.name]:e.target.value})
    }
    const editInfo = async () => {
        
        await editUserInfo(users, id)
        console.log('xxxxxxxxxxxx',users);
        
        alert('User has been Updated Successfully You may Login again')
navigate('/log');
    }
  return (
    <Container>
          <Typography variant='h4' >Edit User</Typography>
          <FormControl>
              <InputLabel>Full Name</InputLabel>
              <Input onChange={(e) => onValueChange(e)}  name='name' value={users.name}/>
          </FormControl>
          <FormControl>
              <InputLabel>Date of Birth</InputLabel>
          </FormControl>
          <FormControl>
              <Input type='date' onChange={(e)=>onValueChange(e)} name='dob' value={users.dob}/>
          </FormControl>
          <FormControl>
              <InputLabel>Gender</InputLabel>
              <Input  onChange={(e)=>onValueChange(e)} name='gender' value={users.gender}/>
          </FormControl>
          <FormControl>
              <InputLabel>Email</InputLabel>
              <Input  onChange={(e)=>onValueChange(e)} name='email' value={users.email}/>
          </FormControl>
          <FormControl> 
              <InputLabel>Phone</InputLabel>
              <Input  onChange={(e)=>onValueChange(e)} name='phone' value={users.phone}/>
          </FormControl>
          <FormControl>
              <InputLabel>City</InputLabel>
              <Input  onChange={(e)=>onValueChange(e)} name='address' value={users.address}/>
          </FormControl>
          <FormControl>
              <Button variant='contained' onClick={()=>editInfo()}>Edit User</Button>
          </FormControl>
    </Container>
  )
}
