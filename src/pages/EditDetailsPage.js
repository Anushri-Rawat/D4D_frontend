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
  MenuItem,
} from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { TagsInput } from "react-tag-input-component";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile, updateSelfProfile } from "../actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USER_DETAILS_UPDATE_RESET } from "../constants/userConstants";
import stateCountry from "state-country";

const EditDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const titleRef = useRef();
  const githubRef = useRef();
  const linkedinRef = useRef();
  const descriptionRef = useRef();

  const { userInfo } = useSelector((state) => state.userLogin);

  const { user, userSuccess, userError } = useSelector(
    (state) => state.userDetails
  );

  const [tags, setTags] = useState([]);
  const [country, setCountry] = useState(user?.country || "");
  const [state, setState] = useState(user?.country || "");
  const [profile, setProfile] = useState({
    profileImg: user?.profile_image ? user.profile_image : null,
    photoUrl: null,
  });

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    } else {
      if (!user || !user.username || userSuccess) {
        dispatch({ type: USER_DETAILS_UPDATE_RESET });
        dispatch(getMyProfile(userInfo));
      } else {
        usernameRef.current.value = user?.username || "";
        descriptionRef.current.value = user?.description || "";
        titleRef.current.value = user?.title || "";
        githubRef.current.value = user?.github_profile_link || "";
        linkedinRef.current.value = user?.linkedin_profile_link || "";
        setCountry(user?.country || "");
        setState(user?.state || "");
        setTags(user?.skills || []);
      }
    }
    if (!userSuccess) {
      toast.error(userError);
    } else {
      toast.success("successfully updated personal information");
      navigate("/profile/projects-gallery");
    }
  }, [userInfo, navigate, dispatch, userSuccess, user, userError]);

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
    form.append("state", state);
    form.append("country", country);
    form.append("description", descriptionRef.current.value);
    tags.map((tag) => form.append("skills", tag));
    form.append("linkedin_profile_link", linkedinRef.current.value);
    form.append("github_profile_link", githubRef.current.value);
    dispatch(updateSelfProfile(userInfo, form));
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
                      profile.photoUrl ? profile.photoUrl : user?.profile_image
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
                    id="username"
                    label="Username"
                    type="text"
                    size="small"
                    fullWidth
                    inputRef={usernameRef}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    fullWidth
                    id="fullname"
                    label="Full Name"
                    type="text"
                    size="small"
                    required
                    defaultValue={userInfo?.full_name}
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
                    defaultValue={userInfo?.email}
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
                    InputLabelProps={{ shrink: true }}
                    required
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    id="country"
                    select
                    label="Country"
                    value={country}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setCountry(e.target.value)}
                    fullWidth
                  >
                    {stateCountry.getAllCountries().map((option) => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    id="state"
                    select
                    label="State"
                    value={state}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setState(e.target.value)}
                    fullWidth
                  >
                    {stateCountry
                      .getAllStatesInCountry(country)
                      .map((option) => (
                        <MenuItem key={option.id} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    fullWidth
                    id="githubLink"
                    label="Github Link"
                    type="text"
                    size="small"
                    inputRef={githubRef}
                    InputLabelProps={{ shrink: true }}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    fullWidth
                    id="linkedinLink"
                    label="Linkedin Link"
                    size="small"
                    type="text"
                    inputRef={linkedinRef}
                    InputLabelProps={{ shrink: true }}
                  ></TextField>
                </Grid>
                <Grid item sm={12}>
                  <TagsInput
                    fullWidth
                    size="small"
                    id="tags"
                    maxTags={10}
                    value={tags}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="description"
                    label="About Yourself(Max 300 words)"
                    type="text"
                    multiline
                    rows={5}
                    inputRef={descriptionRef}
                    InputLabelProps={{ shrink: true }}
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
export default EditDetailsPage;
