import { useEffect, useRef } from "react";

const GoogleSignIn = ({ onSuccess }) => {
  const divRef = useRef(null);

  useEffect(() => {
    if (window.google && divRef.current) {
      window.google.accounts.id.initialize({
        client_id: "307363070196-pi3hqvlk4q23l8hed03t6lrvcqo5o44v.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(divRef.current, {
        theme: "outline",
        size: "large",
      });

      // Optional: automatic login prompt
      // window.google.accounts.id.prompt();
    }
  }, []);

  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    onSuccess(response.credential);
  };

  return <div ref={divRef}></div>;
};

export default GoogleSignIn;
