import React, {useEffect, useState} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { Button } from 'antd'
import { LINKEDIN_URL, LINKEDIN_STATE } from 'client/constants/auth'
import AntNotification from 'client/components/Alert'
import {loginWithLinkedin} from 'client/actions/authActions';


const LinkedinAuthButton = (props) => {
  let popup = null

  const [loading, setLoading] = useState(false)


  useEffect(() => {
    window.removeEventListener('message', receiveLinkedInMessage)
    popup && popup.close()
  })

  const receiveLinkedInMessage = async ({ origin, data: { state, code, error, ...rest} }) => {
    if (origin !== window.location.origin || state !== LINKEDIN_STATE) return

    if (code) {
      setLoading(true)
      await props.loginWithLinkedin(code, props.history)
      setLoading(false)
    } else if (error && !['user_cancelled_login', 'user_cancelled_authorize'].includes(error)) {
      AntNotification('error', 'Failed', 'Token is invalid')
    }
    popup.close()
  }
  
  const signInWithLinkedin = () => {
    popup = window.open(LINKEDIN_URL, '_blank', 'width=600,height=600')
    window.addEventListener('message', receiveLinkedInMessage)
  }

  return (
    <Button htmlType="button" loading={loading} className="login-form-button" onClick={() => signInWithLinkedin()}>
      Signin with Linkedin
    </Button>
  );
}


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loginWithLinkedin
}, dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LinkedinAuthButton))
