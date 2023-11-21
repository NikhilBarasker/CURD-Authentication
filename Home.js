import React, { useEffect } from 'react';
export default function Home() {
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
      <h1 style={{ color: 'red' }}>Welcome</h1>
    <h3>This is CURD Operation Application build using MERN-Stack Technology. To use this application you must register yourself and then you may login.If you are existing user then you may login directly and perform your operation.To know about Application developer you may visit About Us page</h3>
    </div>
  );
}
