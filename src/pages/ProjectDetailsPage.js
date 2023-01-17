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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
} from "@mui/material";
import {
  FavoriteBorder,
  Share,
  SaveAlt,
  Code,
  Public,
  Send,
  Favorite,
  Delete,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectDetails,
  updateLikesOfProject,
} from "../actions/projectActions";
import Spinner from "../component/Spinner";
import ImageGallery from "react-image-gallery";
import {
  createComment,
  getAllComments,
  updateComment,
} from "../actions/commentAction";
import { toast } from "react-toastify";
import {
  COMMENT_CREATE_RESET,
  COMMENT_DELETE_RESET,
  COMMENT_LIST_SUCCESS,
  COMMENT_UPDATE_RESET,
  REPLY_CREATE_RESET,
} from "../constants/commentConstants";
import {
  PROJECT_DETAILS_RESET,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_UPDATE_RESET,
} from "../constants/projectConstants";
import {
  getAllCollections,
  saveProjectById,
} from "../actions/collectionAction";
import CommentBody from "../component/CommentBody";
import AddToCollectionModal from "../component/AddToCollectionModal";

let poster = [];
const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [commentStatement, setCommentStatement] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [added, setAdded] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const { loading, projectInfo } = useSelector((state) => state.projectDetails);

  const { user } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    error: commentCreateError,
    success: commentCreateSuccess,
    comment: commentCreatedObj,
  } = useSelector((state) => state.commentCreate);

  const {
    error: commentDeleteError,
    success: commentDeleteSuccess,
    id: commentDeletedId,
  } = useSelector((state) => state.commentDelete);

  const {
    error: commentUpdateError,
    success: commentUpdateSuccess,
    comment: commentUpdatedObj,
  } = useSelector((state) => state.commentUpdate);

  const { commentArr, loading: commentLoading } = useSelector(
    (state) => state.commentList
  );

  const { project: updatedProject, success: projectUpdateSuccess } =
    useSelector((state) => state.projectUpdate);

  const {
    success: replyCreateSuccess,
    error: replyCreateError,
    reply: replyCreatedObj,
  } = useSelector((state) => state.replyCreate);

  const { collections } = useSelector((state) => state.collectionList);

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }

    dispatch(getProjectDetails(id));
    dispatch(getAllComments(userInfo, id));
    dispatch(getAllCollections());
    dispatch({ type: PROJECT_DETAILS_RESET });

    setAdded(false);
    setSelectedCollection("");
  }, [dispatch, id, userInfo]);

  useEffect(() => {
    if (projectUpdateSuccess) {
      dispatch({ type: PROJECT_DETAILS_SUCCESS, payload: updatedProject });
    }

    if (replyCreateSuccess) {
      dispatch({
        type: COMMENT_LIST_SUCCESS,
        payload: commentArr.map((c) =>
          c._id === replyCreatedObj._id ? replyCreatedObj : c
        ),
      });
      toast.success("reply successfully deleted");
      dispatch({ type: REPLY_CREATE_RESET });
    }

    if (!replyCreateSuccess && replyCreateError) {
      toast.error(replyCreateError);
      dispatch({ type: REPLY_CREATE_RESET });
    }
  }, [
    dispatch,
    replyCreateError,
    replyCreateSuccess,
    replyCreatedObj,
    projectUpdateSuccess,
    updatedProject,
  ]);

  useEffect(() => {
    if (commentDeleteSuccess) {
      dispatch({
        type: COMMENT_LIST_SUCCESS,
        payload: commentArr.filter((c) => c._id !== commentDeletedId),
      });
      toast.success("Comment successfully deleted");
      dispatch({ type: COMMENT_DELETE_RESET });
    }

    if (!commentDeleteSuccess && commentDeleteError) {
      toast.error(commentDeleteError);
      dispatch({ type: COMMENT_DELETE_RESET });
    }
  }, [dispatch, commentDeleteSuccess, commentDeleteError, commentDeletedId]);

  useEffect(() => {
    if (!editComment) {
      if (!commentCreateSuccess && commentCreateError) {
        toast.error(commentCreateError);
        dispatch({ type: COMMENT_CREATE_RESET });
      }

      if (commentCreateSuccess) {
        dispatch({
          type: COMMENT_LIST_SUCCESS,
          payload: [...commentArr, commentCreatedObj],
        });
        setCommentStatement("");
        toast.success("comment successfully added");
        dispatch({ type: COMMENT_CREATE_RESET });
      }
    } else {
      if (!commentUpdateSuccess && commentUpdateError) {
        toast.error(commentUpdateError);
        dispatch({ type: COMMENT_UPDATE_RESET });
      }

      if (commentUpdateSuccess) {
        toast.success("Comment successfully updated");
        setCommentStatement("");
        dispatch({
          type: COMMENT_LIST_SUCCESS,
          payload: commentArr.map((c) =>
            c._id === commentUpdatedObj._id ? commentUpdatedObj : c
          ),
        });
        dispatch({ type: COMMENT_UPDATE_RESET });
      }
    }
  }, [
    dispatch,
    editComment,
    commentCreateError,
    commentCreateSuccess,
    commentUpdateError,
    commentUpdateSuccess,
  ]);

  if (projectInfo?.images_url) {
    poster = projectInfo.images_url.map((img) => ({
      original: img,
      thumbnail: img,
      thumbnailLoading: "lazy",
    }));
  }
  if (projectInfo?.video_url) {
    poster.unshift({
      thumbnail: projectInfo?.images_url[0],
      thumbnailLoading: "lazy",
      renderItem() {
        return (
          <video
            controls
            style={{
              objectFit: "cover",
              width: "100%",
              cursor: "pointer",
            }}
          >
            <source src={projectInfo?.video_url} type="video/mp4" />
          </video>
        );
      },
    });
  }

  return (
    <Container sx={{ paddingTop: "32px" }}>
      {loading || !projectInfo?._id ? (
        <Spinner />
      ) : (
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={4} lg={5}>
            <ImageGallery
              items={poster}
              showBullets
              showPlayButton={false}
              showFullscreenButton={false}
              disableKeyDown={true}
              lazyLoad={true}
            />

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
                href={projectInfo?.source_code_link}
                sx={{ fontWeight: "600", color: "#777", cursor: "pointer" }}
              >
                <IconButton>
                  <Code />
                </IconButton>
                Source code
              </Link>
              <Link
                href={projectInfo?.deployed_link}
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
                    {projectInfo?.user_id?.title}
                  </Typography>
                  <Typography variant="p" sx={{ color: "rgb(115 121 128/1)" }}>
                    {projectInfo?.user_id?.city},{projectInfo?.user_id?.state}
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
                  onClick={() => {
                    setOpen(true);
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
                  ({commentArr?.length})
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
            {commentArr?.length > 0 ? (
              commentArr?.map((comment) => (
                <CommentBody
                  comment={comment}
                  setOpenModal={setOpenModal}
                  setCommentStatement={setCommentStatement}
                  setEditComment={setEditComment}
                  setCommentId={setCommentId}
                  key={comment._id}
                />
              ))
            ) : commentLoading ? (
              <Spinner />
            ) : (
              "No comments yet!!"
            )}
          </Grid>
        </Grid>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add to Collection"}</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src={projectInfo?.images_url?.[0]}
              alt="project image"
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <div style={{ display: "flex", padding: "10px 0", gap: "0.5rem" }}>
              <Avatar
                src={projectInfo?.user_id?.profile_image}
                alt="userProfile"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="subtitile1" sx={{ fontWeight: "600" }}>
                  {projectInfo?.name}
                </Typography>
                <span>@{projectInfo?.user_id?.username}</span>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {collections?.map((coll) => (
              <AddToCollectionModal
                coll={coll}
                selectedCollection={selectedCollection}
                setSelectedCollection={setSelectedCollection}
                added={added}
                setAdded={setAdded}
                currentCard={coll._id}
                key={coll._id}
              />
            ))}
            <DialogActions>
              <Button onClick={handleClose} sx={{ color: "red" }}>
                Close
              </Button>
              <Button
                disabled={!added ? true : false}
                onClick={() => {
                  dispatch(
                    saveProjectById(projectInfo?._id, selectedCollection)
                  );
                  setOpen(false);
                }}
                variant="contained"
                sx={{ borderRadius: "5px" }}
              >
                Save
              </Button>
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ProjectDetailsPage;
