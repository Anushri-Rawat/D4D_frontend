import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Avatar,
  IconButton,
  Box,
} from "@mui/material";
import {
  FavoriteBorder,
  Share,
  MoreVert,
  TextsmsRounded,
  Visibility,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const ProjectCard = () => {
  const { profileInfo } = useSelector((state) => state.userProfile);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="profile-image" src={profileInfo?.profile_image} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={profileInfo?.full_name}
        subheader={"@" + profileInfo?.username}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://res.cloudinary.com/drz6w1d5q/image/upload/v1668805796/Screenshot_80_vgyxei.png"
        alt="project-img"
      />
      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <IconButton aria-label="add to favorites">
            <FavoriteBorder /> <span style={{ paddingLeft: "2px" }}>0</span>
          </IconButton>
          <IconButton aria-label="message">
            <TextsmsRounded /> <span style={{ paddingLeft: "2px" }}>0</span>
          </IconButton>
          <IconButton aria-label="visibility">
            <Visibility /> <span style={{ paddingLeft: "2px" }}>0</span>
          </IconButton>
        </div>
        <div>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </div>
      </CardActions>
      <hr />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px",
          margin: "10px 0 15px",
          padding: "0 10px",
        }}
      >
        <span
          style={{
            padding: "4px 6px",
            borderRadius: "5px",
            background: "#fff",
            border: "1.5px solid #777",
            color: "#777",
            fontWeight: 600,
          }}
        >
          Javascript
        </span>
      </Box>
    </Card>
  );
};

export default ProjectCard;
