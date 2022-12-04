import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Stack,
  Paper,
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Tab,
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
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/system";
import ProjectCard from "../component/ProjectCard";
import { getProfileById } from "../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../component/Loader";
import { toast } from "react-toastify";

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, profileInfo, success } = useSelector(
    (state) => state.userProfile
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (profileInfo) {
      if (!profileInfo.username) {
        toast.error("profile with this id does not exist");
        navigate("/");
      }
    } else {
      dispatch(getProfileById(id));
    }
  }, [id, userInfo, profileInfo]);
  return !loading ? (
    <Container
      sx={{
        padding: "40px",
        background: "rgb(250 251 255/1)",
      }}
    >
      <Stack direction="row" spacing={4}>
        <Item
          elevation={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
            textAlign: "left",
            color: "#000",
            padding: 0,
          }}
        >
          <Box as="div" sx={{ position: "relative" }}>
            <img src={bg} alt="background" height={112} width={"100%"} />
            <Avatar
              src={profileInfo?.profile_image}
              alt="profile-picture"
              sx={{
                width: "100px",
                height: "100px",
                position: "absolute",
                bottom: "-50px",
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
            <Button
              variant="outlined"
              startIcon={<EditRounded />}
              sx={{ margin: "20px 0 10px" }}
              onClick={() => navigate("/edit/basic-details")}
            >
              Edit Profile
            </Button>
            <Button
              variant="contained"
              startIcon={<Share />}
              sx={{ borderRadius: "2px", background: "#4cacbc " }}
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
            width: "70%",
            textAlign: "left",
            color: "#000",
            padding: 0,
          }}
        >
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                background: "rgb(250 251 255/1)",
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
                background: "rgb(250 251 255/1)",
              }}
            >
              <Box sx={{ padding: "5px" }}>
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
                    <IconButton
                      sx={{ padding: 0, color: "#000" }}
                      onClick={() => navigate("/edit/basic-details")}
                    >
                      <Edit />
                    </IconButton>
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
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <Typography
                      variant="p"
                      sx={{ fontSize: "1.25rem", fontWeight: 600 }}
                    >
                      Top Projects
                    </Typography>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Add />
                      <IconButton
                        sx={{ padding: 0, color: "#000" }}
                        onClick={() => navigate("/edit/basic-details")}
                      >
                        <Edit />
                      </IconButton>
                    </div>
                  </Stack>
                  <ProjectCard />
                </Paper>
              </Box>
            </TabPanel>
            <TabPanel
              value="2"
              sx={{ padding: "24px 0", background: "rgb(250 251 255/1)" }}
            >
              <Paper
                elevation={0}
                sx={{
                  padding: "15px",
                  border: "1px solid rgb(226 232 239)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, marginBottom: "15px" }}
                >
                  All Projects
                </Typography>
                <Box sx={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                  <ProjectCard />
                  <ProjectCard />
                  <ProjectCard />
                  <ProjectCard />
                  <ProjectCard />
                  <ProjectCard />
                </Box>
              </Paper>
            </TabPanel>
          </TabContext>
        </Item>
      </Stack>
    </Container>
  ) : (
    <Loader />
  );
};

export default ProfilePage;
