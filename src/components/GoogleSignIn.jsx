import React from "react";
import { GoogleLogin } from "react-google-login";

const GoogleSignIn = ({ onSignIn }) => {
  const responseGoogle = (response) => {
    if (response.profileObj) {
      onSignIn(response.profileObj.email);
    } else {
      console.log("Google sign-in failed:", response);
    }
  };

  return (
    <div>
      <GoogleLogin
        clientId="307363070196-pi3hqvlk4q23l8hed03t6lrvcqo5o44v.apps.googleusercontent.com" // Ganti dengan client ID Anda
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

export default GoogleSignIn;
