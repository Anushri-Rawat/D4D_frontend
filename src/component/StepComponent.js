import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const StepComponent = ({ step1, step2 }) => {
  return (
    <Box sx={{ textAlign: "center", margin: "30px 0" }}>
      <Typography variant="h4" sx={{ fontWeight: "600", fontSize: "2.25rem" }}>
        Lets get your profile ready!!
      </Typography>
      <p style={{ opacity: "0.8", margin: "10px 0" }}>
        Remember, advertise best version of your work with clarity in vision. So
        that others find it easy to approach you. Vague words and numbers makes
        you unapproachable.
      </p>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: "2rem",
            height: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "#fff",
            border: "1px solid #1976d2",
          }}
        >
          {step1 ? (
            <RouterLink to="/profile/personal-details">
              <Link>1</Link>
            </RouterLink>
          ) : (
            <Link disabled>1</Link>
          )}
        </Box>
        <div
          className="line"
          style={{
            height: "1px",
            width: "40px",
            backgroundColor: "#1976d2",
            float: "left",
            margin: "14px 0px",
            padding: 0,
          }}
        ></div>
        <Box
          sx={{
            width: "2rem",
            height: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "#fff",
            border: "1px solid #1976d2",
          }}
        >
          {step2 ? (
            <RouterLink to="/profile/projects-gallery">
              <Link>2</Link>
            </RouterLink>
          ) : (
            <Link disabled>2</Link>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default StepComponent;
