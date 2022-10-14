import React from "react";
import { Box, Button } from "@mui/material";
import img from "../images/man-multitasking-work_23-2148390869.svg";

const HeroSection = () => {
  return (
    <Box sx={{ display: "flex", padding: "40px 0" }}>
      <Box sx={{ width: "50%" }}>
        <h4
          style={{ fontSize: "55px", padding: "20px 0 0 0", fontWeight: "600" }}
        >
          The only place to
        </h4>
        <div
          className="dynamic-text"
          style={{ overflow: "hidden", height: "48px" }}
        >
          <div>
            <span>Collab with coders</span>
          </div>
          <div>
            <span>Showcase your projects</span>
          </div>
          <div>
            <span>Show off your skills</span>
          </div>
        </div>
        <Button variant="contained" sx={{ marginTop: "20px" }}>
          Explore work
        </Button>
      </Box>
      <Box sx={{ width: "50%" }}>
        <img
          src="https://img.freepik.com/premium-vector/man-multitasking-work_23-2148390869.jpg?w=740"
          alt="coders"
          height="300"
          style={{ width: "100%", objectFit: "cover" }}
        />
      </Box>
    </Box>
  );
};

export default HeroSection;
