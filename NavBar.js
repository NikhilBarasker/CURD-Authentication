

import React from 'react';
import { AppBar, Toolbar, styled } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

const Tabs = styled(NavLink)`
  font-size: 20px;
  margin-right: 20px;
  color: inherit;
  text-decoration: none;
`;

const RightShift = styled(Toolbar)`
  justify-content: flex-end;
`;

const PageTitle = styled('div')`
  font-size: 25px;
  margin-right: 1000px;
`;

export default function NavBar() {
  const location = useLocation();

  const pageTitles = {
    '/': 'Home Page',
    '/reg': 'Registration Page',
    '/log': 'Login Page',
    '/edit': 'Edit Page',
    '/desh': 'DeshBord',
    '/about': 'About Page',
  };

  const pageTitle = pageTitles[location.pathname];

  const removeToken = () => {
    localStorage.removeItem('token');
  };

  const token = localStorage.getItem('token');

  return (
    <div>
      <AppBar position="static">
        <RightShift>
          <PageTitle>{pageTitle}</PageTitle>
          <Tabs to="/reg">Registration</Tabs>
          <Tabs to="/log">Login</Tabs>
          <Tabs to="/about">About Us</Tabs>
          {location.pathname === '/desh' && token ? (
            <Tabs to="/" onClick={removeToken}>
              Logout
            </Tabs>
          ) : null}
        </RightShift>
      </AppBar>
    </div>
  );
}
