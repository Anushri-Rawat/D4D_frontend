import React from "react";
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { MoreVert, Edit, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../actions/commentAction";
import { toast } from "react-toastify";

const CommentBody = ({
  comment,
  setOpenModal,
  setCommentStatement,
  setEditComment,
  setCommentId,
}) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const handleOpenProjectMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseProjectMenu = () => {
    setAnchorElUser(null);
  };
  const commentEditHandler = (e) => {
    if (comment.user_id._id === userInfo._id) {
      setOpenModal(true);
      setEditComment(true);
      setCommentId(comment._id);
      setCommentStatement(comment.body);
      handleCloseProjectMenu();
    } else toast.error("Only the author can update its comment");
  };

  return (
    <Box sx={{ padding: ".5rem 0", display: "flex", gap: ".75rem" }}>
      <Avatar src={comment?.user_id?.profile_image} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
              {comment?.user_id?.first_name + " " + comment?.user_id?.last_name}
              <span style={{ paddingLeft: "5px" }}>{comment.createdAt}</span>
            </Typography>
            <Typography variant="p" sx={{ color: "rgb(115 121 128/1)" }}>
              {comment?.user_id?.title}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              color: "rgb(115 121 128/1)",
              fontWeight: "600",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <p>Reply</p>
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
                <MenuItem comment={comment} onClick={commentEditHandler}>
                  <Edit />
                  <Typography textAlign="center">Edit</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(deleteComment(userInfo, comment._id));
                    handleCloseProjectMenu();
                  }}
                >
                  <Delete />
                  <Typography textAlign="center">Delete</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </div>
        </div>
        <Typography variant="p">{comment.body}</Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: ".5rem",
          }}
        >
          <span>View replies</span>|<span>repliesCount</span>
        </div>
      </Box>
    </Box>
  );
};

export default CommentBody;
