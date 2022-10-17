import React from "react";
import { Container, Button, Box, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
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
          <RouterLink to="/signup" style={{ textDecoration: "none" }}>
            <Button variant="contained">Get Started</Button>
          </RouterLink>
        </Box>
      </Container>
    </Paper>
  );
};

export default Header;
