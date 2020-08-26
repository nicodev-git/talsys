import React from 'react'
import { Link } from 'react-router-dom'
import  { Button } from 'antd'

import Logo from "client/assets/images/logo.svg"


const Header = () => {
	return(
		<div className="slim-header" style={{borderBottom: 'none', padding: '0 3%'}}>
      <div className="container-fluid">
        <div className="slim-header-left">
          <h2 className="slim-logo">
            <Link to="/">
              <img src={Logo} height="70"/>
            </Link>
          </h2>
        </div>
        <div className="slim-header-right">
        	<span className="text-muted mr-3 d-none d-md-block">Don't have an account?</span>
	      	<Link to="/register">
	      		<Button shape="round" size={'large'} style={{width: 120}}>Sign Up</Button>
	      	</Link>  	
	      </div>
      </div>
    </div>
	)
}


export default Header