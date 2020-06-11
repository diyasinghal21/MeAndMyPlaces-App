import React, { useEffect, useState } from "react";
import UserList from "../components/UsersList";
import LinearIndeterminate from "../../shared/components/LoadingSpinner";
import ErrorAlert from "../../shared/components/errormodal";

const Users = () => {
  // const USER = [
  //   {
  //     id: "u1",
  //     name: "Diya",
  //     count: "3 Places",
  //     image:
  //       "https://images.unsplash.com/photo-1501686962565-1350ab98237f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
  //   },
  //   {
  //     id: "u2",
  //     name: "Shivam",
  //     count: "5 Places",
  //     image:
  //       "https://images.unsplash.com/photo-1420593248178-d88870618ca0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
  //   },
  //   {
  //     id: "u3",
  //     name: "Pulkit",
  //     count: "9 Places",
  //     image:
  //       "https://images.unsplash.com/photo-1501686962565-1350ab98237f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
  //   },
  // ];

  const [error, setError] = useState(null);
  const [err, setErr] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [loadedUsers, setloaded] = useState(null);

  useEffect(() => {

    const sendRequest = async () => {
      try {
        setisLoading(true);
        const response = await fetch("http://localhost:5000/api/users/")
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setloaded(responseData.users);

      } catch (err) {
        console.log(err);
        setisLoading(false);
        setError(err.message);
        setErr(true);

      }
      setisLoading(false);
    };
    sendRequest();



  }, []);
  const handleError = () => {
    setError(null);
    setErr(false);
  };

  return (
    <React.Fragment>
      <ErrorAlert message={error} handleerror={handleError} error={err} />
      {isLoading && <LinearIndeterminate />}
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </React.Fragment>

  );

};

export default Users;
