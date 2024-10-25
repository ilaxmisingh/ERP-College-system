import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../../redux/userRelated/userHandle";
import { useParams } from "react-router-dom";
import { getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { Box, Button, Tab, Container } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Popup from "../../../components/Popup";

const ViewStudent = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { userDetails, response, loading, error } = useSelector(
    (state) => state.user
  );

  const studentID = params.id;
  const address = "Student";

  useEffect(() => {
    dispatch(getUserDetails(studentID, address));
  }, [dispatch, studentID]);

  useEffect(() => {
    if (
      userDetails &&
      userDetails.sclassName &&
      userDetails.sclassName._id !== undefined
    ) {
      dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
    }
  }, [dispatch, userDetails]);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const [name, setName] = useState("");
  const [rollNum, setRollNum] = useState("");
  const [sclassName, setSclassName] = useState("");
  const [studentSchool, setStudentSchool] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (userDetails) {
      setName(userDetails.name || "");
      setRollNum(userDetails.rollNum || "");
      setSclassName(userDetails.sclassName || "");
      setStudentSchool(userDetails.school || "");
    }
  }, [userDetails]);

  const deleteHandler = () => {
    setMessage("Sorry the delete function has been disabled for now.");
    setShowPopup(true);
  };

  const StudentDetailsSection = () => {
    return (
      <div>
        Name: {userDetails.name}
        <br />
        Roll Number: {userDetails.rollNum}
        <br />
        Class: {sclassName.sclassName}
        <br />
        School: {studentSchool.schoolName}
        <Button
          variant="contained"
          sx={styles.styledButton}
          onClick={deleteHandler}
        >
          Delete
        </Button>
        <br />
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <>
          <div>Loading...</div>
        </>
      ) : (
        <>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  sx={{
                    position: "fixed",
                    width: "100%",
                    bgcolor: "background.paper",
                    zIndex: 1,
                  }}
                >
                  <Tab label="Details" value="1" />
                  <Tab label="Attendance" value="2" />
                  <Tab label="Marks" value="3" />
                </TabList>
              </Box>
              <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                <TabPanel value="1">
                  <StudentDetailsSection />
                </TabPanel>
                {/*  */}
              </Container>
            </TabContext>
          </Box>
        </>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default ViewStudent;

const styles = {
  attendanceButton: {
    marginLeft: "20px",
    backgroundColor: "#270843",
    "&:hover": {
      backgroundColor: "#3f1068",
    },
  },
  styledButton: {
    margin: "20px",
    backgroundColor: "#02250b",
    "&:hover": {
      backgroundColor: "#106312",
    },
  },
};
