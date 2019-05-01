import React from 'react';
import { TopSpace } from 'components/common/styles';

const Login = () => (
  <>
    <form>
      <input
        type="email"
        placeholder="Please enter your Email / Mobile Number / Username"
      />
      <TopSpace space="10px" />
      <div>
        <input type="password" placeholder="Please enter your password here" />
        <button type="button">Show password</button>
      </div>
      <TopSpace space="10px" />
      <button type="submit">Login</button>
    </form>
    <TopSpace space="20px" />
    <button type="button">Login with Google</button>
    <TopSpace space="10px" />
    <button type="button">Login with Facebook</button>
    <TopSpace space="10px" />
    <button type="button">Login with Linkedin</button>
    <TopSpace space="10px" />
    <button type="button">Login with Twitter</button>
  </>
);

export default Login;
