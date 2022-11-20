import React, { useEffect, useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import StepComponent from "../component/StepComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import * as yup from "yup";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Spinner from "../component/Spinner";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const urlRegex =
  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

const validationSchema = yup.object({
  image: yup
    .mixed()
    .required("Project image is required")
    .test("fileSize", "The file is too large", (value) => {
      return value && value.size <= 10 * 1024 * 1024;
    })
    .test(
      "type",
      "Only the following formats are accepted: .jpeg, .jpg, .png",
      (value) => {
        return (
          value &&
          (value.type === "image/jpeg" ||
            value.type === "image/jpg" ||
            value.type === "image/png")
        );
      }
    ),
  project_title: yup
    .string("Enter the project title")
    .required("Project title is required"),
  project_date: yup.date("Enter the project completion date"),
  source_code_link: yup
    .string("Enter the source code link")
    .matches(urlRegex, "Enter a valid link")
    .required("Source code link is required"),
  deployed_link: yup
    .string("Enter the deployed link")
    .matches(urlRegex, "Enter a valid link"),
  demo_video_link: yup
    .string("Enter the demo video link")
    .matches(urlRegex, "Enter a valid link"),
  project_tags: yup.array(yup.string()),
  project_description: yup
    .string("Enter the project description")
    .max(1000, "Maximum allowed characters are 500.")
    .required("Project description is required"),
});

const ProjectPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, [userInfo, navigate]);

  const handleSubmit = (values) => {
    console.log(values);
    const form = new FormData();
    //form.append("profile_image", profile.profileImg);
    form.append("project_title", values.project_title);
    form.append("project_date", values.project_date);
    form.append("source_code_link", values.source_code_link);
    form.append("demo_video_link", values.demo_video_link);
    form.append("deployed_link", values.deployed_link);
    form.append("project_description", values.project_description);
    tags.map((tag) => form.append("skills", tag));
    form.append("image", values.image);
    console.log(form);

    // dispatch(updateProfile(userInfo, form));
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [tags, setTags] = useState([]);
  const [photoURL, setPhotoURL] = useState();

  const formik = useFormik({
    initialValues: {
      project_title: "",
      project_date: "",
      source_code_link: "",
      deployed_link: "",
      demo_video_link: "",
      project_description: "",
      image: null,
      //project_tags: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      console.log(tags);
      handleSubmit(values);
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
          {!photoURL && (
            <div
              style={{
                height: "220px",
                width: "350px",
                backgroundColor: "#bbb",
                borderRadius: "4px",
                margin: "20px",
              }}
            ></div>
          )}
          {photoURL && (
            <img
              style={{
                height: "220px",
                width: "350px",
                borderRadius: "4px",
                margin: "20px",
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
            }}
          >
            <input
              type="file"
              id="image"
              name="image"
              //value={formik.values.image}
              onChange={(event) => {
                formik.setFieldValue("image", event.currentTarget.files[0]);
                setPhotoURL(URL.createObjectURL(event.target.files[0]));
              }}
              //error={formik.touched.project_title && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
              hidden
            />
            Choose image*
          </Button>
          <Grid container sx={{ margin: "20px" }}>
            <Grid item md={6}>
              <TextField
                fullWidth
                id="project_title"
                name="project_title"
                label="Project Title*"
                placeholder="Enter project title"
                sx={{ width: matches ? "350px" : "560px" }}
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
              <TextField
                fullWidth
                id="source_code_link"
                name="source_code_link"
                label="Source Code Link*"
                type="url"
                sx={{ width: matches ? "350px" : "560px" }}
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
              <TextField
                fullWidth
                id="demo_video_link"
                type="url"
                name="demo_video_link"
                label="Demo Video Link"
                sx={{ width: matches ? "350px" : "560px" }}
                value={formik.values.demo_video_link}
                onChange={formik.handleChange}
                error={
                  formik.touched.demo_video_link &&
                  Boolean(formik.errors.demo_video_link)
                }
                helperText={
                  formik.touched.demo_video_link &&
                  formik.errors.demo_video_link
                }
                margin="normal"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                id="project_date"
                name="project_date"
                label={`Project Date`.padStart(24)}
                type="date"
                sx={{ width: matches ? "350px" : "560px" }}
                value={formik.values.project_date}
                onChange={formik.handleChange}
                error={
                  formik.touched.project_date &&
                  Boolean(formik.errors.project_date)
                }
                helperText={
                  formik.touched.project_date && formik.errors.project_date
                }
                margin="normal"
              />
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Project Date"
                  value={formik.values.project_date}
                  onChange={formik.handleChange}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      color="primary"
                      id="project_date"
                      name="project_date"
                      sx={{ width: matches ? "350px" : "560px" }}
                      error={
                        formik.touched.project_date &&
                        Boolean(formik.errors.project_date)
                      }
                      helperText={
                        formik.touched.project_date &&
                        formik.errors.project_date
                      }
                      margin="normal"
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider> */}
              <TextField
                fullWidth
                id="deployed_link"
                type="url"
                name="deployed_link"
                label="Deployed Link"
                sx={{ width: matches ? "350px" : "560px" }}
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
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <TagsInput
                fullWidth
                size="small"
                id="project_tags"
                name="project_tags"
                placeHolder="Project Tags"
                // style={{ width: "100%", margin: "20px" }}
                maxTags={10}
                // value={formik.values.project_tags}
                // onChange={formik.handleChange}
                // error={
                //   formik.touched.project_tags && Boolean(formik.errors.project_tags)
                // }
                // helperText={
                //   formik.touched.project_tags && formik.errors.project_tags
                // }
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
                sx={{
                  width: matches ? "350px" : "100%",
                }}
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

export default ProjectPage;
