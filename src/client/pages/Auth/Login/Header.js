import React from 'react'
import { Link } from 'react-router-dom'
import  { Button } from 'antd'

import Logo from "client/assets/images/logo.svg"


const Header = () => {
	return(
		<div className="slim-header" style={{borderBottom: 'none'}}>
      <div className="container-fluid px-5">
        <div className="slim-header-left">
          <h2 className="slim-logo">
            <Link to="/">
              <img src={Logo} width="120"/>
            </Link>
          </h2>
        </div>
        <div className="slim-header-right">
        	<span className="text-muted mr-3">Don't have an account?</span>
	      	<Link to="/register">
	      		<Button shape="round" size={'large'} style={{width: 120}}>Sign Up</Button>
	      	</Link>  	
	      </div>
      </div>
    </div>
	)
}


export default Header