import styled from '@emotion/styled'
import { FormControl, FormGroup, InputLabel, Input, Typography, Button } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userRegistration } from './CallApi.js'
const Container = styled(FormGroup)`
width:50%;
margin : 5% auto 0 auto;
& > div {
    margin-top:20px;
}

`
const defaultValues = {
    Name: '',
    Dob: '',
    Gender: '',
    Email: '',
    Phone: '',
    Address: '',
    Password:''
}
export default function Registration() {
    const navigate = useNavigate();
    const [user,setUser]=useState(defaultValues)
    const onValueChange = (e) => {
        setUser({...user,[e.target.name]:e.target.value})
    }
    const registerUser = async () => {
        
        const response=await userRegistration(user)
        if (response) {
            alert('Registration Successfull')
            navigate('/log');
        } else {
            alert('Email already exists')
        }
        
    }
  return (
      <Container>
          <Typography variant='h4' >Register User</Typography>
          <FormControl>
              <InputLabel>Full Name</InputLabel>
              <Input onChange={(e) => onValueChange(e)}  name='Name'/>
          </FormControl>
          <FormControl>
              <InputLabel>Date of Birth</InputLabel>
          </FormControl>
          <FormControl>
              <Input type='date' onChange={(e)=>onValueChange(e)} name='Dob'/>
          </FormControl>
          <FormControl>
              <InputLabel>Gender</InputLabel>
              <Input  onChange={(e)=>onValueChange(e)} name='Gender'/>
          </FormControl>
          <FormControl>
              <InputLabel>Email</InputLabel>
              <Input  onChange={(e)=>onValueChange(e)} name='Email'/>
          </FormControl>
          <FormControl>
              <InputLabel>Phone</InputLabel>
              <Input  onChange={(e)=>onValueChange(e)} name='Phone'/>
          </FormControl>
          <FormControl>
              <InputLabel>City</InputLabel>
              <Input  onChange={(e)=>onValueChange(e)} name='Address'/>
          </FormControl>
          <FormControl>
              <InputLabel>Password</InputLabel>
              <Input type='password' onChange={(e)=>onValueChange(e)} name='Password'/>
          </FormControl>
          <FormControl>
              <Button variant='contained' onClick={()=>registerUser()}>Register</Button>
          </FormControl>
    </Container>
  )
}
