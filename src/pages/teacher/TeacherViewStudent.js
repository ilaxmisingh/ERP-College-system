import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import { useParams } from "react-router-dom";
const TeacherViewStudent = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { currentUser, userDetails, response, loading, error } = useSelector(
    (state) => state.user
  );

  const address = "Student";
  const studentID = params.id;
  useEffect(() => {
    dispatch(getUserDetails(studentID, address));
  }, [dispatch, studentID]);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const [sclassName, setSclassName] = useState("");
  const [studentSchool, setStudentSchool] = useState("");

  useEffect(() => {
    if (userDetails) {
      setSclassName(userDetails.sclassName || "");
      setStudentSchool(userDetails.school || "");
    }
  }, [userDetails]);

  return (
    <>
      {loading ? (
        <>
          <div>Loading...</div>
        </>
      ) : (
        <div>
          Name: {userDetails.name}
          <br />
          Roll Number: {userDetails.rollNum}
          <br />
          Class: {sclassName.sclassName}
          <br />
          School: {studentSchool.schoolName}
          <br />
        </div>
      )}
    </>
  );
};

export default TeacherViewStudent;
