import React, { useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import StepComponent from "../component/StepComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProjectPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, [userInfo, navigate]);
  return (
    <Container>
      <Box sx={{ textAlign: "center", margin: "30px 0 0" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "600", fontSize: "2.25rem" }}
        >
          Add Projects
        </Typography>
        <Typography variant="p" style={{ opacity: "0.8", margin: "10px 0" }}>
          You are allowed to add as many projects as you want, Be very clear
          about what you are adding with in-detailed explanation to impress
          people who are having a look.
        </Typography>
      </Box>
      <StepComponent step1 />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            height: "1px",
            width: "100%",
            background: "rgb(138 147 155)",
          }}
        ></span>
        <Typography
          variant="h6"
          sx={{ whiteSpace: "nowrap", padding: "0 10px" }}
        >
          Project section
        </Typography>
        <span
          style={{
            height: "1px",
            width: "100%",
            background: "rgb(138 147 155)",
          }}
        ></span>
      </Box>
    </Container>
  );
};

export default ProjectPage;
