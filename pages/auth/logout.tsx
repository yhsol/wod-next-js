import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { supabase } from "../../utils/supabase";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await supabase.auth.signOut();
      router.push("/");
    })();
  });

  return <div>Logout</div>;
};

export default Logout;
