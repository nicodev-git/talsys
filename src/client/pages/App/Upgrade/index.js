import React from 'react'
import axios from 'axios';
import { Modal, Button } from 'antd';
import StripeCheckout from 'react-stripe-checkout';

import { 
  STRIPE_PUBLISHABLE, 
  COMPANY_NAME, 
  STRIPE_DESCRIPTION,
  UPGRADE_AMOUNT
} from 'client/constants/config';

const CURRENCY = 'USD';

const fromDollarToCent = amount => parseInt(amount * 100);

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};


const Checkout = ({onCardConfirm}) => 
    <StripeCheckout
     name={COMPANY_NAME}
     description={STRIPE_DESCRIPTION}
     amount={fromDollarToCent(UPGRADE_AMOUNT)}
     token={(token) => onCardConfirm({
      source: token.id,
      description: STRIPE_DESCRIPTION, 
      amount: UPGRADE_AMOUNT*100, 
      currency: CURRENCY 
     })}
     currency={CURRENCY}
     stripeKey={STRIPE_PUBLISHABLE}
     allowRememberMe
    >
      <Button type="primary" 
        size="large"
        shape="round"
        style={{maxWidth: 200}}
        htmlType="submit" 
      >
        Subscribe Now
      </Button>
    </StripeCheckout>
  

export default Checkout;