import React, { useEffect, useState } from "react";

const Fetch = () => {
  const [user, setUser] = useState<{ name: string }>();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hello`)
      .then((type) => type.json())
      .then((res) => setUser(res));
  });

  return <div>User: {user?.name}</div>;
};

export default Fetch;
