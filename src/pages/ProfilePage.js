import StepComponent from "../component/StepComponent";
import { Button, TextField, Grid, Container, IconButton } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

const ProfilePage = () => {
  return (
    <Container sx={{ minHeight: "75vh" }}>
      <StepComponent />
      <Grid container spacing={3}>
        <Grid item sm={12} md={6}>
          <TextField
            fullWidth
            name="fullname"
            label="Full Name"
            type="text"
          ></TextField>
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            type="email"
          ></TextField>
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            fullWidth
            name="title"
            label="Title"
            type="text"
          ></TextField>
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField fullWidth name="city" label="City" type="text"></TextField>
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            fullWidth
            name="country"
            label="Country"
            type="text"
          ></TextField>
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            fullWidth
            name="mySkills"
            label="My Skills"
            type="text"
          ></TextField>
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            fullWidth
            name="aboutYou"
            label="About Yourself"
            type="aboutYou"
            multiline
            rows={4}
          ></TextField>
        </Grid>
      </Grid>
      <Button
        sx={{
          margin: "15px 0",
          borderRadius: "4px",
          fontWeight: "600",
        }}
        variant="contained"
      >
        <SaveAltIcon sx={{ color: "#fff", paddingRight: "5px" }} />
        Save
      </Button>
    </Container>
  );
};
export default ProfilePage;
