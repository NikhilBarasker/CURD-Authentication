import styled from '@emotion/styled'
import { FormControl, FormGroup, InputLabel, Input, Typography, Button } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, getUserInfo } from './CallApi'
const Container = styled(FormGroup)`
width:50%;
margin : 5% auto 0 auto;
& > div {
    margin-top:20px;
}

`
const defaultValues = {
    Email: '',
    Password:''
}
export default function Login() {
    const naviagte = useNavigate();
    const [user,setUser]=useState(defaultValues)
    const onValueChange = (e) => {
        setUser({...user,[e.target.name]:e.target.value})
    }
    const userLogin = async () => {
        const response = await loginUser(user);
        console.log('aaaaaaaaaaaaaaaaaaa',response);
        if (response) {
            const info = await getUserInfo(response)
            console.log('bbbbbbbbbbbbbbb',info);
            if (info) {
                naviagte('/desh',{state:{info}})
            }
            else {
                alert('No data found')
            }
        }
        else {
            alert('Please cheak email or password ')
        }
    }
  return (
<Container>
          <Typography variant='h4'>Login</Typography>
          <FormControl>
              <InputLabel>Email</InputLabel>
              <Input  onChange={(e)=>onValueChange(e)} name='Email'/>
          </FormControl>
          <FormControl>
              <InputLabel>Password</InputLabel>
              <Input type='password' onChange={(e)=>onValueChange(e)} name='Password'/>
          </FormControl>
          <FormControl>
              <Button variant='contained' onClick={()=>userLogin()} >Login</Button>
          </FormControl>
    </Container>
  )
}
