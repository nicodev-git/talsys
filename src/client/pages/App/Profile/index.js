import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, Row, Col, notification, Form, Input, DatePicker, Select, Badge } from 'antd';
import { upgradePayment } from 'client/actions/paymentActions';
import StripeCheckout from 'client/pages/App/Upgrade';

import subscribeImg from 'client/assets/images/subscribe.svg'


export class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.onCardConfirm = this.onCardConfirm.bind(this)
  }

  onCardConfirm(data) {
    this.props.upgradePayment(data)
  }

  render() {
  	const {profile, expired} = this.props

    return (
      <div className="w-100 profile-page mb-5" style={{marginTop: -30}}>
      	<div className="bg-primary py-5 px-3 d-flex align-items-center justify-content-center">
      		<div className="d-flex  justify-content-between w-100" style={{maxWidth: 1000}}>
	      		<div className="d-flex align-items-center justify-content-start" >
		      		<img src="http://via.placeholder.com/500x500" style={{maxWidth: 100, borderRadius: '50%'}} />
		      		<div className="ml-3">
		      			<h5 className="text-white">{`${profile.firstName} ${profile.lastName}`}</h5>
		      			<p className="text-white">{profile.email}</p>
		      		</div>
		      	</div>
		      	<div>
		      		<Badge count={profile.plan} style={{backgroundColor: 'white', color: 'blue'}}/>
		      	</div>
		      </div>
      	</div>
      	<div className="d-flex mt-4 justify-content-between w-100 mx-auto flex-column" style={{maxWidth: 1000}}>
      		{
      			profile.plan === "Trial" && 
      			 <Card className="my-4">
      				<div className="d-flex align-items-center justify-content-center flex-row">
                <img src={subscribeImg} className="mb-3 d-none d-sm-block w-100" style={{maxWidth: 300}}/>
                <div className="mx-4 text-left">
                  <h2 style={{color: '#8BD8BD'}}>Find More and RelevantPublic Company Talent</h2>
                  
                  <h1 style={{color: '#273773'}} className="mb-4">
                    $50 <small style={{fontSize: 15}}>/ per month</small>
                  </h1>
                  <StripeCheckout 
                    onCardConfirm={data => this.onCardConfirm(data)}/>
                  <p className="text-muted mt-3">Payment will be done via Stripe</p>
                </div>
              </div>
			      </Card>
      		}
      	</div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  secFilings: state.sec.secData,
  profile: state.auth.profile,
  expired: state.auth.expired
});

const mapDispatchToProps = dispatch => bindActionCreators({
  upgradePayment
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)