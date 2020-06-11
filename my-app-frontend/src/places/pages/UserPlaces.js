import React, { useEffect, useState } from "react";
import PlaceList from "../componets/PlaceList";
import { useParams } from "react-router-dom";
import LinearIndeterminate from "../../shared/components/LoadingSpinner";
import ErrorAlert from "../../shared/components/errormodal";
// const PLACE = [
//   {
//     id: 1,
//     title: "kanpur",
//     image:
//       "https://images.unsplash.com/photo-1501686962565-1350ab98237f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
//     address: "Uttar Pradesh",
//     description: "IIT kanpur",
//     ccordinates: "80'23",
//     creatorid: "u1",
//   },
//   {
//     id: 2,
//     title: "IIT delhi",
//     image:
//       "https://images.unsplash.com/photo-1420593248178-d88870618ca0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
//     address: "Delhi",
//     description: "Engineering College",
//     ccordinates: "80'23",
//     creatorid: "u3",
//   },
//   {
//     id: 3,
//     title: "Jim Corbett",
//     image:
//       "https://k6u8v6y8.stackpathcdn.com/blog/wp-content/uploads/2017/08/things-to-do-jim-corbett-tiger-reserve.png",
//     address: "uttrakhand",
//     description: "animal park",
//     ccordinates: "80'23",
//     creatorid: "u3",
//   },
// ];

const Places = (props) => {
  const [error, setError] = useState(null);
  const [err, setErr] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [loadedplaces, setloaded] = useState(null);
  const userId = useParams().userid;
  useEffect(() => {

    const sendRequest = async () => {
      try {
        setisLoading(true);
        const response = await fetch("http://localhost:5000/api/places/user/" + userId)
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



  }, [userId]);
  const handleError = () => {
    setError(null);
    setErr(false);
  }

  return (
    <React.Fragment>
      <ErrorAlert message={error} handleerror={handleError} error={err} />
      {isLoading && <LinearIndeterminate />}
      {!isLoading && loadedplaces && <PlaceList items={loadedplaces} us={props.curr} />}
    </React.Fragment>

  );




};

export default Places;
