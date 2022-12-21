import Router from "next/router";
import React, { useEffect } from "react";
import { supabase } from "../../utils/supabase";

const Login = () => {
  useEffect(() => {
    supabase.auth.signInWithOAuth({ provider: "github" });
    Router.push("/");
  }, []);

  return <div>Login</div>;
};

export default Login;
