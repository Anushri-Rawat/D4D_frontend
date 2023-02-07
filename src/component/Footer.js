import { Container } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <Container
        sx={{
          textAlign: "center",
          marginTop: "auto",
          display: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          marginBottom: "6px",
        }}
      >
        <p>Created by me &copy; Anushri Rawat and Nikita Bhatnagar</p>
      </Container>
    </footer>
  );
};

export default Footer;
