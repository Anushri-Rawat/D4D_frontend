import React, { useState } from "react";
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
  CardContent,
  Divider,
} from "@mui/material";
import {
  FavoriteBorder,
  Share,
  MoreVert,
  TextsmsRounded,
  Visibility,
  Delete,
  Edit,
  Favorite,
  SettingsCellOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { deleteProject, updateLikesOfProject } from "../actions/projectActions";

const ProjectCard = ({ data }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenProjectMenu = (event) => {
    event.preventDefault();
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseProjectMenu = () => {
    setAnchorElUser(null);
  };
  const { userInfo } = useSelector((state) => state.userLogin);
  const user = data.user ? data.user[0] : data.user_id;

  const [likeVal, setLikeVal] = useState(
    data?.likes?.find((key) => key === userInfo?._id)
  );
  const [count, setCount] = useState(data?.likes?.length);

  const likeHandler = (e) => {
    e.preventDefault();
    setLikeVal(!likeVal);
    !likeVal ? setCount(count + 1) : setCount(count - 1);
    dispatch(updateLikesOfProject(userInfo, data?._id));
  };

  return (
    <Card sx={{ maxWidth: 300 }}>
      <Link to={`/project/${data.name.split(" ").join("-")}/${data._id}`}>
        <CardHeader
          sx={{ padding: "12px", color: "#000" }}
          avatar={
            <Avatar aria-label="profile-image" src={user.profile_image} />
          }
          action={
            userInfo?._id && data.user_id._id === userInfo._id ? (
              <Box sx={{ flexGrow: 0 }}>
                <IconButton
                  aria-label="settings"
                  onClick={handleOpenProjectMenu}
                >
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
                      navigate(`/edit/projects-gallery/${data._id}`);
                    }}
                  >
                    <Edit />
                    <Typography textAlign="center">Edit</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseProjectMenu();
                      dispatch(deleteProject(userInfo, data._id));
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
          title={data.name.slice(0, 16)}
          subheader={"@" + user.username}
        />
        <CardMedia sx={{ height: "134px" }}>
          {data.video_url && (
            <video
              width="100%"
              height="134"
              controls
              style={{ objectFit: "cover" }}
            >
              <source src={data.video_url} type="video/mp4" />
            </video>
          )}
          {!data.video_url && (
            <img
              src={data.images_url[0]}
              style={{ height: "134px", width: "100%", objectFit: "cover" }}
              alt=""
            />
          )}
        </CardMedia>
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
            <IconButton
              aria-label="add to favorites"
              sx={{ fontSize: "18px" }}
              onClick={likeHandler}
            >
              {likeVal ? (
                <Favorite sx={{ color: "red", fontSize: "18px" }} />
              ) : (
                <FavoriteBorder sx={{ color: "red", fontSize: "18px" }} />
              )}
              <span style={{ paddingLeft: "2px" }}>{count}</span>
            </IconButton>
            <IconButton aria-label="message" sx={{ fontSize: "18px" }}>
              <TextsmsRounded sx={{ fontSize: "18px" }} />{" "}
              <span style={{ paddingLeft: "2px" }}>
                {data?.comments.length}
              </span>
            </IconButton>
            <IconButton aria-label="visibility" sx={{ fontSize: "18px" }}>
              <Visibility sx={{ fontSize: "18px" }} />{" "}
              <span style={{ paddingLeft: "2px" }}>
                {data.viewsCount ? data.viewsCount : 0}
              </span>
            </IconButton>
          </div>
          <div>
            <IconButton aria-label="share" sx={{ fontSize: "18px" }}>
              <Share sx={{ fontSize: "18px" }} />
            </IconButton>
          </div>
        </CardActions>
        <Divider />
        <CardContent
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            margin: "5px 0 10px",
            padding: "0 10px",
          }}
        >
          {data.required_skills.map((skill, i) => (
            <span
              key={i}
              style={{
                padding: "3px 6px",
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
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProjectCard;
