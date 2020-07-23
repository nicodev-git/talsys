import React from 'react';
import { Link } from 'react-router-dom';
import './LandingIntro.css'

import BlueLogo from "client/assets/images/logo-blue.png"

export default function LandingIntro() {
  return (
    <div className="landing-intro-screen">
      <div className="signin-left p-4">
        <div className="signin-box">
          <h2 className="slim-logo">
            <Link to="/">
              <img src={BlueLogo} width="150"/>
            </Link>
          </h2>
          
          <p>
            Loream Ipsume ...
          </p>
          <p className="tx-12">© Copyright 2020 TalSys. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
