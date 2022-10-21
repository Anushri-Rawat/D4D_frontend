import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
const SigninForm = ({ formik }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid container justifyContent="center">
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: matches ? "350px" : "470px" }}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: matches ? "350px" : "470px" }}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
        />
        {error && (
          <Typography
            paragraph
            align="center"
            sx={{ marginBottom: "0", color: "red" }}
          >
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          type="submit"
          size="large"
          sx={{
            borderRadius: "22px",
            color: "#fff",
            fontWeight: "500",
            padding: "10px 64px",
            margin: "30px auto",
            display: "block",
          }}
        >
          {" "}
          {loading && <Spinner />}
          SIGN IN
        </Button>
      </form>
    </Grid>
  );
};
export default SigninForm;
