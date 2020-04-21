import React from 'react';
import { Link } from 'react-router-dom';
import './LandingIntro.css'

export default function LandingIntro() {
  return (
    <div className="landing-intro-screen">
      <img className="landingintro-background" src="/assets/img/neature.jpg" />
      <div className="signin-left p-4">
        <div className="signin-box">
          <h2 className="slim-logo">
            <Link to="/">
              Paidiem
            </Link>
          </h2>
          
          <p>
            The Paidiem Instant pay solution revolutionizes income for today's workforce
          </p>
          <p className="tx-12">© Copyright 2018. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
