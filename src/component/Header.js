import React from "react";
import { Container, Button, Box, Paper } from "@mui/material";

const Header = () => {
  return (
    <Paper elevation={2} sx={{ background: "#dff4f1" }}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "15px 0",
          justifyContent: "space-between",
        }}
      >
        <Box as="h2">D4D Hub</Box>
        <Box>
          <Button variant="contained">Get Started</Button>
        </Box>
      </Container>
    </Paper>
  );
};

export default Header;
