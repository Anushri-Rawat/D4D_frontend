import React, { useEffect, useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import StepComponent from "../component/StepComponent";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import * as yup from "yup";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import {
  createProject,
  getProjectDetails,
  updateProject,
} from "../actions/projectActions";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  PROJECT_ADD_RESET,
  PROJECT_DETAILS_RESET,
  PROJECT_UPDATE_RESET,
} from "../constants/projectConstants";
const urlRegex =
  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

const validationSchema = yup.object({
  image: yup.mixed().required("Project image is required"),
  project_title: yup
    .string("Enter the project title")
    .required("Project title is required"),
  source_code_link: yup
    .string("Enter the source code link")
    .matches(urlRegex, "Enter a valid link")
    .required("Source code link is required"),
  deployed_link: yup
    .string("Enter the deployed link")
    .matches(urlRegex, "Enter a valid link"),
  project_tags: yup.array(yup.string()),
  project_description: yup
    .string("Enter the project description")
    .max(1000, "Maximum allowed characters are 500.")
    .required("Project description is required"),
});

const EditProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success, error, loading } = useSelector(
    (state) => state.projectCreate
  );
  const { projectInfo } = useSelector((state) => state.projectDetails);
  const { success: updateSuccess, error: updateError } = useSelector(
    (state) => state.projectUpdate
  );

  const [photoURL, setPhotoURL] = useState();
  const [videoURL, setVideoURL] = useState();

  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (id) {
      dispatch(getProjectDetails(id));
    }
  }, [id]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }

    formik.values.project_title = projectInfo?.name || "";
    formik.values.source_code_link = projectInfo?.source_code_link?.[0] || "";
    formik.values.deployed_link = projectInfo?.deployed_link || "";
    formik.values.project_description = projectInfo?.description || "";
    setTags(projectInfo?.required_skills || []);
    setStartDate(projectInfo?.project_start_date || dayjs());
    setEndDate(projectInfo?.project_end_date || dayjs());
    setPhotoURL(projectInfo?.images_url?.[0] || "");
    formik.values.image = projectInfo?.images_url || [];

    if (!loading && error) {
      toast.error(error);
      dispatch({ type: PROJECT_ADD_RESET });
    }
    if (!loading && success) {
      toast.success("project successfully added");
      dispatch({ type: PROJECT_ADD_RESET });
      navigate(`/profile/${userInfo._id}`);
    } else if (!id && projectInfo?.name) {
      dispatch({ type: PROJECT_DETAILS_RESET });
    }
    if (updateSuccess) {
      toast.success("Project Successfully updated");
      dispatch({ type: PROJECT_UPDATE_RESET });
      dispatch(getProjectDetails(id));
    }
    if (!updateSuccess && updateError) {
      toast.error(updateError);
      dispatch({ type: PROJECT_UPDATE_RESET });
    }
  }, [
    userInfo,
    navigate,
    error,
    success,
    loading,
    dispatch,
    projectInfo,
    updateSuccess,
    updateError,
  ]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const formik = useFormik({
    initialValues: {
      project_title: "",
      source_code_link: "",
      deployed_link: "",
      demo_video: "",
      project_description: "",
      image: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const form = new FormData();
      const video = new FormData();
      form.append("name", values.project_title);
      form.append("project_start_date", startDate);
      form.append("project_end_date", endDate);
      form.append("source_code_link", values.source_code_link);
      video.append("video_url", values.demo_video);
      form.append("deployed_link", values.deployed_link);
      form.append("description", values.project_description);
      tags.map((tag) => form.append("required_skills", tag));
      formik.values.image?.map((image) => form.append("images_url", image));
      if (!id) {
        dispatch(createProject(userInfo, form, video));
      } else {
        dispatch(updateProject(userInfo, form, id));
      }
    },
  });

  return (
    <Container>
      <Box sx={{ textAlign: "center", margin: "30px 0 0" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "600", fontSize: "2.25rem" }}
        >
          Add Projects
        </Typography>
        <Typography variant="p" style={{ opacity: "0.8", margin: "10px 0" }}>
          You are allowed to add as many projects as you want, Be very clear
          about what you are adding with in-detailed explanation to impress
          people who are having a look.
        </Typography>
      </Box>
      <StepComponent step1 />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            height: "1px",
            width: "100%",
            background: "rgb(138 147 155)",
          }}
        ></span>
        <Typography
          variant="h6"
          sx={{ whiteSpace: "nowrap", padding: "0 10px" }}
        >
          Project section
        </Typography>
        <span
          style={{
            height: "1px",
            width: "100%",
            background: "rgb(138 147 155)",
          }}
        ></span>
      </Box>
      <Grid container justifyContent="center">
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container style={{ justifyContent: "center" }}>
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!photoURL && (
                <div
                  style={{
                    height: "220px",
                    width: matches ? "250px" : "350px",
                    backgroundColor: "#bbb",
                    borderRadius: "4px",
                    margin: "20px auto",
                  }}
                ></div>
              )}
              {photoURL && (
                <img
                  style={{
                    height: "220px",
                    width: matches ? "250px" : "350px",
                    borderRadius: "4px",
                    margin: "20px auto",
                  }}
                  src={photoURL}
                  alt=""
                />
              )}
              <Button
                variant="contained"
                component="label"
                sx={{
                  borderRadius: "4px",
                  fontWeight: "600",
                  backgroundColor: "#4cacbc",
                  marginLeft: "20px",
                }}
              >
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "image",
                      formik.values.image.concat(event.currentTarget.files[0])
                    );
                    setPhotoURL(URL.createObjectURL(event.target.files[0]));
                  }}
                  helperText={formik.touched.image && formik.errors.image}
                  hidden
                />
                Choose image*
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!videoURL && (
                <div
                  style={{
                    height: "220px",
                    width: matches ? "250px" : "350px",
                    backgroundColor: "#bbb",
                    borderRadius: "4px",
                    margin: "20px auto",
                  }}
                ></div>
              )}
              {videoURL && (
                <video
                  width={matches ? "250px" : "350px"}
                  height="220"
                  controls
                  style={{
                    borderRadius: "4px",
                    margin: "20px auto",
                  }}
                >
                  <source src={videoURL} type="video/mp4" />
                </video>
              )}
              <Button
                variant="contained"
                component="label"
                sx={{
                  borderRadius: "4px",
                  fontWeight: "600",
                  backgroundColor: "#4cacbc",
                  marginLeft: "20px",
                }}
              >
                <input
                  type="file"
                  id="demo_video"
                  name="demo_video"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "demo_video",
                      event.currentTarget.files[0]
                    );
                    setVideoURL(URL.createObjectURL(event.target.files[0]));
                  }}
                  helperText={
                    formik.touched.demo_video && formik.errors.demo_video
                  }
                  hidden
                />
                Upload demo video
              </Button>
            </Grid>
          </Grid>

          <Grid container sx={{ margin: "20px" }}>
            <Grid item sm={6}>
              <TextField
                fullWidth
                id="project_title"
                name="project_title"
                label="Project Title*"
                placeholder="Enter project title"
                sx={{ width: "98%" }}
                value={formik.values.project_title}
                onChange={formik.handleChange}
                error={
                  formik.touched.project_title &&
                  Boolean(formik.errors.project_title)
                }
                helperText={
                  formik.touched.project_title && formik.errors.project_title
                }
                margin="normal"
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Project Start Date"
                  inputFormat="MM/DD/YYYY"
                  value={startDate}
                  onChange={(e) => setStartDate(e)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{
                        width: "98%",
                        marginTop: "10px",
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              <TextField
                fullWidth
                id="deployed_link"
                type="url"
                name="deployed_link"
                label="Deployed Link"
                sx={{ width: "98%" }}
                value={formik.values.deployed_link}
                onChange={formik.handleChange}
                error={
                  formik.touched.deployed_link &&
                  Boolean(formik.errors.deployed_link)
                }
                helperText={
                  formik.touched.deployed_link && formik.errors.deployed_link
                }
                margin="normal"
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                id="source_code_link"
                name="source_code_link"
                label="Source Code Link*"
                type="url"
                sx={{ width: "98%" }}
                value={formik.values.source_code_link}
                onChange={formik.handleChange}
                error={
                  formik.touched.source_code_link &&
                  Boolean(formik.errors.source_code_link)
                }
                helperText={
                  formik.touched.source_code_link &&
                  formik.errors.source_code_link
                }
                margin="normal"
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Project End Date"
                  inputFormat="MM/DD/YYYY"
                  value={endDate}
                  onChange={(e) => setEndDate(e)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{
                        width: "98%",
                        marginTop: "10px",
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <TagsInput
                size="small"
                id="required_skills"
                placeHolder="Project Tags"
                style={{ width: "100%", margin: "20px" }}
                maxTags={10}
                value={tags}
                onChange={(val) => setTags(val)}
              />
              <TextField
                fullWidth
                id="project_description"
                type="text"
                multiline
                rows={5}
                name="project_description"
                label="Project Description (max 1000 characters) *"
                sx={{ width: "100%", margin: "20px 0" }}
                value={formik.values.project_description}
                onChange={formik.handleChange}
                error={
                  formik.touched.project_description &&
                  Boolean(formik.errors.project_description)
                }
                helperText={
                  formik.touched.project_description &&
                  formik.errors.project_description
                }
                margin="normal"
              />
            </Grid>
            <Grid container sx={{ justifyContent: "flex-end" }}>
              <Grid item sm={4} md={1}>
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

          {/* {error && (
            <Typography
              paragraph
              align="center"
              sx={{ marginBottom: "0", color: "red" }}
            >
              {error}
            </Typography>
          )} */}
        </form>
      </Grid>
    </Container>
  );
};

export default EditProjectDetailsPage;
