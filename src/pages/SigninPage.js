import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import img from "./../images/DrawKit Vector Illustration Project Manager (5).png";
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import SigninForm from "../component/SigninForm";
import { login } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  return (
    <Container maxWidth="xl">
      <Grid
        container
        justifyContent="space-between"
        sx={{
          minHeight: "calc(100vh - 35px)",

          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={6}>
          <div
            style={{
              backgroundColor: "#4cacbc",
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              position: "absolute",
              left: "10px",
              top: "10px",
            }}
          ></div>
          <div
            style={{
              backgroundColor: "#4cacbc",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              position: "absolute",
              left: "100px",
              top: "100px",
            }}
          ></div>

          <img src={img} alt="" style={{ width: "100%", marginLeft: "50px" }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <div
            style={{
              backgroundColor: "#4cacbc",
              width: "100px",
              height: "100px",
              borderRadius: "0 0 0 100%",
              position: "absolute",
              right: "0",
              top: "0",
            }}
          ></div>
          <Typography
            variant="h3"
            align="center"
            style={{
              color: "#4cacbc",
              fontWeight: "600",
              marginBottom: "30px",
            }}
          >
            Welcome Back!
          </Typography>
          <SigninForm formik={formik} />
          <Typography
            paragraph
            align="center"
            sx={{ fontSize: "15px", fontWeight: "500" }}
          >
            New here?{"  "}
            <RouterLink
              to="/signup"
              style={{ color: "#4cacbc", fontWeight: "600" }}
            >
              Create account
            </RouterLink>
          </Typography>
          <div
            style={{
              backgroundColor: "#4cacbc",
              width: "150px",
              height: "150px",
              borderRadius: "0 100% 0 0",
              position: "absolute",
              left: "0",
              bottom: "0",
            }}
          ></div>

          <div
            style={{
              backgroundColor: "#4cacbc",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              position: "absolute",
              right: "100px",
              bottom: "100px",
            }}
          ></div>
          <div
            style={{
              backgroundColor: "#4cacbc",
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              position: "absolute",
              right: "10px",
              bottom: "10px",
            }}
          ></div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;