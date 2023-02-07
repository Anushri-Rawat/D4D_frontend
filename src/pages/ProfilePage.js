import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Stack,
  Paper,
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Tab,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import bg from "../images/background-wallpaper-with-polygons-in-gradient-colors-vector.jpg";
import {
  EditRounded,
  PersonRounded,
  Share,
  Edit,
  Add,
  Science,
  Chat,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/system";
import ProjectCard from "../component/ProjectCard";
import { getProfileById } from "../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../component/Spinner";
import { toast } from "react-toastify";
import {
  getMostViewedProjects,
  getProjectList,
} from "../actions/projectActions";
import {
  PROJECT_LIST_SUCCESS,
  PROJECT_DELETE_RESET,
} from "../constants/projectConstants";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "2px",
}));

const ProfilePage = () => {
  const [value, setValue] = useState("1");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(770));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, profileInfo } = useSelector((state) => state.userProfile);
  const { userInfo } = useSelector((state) => state.userLogin);

  const { projects, loading: projectLoading } = useSelector(
    (state) => state.projectList
  );

  const { success: deleteSuccess, id: deletedId } = useSelector(
    (state) => state.projectDelete
  );

  const {
    success: viewedProjectsSuccess,
    error: viewedProjectsError,
    projects: viewedProjects,
    loading: viewedProjectsLoading,
  } = useSelector((state) => state.viewedProjects);

  useEffect(() => {
    //document.body.style.overflow = "hidden";
    if (!userInfo) {
      navigate("/signin");
    }
    dispatch(getProjectList(id, userInfo));
    dispatch(getMostViewedProjects());
  }, [id, userInfo]);

  useEffect(() => {
    if (deleteSuccess) {
      dispatch({
        type: PROJECT_LIST_SUCCESS,
        payload: projects.filter((p) => p._id !== deletedId),
      });
      toast.success("project deleted successfully!");
      dispatch({ type: PROJECT_DELETE_RESET });
    }
  }, [deleteSuccess, deletedId]);

  useEffect(() => {
    if (profileInfo && !profileInfo.username) {
      toast.error("profile with this id does not exist");
      navigate("/");
    }
    if (!profileInfo) {
      dispatch(getProfileById(id));
    }
  }, [profileInfo]);

  return !loading ? (
    <Container
      sx={{
        padding: { xs: "0", sm: "40px" },
        height: "100%",
        overflow: "hidden!important",
      }}
    >
      <Stack
        direction="row"
        sx={{
          flexDirection: matches ? "column" : "row",
          gap: matches ? 0 : "1.5rem",
        }}
      >
        <Item
          elevation={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: matches ? "100%" : "32%",
            textAlign: "left",
            color: "#000",
            padding: 0,
            minHeight: matches ? "50vh" : "85vh",
            height: "max-content",
          }}
        >
          <Box as="div" sx={{ position: "relative" }}>
            <img src={bg} alt="background" height={130} width={"100%"} />
            <Avatar
              src={profileInfo?.profile_image}
              alt="profile-picture"
              sx={{
                width: "100px",
                height: "100px",
                position: "absolute",
                bottom: "-40px",
                left: "10px",
                border: "2px solid #fff",
              }}
            />
          </Box>
          <Box
            sx={{
              marginTop: "52px",
              padding: "0 15px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {profileInfo?.full_name}
            </Typography>
            <Typography variant="p">@{profileInfo?.username}</Typography>
            <Typography variant="p" sx={{ color: "#777" }}>
              {profileInfo?.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: "1.15rem", marginTop: "10px", fontWeight: 600 }}
            >
              My skills are
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {profileInfo?.skills.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    padding: "4px 8px",
                    borderRadius: "5px",
                    background: "#fff",
                    border: "1.5px solid rgba(23,124,226,.5)",
                    color: "rgba(23,124,226,.5)",
                    fontWeight: 600,
                  }}
                >
                  {skill}
                </span>
              ))}
            </Box>
            {userInfo._id === profileInfo?._id ? (
              <Button
                variant="outlined"
                startIcon={<EditRounded />}
                sx={{ margin: "20px 0 10px" }}
                onClick={() => navigate("/edit/basic-details")}
              >
                Edit Profile
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<Chat />}
                sx={{ margin: "20px 0 10px" }}
              >
                Request Chat
              </Button>
            )}
            <Button
              variant="contained"
              startIcon={<Share />}
              sx={{
                borderRadius: "2px",
                background: "#4cacbc ",
                marginBottom: "15px",
              }}
            >
              Share
            </Button>
          </Box>
        </Item>
        <Item
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: matches ? "100%" : "68%",
            textAlign: "left",
            color: "#000",
            padding: 0,
            marginLeft: { xs: 0 },
          }}
        >
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <TabList onChange={handleChange}>
                <Tab
                  icon={<PersonRounded />}
                  label="Profile"
                  value="1"
                  sx={{ display: "flex", flexDirection: "row" }}
                />
                <Tab
                  label="Projects"
                  icon={<Science />}
                  value="2"
                  sx={{ display: "flex", flexDirection: "row" }}
                />
              </TabList>
            </Box>

            <TabPanel
              value="1"
              sx={{
                padding: "24px 0",
              }}
            >
              <Box
                sx={{ padding: "5px", maxHeight: "100vh", overflowY: "scroll" }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    padding: "10px 16px",
                    border: "1px solid rgb(226 232 239)",
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                  >
                    <Typography
                      variant="p"
                      sx={{ fontSize: "1.25rem", fontWeight: 600 }}
                    >
                      About me
                    </Typography>
                    {userInfo._id === profileInfo?._id && (
                      <IconButton
                        sx={{ padding: 0, color: "#000" }}
                        onClick={() => navigate("/edit/basic-details")}
                      >
                        <Edit />
                      </IconButton>
                    )}
                  </Stack>
                  <Typography variant="p">
                    {profileInfo?.description}
                  </Typography>
                </Paper>
                <Paper
                  elevation={0}
                  sx={{
                    padding: "10px 16px",
                    margin: "15px 0",
                    border: "1px solid rgb(226 232 239)",
                  }}
                >
                  <Typography
                    variant="p"
                    sx={{
                      fontSize: "1.25rem",
                      fontWeight: 600,
                    }}
                  >
                    Top Projects
                  </Typography>
                  <Grid
                    container
                    spacing={3}
                    sx={{
                      minHeight: "250px",
                      marginTop: "6px",
                    }}
                  >
                    {viewedProjectsLoading && <Spinner />}
                    {!viewedProjectsLoading &&
                      viewedProjectsSuccess &&
                      viewedProjects.map((elem) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={6}
                            lg={4}
                            key={elem._id}
                          >
                            <ProjectCard data={elem} />
                          </Grid>
                        );
                      })}
                    {!viewedProjectsLoading &&
                      viewedProjectsSuccess &&
                      viewedProjects.length === 0 && (
                        <p>No projects to display</p>
                      )}
                    {!viewedProjectsLoading && viewedProjectsError && (
                      <p>Something went wrong.</p>
                    )}
                  </Grid>
                </Paper>
              </Box>
            </TabPanel>
            <TabPanel value="2" sx={{ padding: "24px 0" }}>
              <Paper
                elevation={0}
                sx={{
                  padding: "15px",
                  border: "1px solid rgb(226 232 239)",
                  maxHeight: "100vh",
                  overflowY: "scroll",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    All Projects
                  </Typography>
                  {userInfo._id === profileInfo?._id && (
                    <IconButton
                      onClick={() => {
                        navigate("/edit/projects-gallery");
                      }}
                    >
                      <Add sx={{ color: "#000" }} />
                    </IconButton>
                  )}
                </Box>
                <Grid container spacing={2}>
                  {!projectLoading &&
                    projects.map((project) => (
                      <Grid item xs={12} sm={6} md={6} lg={4} key={project._id}>
                        <ProjectCard data={project} />
                      </Grid>
                    ))}
                </Grid>
              </Paper>
            </TabPanel>
          </TabContext>
        </Item>
      </Stack>
    </Container>
  ) : (
    <Spinner />
  );
};

export default ProfilePage;
