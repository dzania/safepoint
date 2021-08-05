import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import NavbarAuth from './NavbarAuth'
import NavbarUnauth from './NavbarUnauth'

export default function Navigation() {
  // Change navigation based on user authentication
  return (
    <div>
      {currentUser ? (
        <NavbarAuth/>
      ) : (
        <NavbarUnauth/>

      )}
    </div>
  );
}
