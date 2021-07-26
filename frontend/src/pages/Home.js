import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <header cass="page-header">
        <div class="container">
          <div class="description ">
            <h1>
              Safe and elegant way to store all your passwords in one place
            </h1>
            <p class="text"></p>
            <Link to="/register">
            <button class="btn  btn-lg rounded-pill">
              Get started
            </button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
