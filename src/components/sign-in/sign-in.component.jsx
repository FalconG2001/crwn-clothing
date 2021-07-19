import React from 'react';
import { auth, signInWithGoogle, } from '../../firebase/firebase.utils';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword( email, password );
      this.setState( { email: '', password: '', } )
    } catch ( e ) {
      console.log( e );
    }
  }

  handleChange = e => {
    const { value, name } = e.target;

    this.setState( { [ name ]: value } );
  }

  render() {
    return ( <div className='sign-in'>
      <h2>I already have an account!</h2>
      <span>Sign In with your email and password</span>

      <form onSubmit={this.handleSubmit}>
        <FormInput name='email' label='email' handleChange={this.handleChange} type='email' value={this.state.email} required="required"/>
        <FormInput name='password' label='password' handleChange={this.handleChange} type='password' value={this.state.password} required="required"/>

        <div className='buttons'>
          <CustomButton type='submit'>Sign In</CustomButton>
          <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn="isGoogleSignIn">
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div> )
  }
}

export default SignIn;
