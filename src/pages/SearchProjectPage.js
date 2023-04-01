import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProjects } from "../actions/projectActions";
import { ProjectCard, Spinner } from "../component";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";

const SearchProjectPage = (props) => {
  const [tech, setTech] = useState("");
  const [keyword, setKeyword] = useState("");
  const technologies = [
    "HTML",
    "CSS",
    "Javascript",
    "React.js",
    "Angular.js",
    "Vue.js",
    "Express.js",
    "Node.js",
    "Next.js",
    "Nest.js",
    "Bootstrap",
    "Material UI",
    "Mongo DB",
    "Ansible",
    "Android",
    ".NET CORE",
    "Alpine.js",
    "Apache Hadoop",
    "Apex",
    "AWS",
    "ASP.NET",
    "Bulma",
    "BackboneJS",
    "C",
    "C++",
    "C#",
    "Java",
    "Python",
    "Cassandra",
    "Django",
    "Docker",
    "CodeIgniter",
    "Cycle.js",
    "Electron",
    "Ember.js",
    "Elixir",
    "Flask",
    "Firebase",
    "Ember",
    "DynamoDB",
    "Flutter",
    "Gatsby Js",
    "GIT",
    "Github",
    "Golang",
    "GraphQL",
    "Hibernate",
    "ionic",
    "Jenkins",
    "jQuery",
    "Kotlin",
    "Kubernetes",
    "Laravel",
    "Machine Learning",
    "MariaDB",
    "Material",
    "Materialize",
    "MySQL",
    "Perl",
    "PHP",
    "PostgreSQL",
    "R",
    "React Native",
    "Redux",
    "Ruby",
    "Ruby on Rails",
    "Rust",
    "Salesforce Developer",
    "Scala",
    "SQL",
    "Spring",
    "Svelte",
    "Swift",
    "Tailwind CSS",
    "Typescript",
    "Unity",
    "Unreal",
    "Web3",
    "Zustand",
  ];
  const keywords = [
    "E-Commerce",
    "Social Media",
    "Job Search",
    "Resume Builder",
    "CRUD Application",
    "Trading",
    "Healthcare",
    "Gaming",
    "Authentication",
    "Checkout",
    "Landing Page",
    "Calculator",
    "Music Player",
    "Direct Messaging",
    "Analytics Chart",
    "Location Tracker",
    "Search",
    "TV App",
    "Crowdfunding",
    "Blogging",
    "Weather",
    "Calendar",
    "Recipe",
    "Workout Tracker",
    "ToDo List",
    "Video Player",
    "Color Picker",
    "Hotel Booking",
    "Flight Search",
    "Event Listing",
    "Download App",
    "Currency Converter",
    "Email Application",
    "Portfolio",
    "E-Wallet",
    "Project Management",
    "Code Editor",
    "Travel Destination",
    "Real Estate",
  ];
  const matches = useMediaQuery("(min-width:1200px)");
  const matchesSm = useMediaQuery("(min-width:600px)");
  const { loading, error, projects } = useSelector(
    (state) => state.searchProjects
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjects(tech, keyword));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(getProjects(tech, keyword));
  };

  const defaultPropsTech = {
    options: technologies,
    getOptionLabel: (option) => option,
  };

  const defaultPropsKeywords = {
    options: keywords,
    getOptionLabel: (option) => option,
  };

  return (
    <Container sx={{ marginTop: "35px" }}>
      <Typography variant="h3" align="center" component="h1">
        Consider. Shape. Influence. Shine.
      </Typography>
      <Typography
        paragraph
        align="center"
        sx={{
          fontSize: "20px",
          margin: "30px auto 50px auto",
          maxWidth: "80%",
        }}
      >
        Perfection is achieved not when there is nothing more to add, but rather
        when there is nothing more to take away.” – Antoine de Saint-Exupery
      </Typography>
      <form
        style={{
          boxShadow: "0px 0px 4px #ddd",
          padding: matchesSm ? "20px 20px 20px 0" : "20px",
          marginLeft: matches ? "30px" : "0",
        }}
        onSubmit={submitHandler}
      >
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ padding: matchesSm ? "0 10px 0 20px" : "0 0 6px 0" }}
          >
            <Autocomplete
              {...defaultPropsTech}
              id="tech"
              value={tech}
              onChange={(event, newValue) => {
                setTech(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Technologies" />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ padding: matchesSm ? "0 10px 0 20px" : "6px 0 0 0" }}
          >
            <Autocomplete
              {...defaultPropsKeywords}
              id="keywords"
              value={keyword}
              onChange={(event, newValue) => {
                setKeyword(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Keywords" />
              )}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="searchBtn"
            sx={{
              width: "370px",
              margin: "20px auto 0 auto",
              padding: "10px 0",
              fontSize: "16px",
              backgroundColor: "#4bacab",
            }}
          >
            <SearchIcon /> Search
          </Button>
        </Grid>
      </form>
      <Grid
        container
        sx={{
          margin: "20px",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "40vh",
          marginLeft: matches ? "20px" : "0px",
        }}
      >
        {loading && <Spinner class={"loading-container"} />}
        {!loading &&
          !error &&
          projects.map((elem) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{ padding: "15px" }}
                key={elem._id}
              >
                <ProjectCard data={elem} />
              </Grid>
            );
          })}
        {!loading && !error && projects.length === 0 && (
          <Typography
            p
            sx={{
              margin: "initial auto",
              fontSize: "20px",
            }}
          >
            No projects found!
          </Typography>
        )}
        {!loading && error && (
          <Typography
            p
            sx={{
              margin: "initial auto",
              fontSize: "20px",
            }}
          >
            Something went wrong. Try again.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};
export default SearchProjectPage;
