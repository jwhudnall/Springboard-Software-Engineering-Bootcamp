import React, { useState, useEffect } from "react";
import axios from "axios";
// "https://api.github.com/users/jwhudnall"

const ProfileViewer = ({ user }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    // AJAX requests go here
    const loadProfile = async () => {
      const res = await axios.get(`https://api.github.com/users/${user}`);
      setData(res.data.name);
    };
    loadProfile();
  }, [user]);

  return <h3>{data ? data : "Loading..."}</h3>;
};

export default ProfileViewer;
