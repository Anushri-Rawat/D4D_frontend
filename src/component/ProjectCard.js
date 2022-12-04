import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Avatar,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  FavoriteBorder,
  Share,
  MoreVert,
  TextsmsRounded,
  Visibility,
  Delete,
  Edit,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { deleteProject } from "../actions/projectActions";

const ProjectCard = ({ project }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenProjectMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseProjectMenu = () => {
    setAnchorElUser(null);
  };
  const { userInfo } = useSelector((state) => state.userLogin);
  const { profileInfo } = useSelector((state) => state.userProfile);

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="profile-image" src={profileInfo?.profile_image} />
        }
        action={
          project.user_id._id === userInfo._id ? (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton aria-label="settings" onClick={handleOpenProjectMenu}>
                <MoreVert />
              </IconButton>
              <Menu
                sx={{ mt: "30px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseProjectMenu}
              >
                <MenuItem
                  onClick={() => {
                    handleCloseProjectMenu();
                    navigate(`/edit/projects-gallery/${project._id}`);
                  }}
                >
                  <Edit />
                  <Typography textAlign="center">Edit</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseProjectMenu();
                    dispatch(deleteProject(userInfo, project._id));
                  }}
                >
                  <Delete />
                  <Typography textAlign="center">Delete</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            ""
          )
        }
        title={project.name.slice(0, 16)}
        subheader={"@" + profileInfo?.username}
      />
      <Link to={`/project/${project.name.split(" ").join("-")}/${project._id}`}>
        <CardMedia
          component="img"
          height="194"
          image={project?.images_url[0]}
          alt="project-img"
        />
        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 3px",
          }}
        >
          <div>
            <IconButton aria-label="add to favorites" sx={{ fontSize: "18px" }}>
              <FavoriteBorder sx={{ fontSize: "18px" }} />
              <span style={{ paddingLeft: "2px" }}>{project?.likesCount}</span>
            </IconButton>
            <IconButton aria-label="message" sx={{ fontSize: "18px" }}>
              <TextsmsRounded sx={{ fontSize: "18px" }} />{" "}
              <span style={{ paddingLeft: "2px" }}>0</span>
            </IconButton>
            <IconButton aria-label="visibility" sx={{ fontSize: "18px" }}>
              <Visibility sx={{ fontSize: "18px" }} />{" "}
              <span style={{ paddingLeft: "2px" }}>0</span>
            </IconButton>
          </div>
          <div>
            <IconButton aria-label="share" sx={{ fontSize: "18px" }}>
              <Share sx={{ fontSize: "18px" }} />
            </IconButton>
          </div>
        </CardActions>
        <hr />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            margin: "7px 0 12px",
            padding: "0 10px",
          }}
        >
          {project?.required_skills.map((skill, i) => (
            <span
              key={i}
              style={{
                padding: "4px 6px",
                borderRadius: "5px",
                background: "#fff",
                border: "1.5px solid #777",
                color: "#777",
                fontWeight: 600,
              }}
            >
              {skill}
            </span>
          ))}
        </Box>
      </Link>
    </Card>
  );
};

export default ProjectCard;
