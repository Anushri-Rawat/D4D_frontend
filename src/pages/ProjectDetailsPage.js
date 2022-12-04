import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Avatar,
  Box,
  Typography,
  Button,
  Link,
  Container,
  IconButton,
  TextField,
} from "@mui/material";
import {
  FavoriteBorder,
  Share,
  SaveAlt,
  Code,
  Public,
  Send,
  Favorite,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectDetails,
  updateLikesOfProject,
} from "../actions/projectActions";
import Loader from "../component/Loader";
import ImageGallery from "react-image-gallery";
import { createComment, updateComment } from "../actions/commentAction";
import { toast } from "react-toastify";
import {
  COMMENT_CREATE_RESET,
  COMMENT_DELETE_RESET,
  COMMENT_UPDATE_RESET,
} from "../constants/commentConstants";
import { PROJECT_UPDATE_RESET } from "../constants/projectConstants";
import CommentBody from "../component/CommentBody";

let poster = [];
const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [commentStatement, setCommentStatement] = useState("");

  const { loading, projectInfo } = useSelector((state) => state.projectDetails);
  const { user } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { error: commentCreateError, success: commentCreateSuccess } =
    useSelector((state) => state.commentCreate);
  const { error: commentDeleteError, success: commentDeleteSuccess } =
    useSelector((state) => state.commentDelete);
  const { error: commentUpdateError, success: commentUpdateSuccess } =
    useSelector((state) => state.commentUpdate);
  const { success: updateSuccess } = useSelector(
    (state) => state.projectUpdate
  );

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
    dispatch(getProjectDetails(id));

    if (updateSuccess) {
      dispatch({ type: PROJECT_UPDATE_RESET });
    }
    if (!editComment) {
      if (!commentCreateSuccess && commentCreateError) {
        toast.error(commentCreateError);
        dispatch({ type: COMMENT_CREATE_RESET });
      }
      if (commentCreateSuccess) {
        toast.success("comment successfully added");
        setCommentStatement("");
        dispatch({ type: COMMENT_CREATE_RESET });
      }
    } else {
      if (commentUpdateSuccess && !commentUpdateError) {
        toast.success("Comment successfully updated");
        setCommentStatement("");
        dispatch({ type: COMMENT_UPDATE_RESET });
      }
      if (!commentUpdateSuccess && commentUpdateError) {
        toast.error(commentUpdateError);
        dispatch({ type: COMMENT_UPDATE_RESET });
      }
    }
    if (!commentDeleteSuccess && commentDeleteError) {
      toast.error(commentDeleteError);
      dispatch({ type: COMMENT_DELETE_RESET });
      dispatch(getProjectDetails(id));
    }
    if (commentDeleteSuccess) {
      toast.success("Comment successfully deleted");
      dispatch({ type: COMMENT_DELETE_RESET });
    }
  }, [
    dispatch,
    id,
    editComment,
    commentCreateError,
    commentCreateSuccess,
    commentDeleteError,
    commentUpdateError,
    commentUpdateSuccess,
    editComment,
    updateSuccess,
    commentDeleteSuccess,
    userInfo,
  ]);

  if (projectInfo?.images_url) {
    poster = projectInfo.images_url.map((img) => ({
      original: img,
      thumbnail: img,
      originalHeight: "210px",
      originalWidth: "100%",
    }));
    poster.push({ original: projectInfo?.video_url });
  }

  return (
    <Container sx={{ paddingTop: "32px" }}>
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={4} lg={5}>
            <ImageGallery
              items={poster}
              showBullets
              showPlayButton={false}
              showFullscreenButton={false}
              disableKeyDown={true}
            />
            {/* {!poster.includes("mp4") ? (
              <video controls style={{ objectFit: "cover", width: "100%" }}>
                <source src={projectInfo?.video_url} type="video/mp4" />
              </video>
            ) : (
              <img
                src={poster}
                alt="img"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  maxHeight: "210px",
                }}
              />
            )}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4,minmax(0,1fr))",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <video
                controls
                style={{
                  objectFit: "cover",
                  width: "100%",
                  gridColumn: "span 1/span 1",
                  cursor: "pointer",
                }}
                onClick={() => setPoster(projectInfo?.video_url)}
              >
                <source src={projectInfo?.video_url} type="video/mp4" />
              </video>
              {projectInfo?.images_url?.map((img, i) => (
                <img
                  style={{
                    gridColumn: "span 1/span 1",
                    width: "100%",
                    cursor: "pointer",
                  }}
                  src={img}
                  alt={`images${i}`}
                  key={i}
                  onClick={() => setPoster(img)}
                />
              ))} 
            </Box>*/}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginTop: "1rem",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link
                to={projectInfo?.source_code_link}
                sx={{ fontWeight: "600", color: "#777", cursor: "pointer" }}
              >
                <IconButton>
                  <Code />
                </IconButton>
                Souce code
              </Link>
              <Link
                to={projectInfo?.deployed_link}
                sx={{ fontWeight: "600", color: "#777", cursor: "pointer" }}
              >
                <IconButton>
                  <Public />
                </IconButton>
                Deployed Link
              </Link>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={7}
            sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row" },
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: ".5rem",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Avatar
                  sx={{ height: "62px", width: "62px" }}
                  src={projectInfo?.user_id?.profile_image}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: "600",
                      lineHeight: "1.4",
                    }}
                  >
                    {projectInfo?.user_id?.first_name +
                      " " +
                      projectInfo?.user_id?.last_name}
                  </Typography>
                  <Typography variant="p" sx={{ color: "rgb(115 121 128/1)" }}>
                    Frontend web developer
                  </Typography>
                  <Typography variant="p" sx={{ color: "rgb(115 121 128/1)" }}>
                    Location
                  </Typography>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    color: "rgb(69 72 77/1)",
                    borderColor: "rgb(69 72 77/1)",
                  }}
                >
                  <Share />
                  Share
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: "rgb(69 72 77/1)",
                    borderColor: "rgb(69 72 77/1)",
                  }}
                >
                  <SaveAlt />
                  Save
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: "rgb(69 72 77/1)",
                    borderColor: "rgb(69 72 77/1)",
                  }}
                  onClick={() => {
                    dispatch(updateLikesOfProject(userInfo, projectInfo?._id));
                  }}
                >
                  {projectInfo?.likes?.find((key) => key === userInfo._id) ? (
                    <Favorite sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorder sx={{ color: "red" }} />
                  )}
                  Like({projectInfo?.likesCount})
                </Button>
              </div>
            </Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: "2.25rem",
                lineHeight: "2.5rem",
                fontWeight: "600",
              }}
            >
              {projectInfo?.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
                margin: "7px 0 12px",
                padding: "0 10px",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {projectInfo?.required_skills?.map((skill, i) => (
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
            <Typography variant="p">{projectInfo?.description}</Typography>
            <Box
              sx={{
                display: "flex",
                borderBottom: "1px solid #777",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "0.7rem",
              }}
            >
              <div
                style={{
                  color: "rgb(23 24 26/1)",
                  gap: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "500" }}>
                  Comments
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "500" }}>
                  ({projectInfo?.commentsCount})
                </Typography>
              </div>
              <div>
                <Button
                  variant="contained"
                  sx={{ borderRadius: "4px", backgroundColor: "#4cacbc" }}
                  onClick={() => setOpenModal(true)}
                >
                  Post comment
                </Button>
              </div>
            </Box>
            {openModal && (
              <Box
                sx={{
                  borderBottom: "1px solid #777",
                  padding: "10px 0 15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    flex: 1,
                    width: "100%",
                  }}
                >
                  <Avatar src={user.profile_image} />
                  <TextField
                    placeholder={`comment as ${user.full_name}`}
                    value={commentStatement}
                    onChange={(e) => setCommentStatement(e.target.value)}
                    fullWidth
                    size="small"
                  />
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Button variant="text" onClick={() => setOpenModal(false)}>
                    Cancel
                  </Button>
                  {editComment ? (
                    <Button
                      variant="outlined"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        if (commentId) {
                          dispatch(
                            updateComment(
                              userInfo,
                              { body: commentStatement },
                              commentId
                            )
                          );
                        }
                      }}
                    >
                      <Send />
                      Update
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        dispatch(
                          createComment(
                            userInfo,
                            { body: commentStatement },
                            projectInfo._id
                          )
                        );
                      }}
                    >
                      <Send />
                      Post
                    </Button>
                  )}
                </div>
              </Box>
            )}
            {projectInfo?.comments?.length > 0
              ? projectInfo.comments.map((comment) => (
                  <CommentBody
                    comment={comment}
                    setOpenModal={setOpenModal}
                    setCommentStatement={setCommentStatement}
                    setEditComment={setEditComment}
                    setCommentId={setCommentId}
                    key={comment._id}
                  />
                ))
              : "No comments yet!!"}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ProjectDetailsPage;
