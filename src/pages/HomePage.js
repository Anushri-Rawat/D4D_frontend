import React from "react";
import HeroSection from "../component/HeroSection";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from "@mui/material";
import img1 from "../images/DrawKit Vector Illustration Project Manager (6).png";
import img2 from "../images/DrawKit Vector Illustration Project Manager (1).png";
import img3 from "../images/DrawKit Vector Illustration Project Manager (10).png";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Box sx={{ flexGrow: 1 }}>
        <h5
          style={{
            textAlign: "center",
            fontSize: "35px",
            padding: "18px 0",
            fontWeight: 600,
          }}
        >
          Top Projects
        </h5>
        <Grid container spacing={3}>
          <Grid item sm={6} md={3}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://th.bing.com/th/id/OIP.MMbedKRM_zUpxYlyuBl7GQHaDt?pid=ImgDet&rs=1"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item sm={6} md={3}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://th.bing.com/th/id/OIP.MMbedKRM_zUpxYlyuBl7GQHaDt?pid=ImgDet&rs=1"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item sm={6} md={3}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://th.bing.com/th/id/OIP.MMbedKRM_zUpxYlyuBl7GQHaDt?pid=ImgDet&rs=1"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item sm={6} md={3}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://th.bing.com/th/id/OIP.MMbedKRM_zUpxYlyuBl7GQHaDt?pid=ImgDet&rs=1"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", marginTop: "30px" }}>
        <h5
          style={{
            textAlign: "center",
            fontSize: "35px",
            padding: "18px 0",
            fontWeight: 600,
          }}
        >
          Features
        </h5>
        <Box
          sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
        >
          <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
            <img
              src={img1}
              style={{ width: "100%", objectFit: "cover" }}
              alt="projects"
            />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
            <h2
              style={{
                fontSize: "28px",
                padding: "50px 0 10px",
                fontWeight: 600,
              }}
            >
              #Top voted Projects
            </h2>
            <p>
              We welcome all stacks techies to join and showcase their work. The
              source code and videos attached to their projects provide others
              with a better understanding of the projects content.
            </p>
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
        >
          <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
            <h2
              style={{
                fontSize: "28px",
                padding: "60px 0 10px",
                fontWeight: 600,
              }}
            >
              #Chat with other developers
            </h2>
            <p>
              We want our users to be able to communicate with coders through
              our platform. Embrace collaboration, connect with others, and
              code. A simple glance at your showcased projects will connect you
              directly with startups and top-notch companies.
            </p>
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
            <img
              src={img2}
              style={{ width: "100%", objectFit: "cover" }}
              alt="chats"
            />
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
        >
          <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
            <img
              src={img3}
              style={{ width: "100%", objectFit: "cover" }}
              alt="portfolio"
            />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
            <h2
              style={{
                fontSize: "28px",
                padding: "60px 0 10px",
                fontWeight: 600,
              }}
            >
              #Show it on portfolio
            </h2>
            <p>
              It will add to your portfolio.Having been part of many tech
              community is a sign of good geek.
            </p>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
