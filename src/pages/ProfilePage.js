import React, { useState, useEffect, useRef } from "react";
import StepComponent from "../component/StepComponent";
import {
  Button,
  TextField,
  Grid,
  Container,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { TagsInput } from "react-tag-input-component";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile, updateProfile } from "../actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USER_PROFILE_UPDATE_RESET } from "../constants/userConstants";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const titleRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();
  const githubRef = useRef();
  const linkedinRef = useRef();
  const descriptionRef = useRef();

  const { userInfo } = useSelector((state) => state.userLogin);

  const { success: profileSuccess, error: profileError } = useSelector(
    (state) => state.userProfile
  );

  const { profileInfo } = useSelector((state) => state.userDetails);

  const [tags, setTags] = useState(
    profileInfo?.skills ? profileInfo.skills : []
  );
  const [profile, setProfile] = useState({
    profileImg: profileInfo?.profile_image ? profileInfo.profile_image : null,
    photoUrl: null,
  });

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    } else {
      if (!profileInfo || profileSuccess) {
        dispatch({ type: USER_PROFILE_UPDATE_RESET });
        dispatch(getMyProfile(userInfo));
      }
    }
    if (!profileSuccess) {
      toast.error(profileError);
    } else {
      toast.success("successfully updated personal information");
      navigate("/profile/projects-gallery");
    }
  }, [userInfo, navigate, dispatch, profileSuccess, profileInfo, profileError]);

  const handleChange = (value) => {
    setTags(value);
  };

  const uploadImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({
        ...profile,
        profileImg: file,
        photoUrl: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("profile_image", profile.profileImg);
    form.append("username", usernameRef.current.value);
    form.append("title", titleRef.current.value);
    form.append("city", cityRef.current.value);
    form.append("country", countryRef.current.value);
    form.append("description", descriptionRef.current.value);
    tags.map((tag) => form.append("skills", tag));
    form.append("linkedin_profile_link", linkedinRef.current.value);
    form.append("github_profile_link", githubRef.current.value);
    dispatch(updateProfile(userInfo, form));
  };

  return (
    <>
      <Container sx={{ minHeight: "75vh" }}>
        <Box sx={{ textAlign: "center", margin: "30px 0 0" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "600", fontSize: "2.25rem" }}
          >
            Lets get your profile ready!!
          </Typography>
          <Typography variant="p" style={{ opacity: "0.8", margin: "10px 0" }}>
            Remember, advertise best version of your work with clarity in
            vision. So that others find it easy to approach you. Vague words and
            numbers makes you unapproachable.
          </Typography>
        </Box>
        <StepComponent />
        <Box sx={{ padding: "1.5rem 0" }}>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <label htmlFor="profilePhoto">
                  <Avatar
                    src={
                      profile.photoUrl
                        ? profile.photoUrl
                        : profileInfo?.profile_image
                    }
                    sx={{
                      width: "180px",
                      height: "180px",
                      cursor: "pointer",
                    }}
                  />
                  <input
                    accept="image/*"
                    id="profilePhoto"
                    type="file"
                    name="image"
                    onChange={uploadImageHandler}
                  />
                </label>
              </Grid>
              <Grid item container spacing={3} xs={12} sm={8} md={9}>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    fullWidth
                    id="username"
                    label="Username"
                    type="text"
                    size="small"
                    inputRef={usernameRef}
                    defaultValue={profileInfo?.username}
                    required
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    fullWidth
                    id="fullname"
                    label="Full Name"
                    type="text"
                    size="small"
                    required
                    defaultValue={
                      userInfo?.first_name + " " + userInfo?.last_name
                    }
                    disabled
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    type="email"
                    size="small"
                    value={userInfo?.email}
                    required
                    disabled
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    fullWidth
                    id="title"
                    label="Title"
                    type="text"
                    size="small"
                    inputRef={titleRef}
                    defaultValue={profileInfo?.title}
                    required
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    fullWidth
                    id="city"
                    label="City"
                    size="small"
                    type="text"
                    defaultValue={profileInfo?.city}
                    inputRef={cityRef}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    fullWidth
                    id="country"
                    label="Country"
                    type="text"
                    size="small"
                    inputRef={countryRef}
                    defaultValue={profileInfo?.country}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    fullWidth
                    id="githubLink"
                    label="Github Link"
                    type="text"
                    size="small"
                    inputRef={githubRef}
                    defaultValue={profileInfo?.github_profile_link}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    fullWidth
                    id="linkedinLink"
                    label="Linkedin Link"
                    type="text"
                    size="small"
                    inputRef={linkedinRef}
                    defaultValue={profileInfo?.linkedin_profile_link}
                  ></TextField>
                </Grid>
                <Grid item sm={12}>
                  <TagsInput
                    fullWidth
                    size="small"
                    id="skills"
                    placeHolder="My Skills"
                    maxTags={10}
                    value={tags}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="aboutYou"
                    label="About Yourself(Max 300 words)"
                    type="aboutYou"
                    multiline
                    rows={5}
                    inputRef={descriptionRef}
                    defaultValue={profileInfo?.descriptionRef}
                  ></TextField>
                </Grid>
                <Grid item sx={{ paddingTop: "15px" }}>
                  <Button
                    type="submit"
                    sx={{
                      borderRadius: "4px",
                      fontWeight: "600",
                      backgroundColor: "#4cacbc",
                    }}
                    variant="contained"
                    startIcon={<SaveAltIcon />}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </>
  );
};
export default ProfilePage;
