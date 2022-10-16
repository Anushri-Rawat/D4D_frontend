import React from "react";
import { Box, Button, Typography } from "@mui/material";
import img from "../images/DrawKit Vector Illustration Project Manager (7).png";

const HeroSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "20px 0 0",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
        <Typography
          as="h4"
          sx={{
            fontSize: { sm: "35px", md: "42px" },
            padding: "20px 0 0 0",
            fontWeight: "600",
          }}
        >
          D4D Hub(Developers for Developers)
        </Typography>
        <p>
          The only place to collab with coders,showcase your projects,show off
          your skills,save projects for future references and much more..
        </p>
        <Button variant="contained" sx={{ marginTop: "20px" }}>
          Explore work
        </Button>
      </Box>
      <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
        <img src={img} style={{ width: "100%", objectFit: "cover" }} />
      </Box>
    </Box>
  );
};

export default HeroSection;
