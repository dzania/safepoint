import React, { useState, useEffect } from "react";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

export default function Home() {
  return (
    <div>
      <header cass="page-header">
        <div class="container pt-3">
          <div class="row align-items-center ">
            <div class="col-md-5">
              <h2>SafePoint</h2>
              <p>lorem ipsum</p>
            </div>
            <div class="col-md-5">
              <LockOutlinedIcon/>
              </div>
          </div>
        </div>
      </header>
    </div>
  );
}
