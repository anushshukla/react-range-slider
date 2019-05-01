import React from 'react';
import { TopSpace } from 'components/common/styles';

const Signup = () => (
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
      <button type="submit">Signup</button>
    </form>
    <TopSpace space="20px" />
    <button type="button">Signup with Google</button>
    <TopSpace space="10px" />
    <button type="button">Signup with Facebook</button>
    <TopSpace space="10px" />
    <button type="button">Signup with Linkedin</button>
    <TopSpace space="10px" />
    <button type="button">Signup with Twitter</button>
  </>
);

export default Signup;
