import {
  AccountCircle,
  GitHub,
  LinkedIn,
  Save,
  Share,
} from "@mui/icons-material";
import {
  CardContent,
  Divider,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import React from "react";

const backgroundStyle = {
  backgroundImage: `url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2264&q=80")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const UserCard = () => {
  return (
    <Card>
      <CardHeader
        sx={backgroundStyle}
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="user">
            R
          </Avatar>
        }
        action={
          <div style={{ display: "flex" }}>
            <IconButton aria-label="github">
              <GitHub />
            </IconButton>
            <IconButton aria-label="LinkedIn">
              <LinkedIn />
            </IconButton>
          </div>
        }
        title="Anushri Rawat"
        subheader={
          <div>
            <h5>title</h5>
            <h5>City</h5>
          </div>
        }
      />
      <CardContent>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            paddingLeft: "16px",
          }}
        >
          <strong>Skills:</strong>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {["React", "Redux"].map((skill, i) => (
              <span
                key={i}
                style={{
                  padding: "4px 8px",
                  borderRadius: "5px",
                  background: "#fff",
                  border: "1.5px solid rgba(23,124,226,.5)",
                  color: "rgba(23,124,226,.5)",
                  fontWeight: 600,
                }}
              >
                {skill}
              </span>
            ))}
          </Box>
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            padding: "10px 0 0 16px",
          }}
        >
          <strong>Description:</strong>
          <Typography variant="body2">I am hard working</Typography>
        </div>
      </CardContent>
      <Divider />
      <CardActions
        sx={{
          padding: "10px 16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button
            size="small"
            variant="contained"
            sx={{
              borderRadius: "5px",
              background: "rgb(23 124 226/0.5)",
              color: "#000",
            }}
          >
            <Share />
            Share
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{
              borderRadius: "5px",
              background: "rgb(23 124 226/0.5)",
              color: "#000",
            }}
          >
            <Save />
            Save
          </Button>
        </div>
        <div>
          <Button variant="contained" sx={{ borderRadius: "5px" }}>
            <AccountCircle />
            View Profile
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default UserCard;
