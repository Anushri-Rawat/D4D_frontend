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

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Box sx={{ flexGrow: 1, marginTop: "30px" }}>
        <h5
          style={{
            textAlign: "center",
            fontSize: "45px",
            padding: "20px 0",
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
            fontSize: "45px",
            padding: "20px 0",
            fontWeight: 600,
          }}
        >
          Features
        </h5>
        <Box sx={{ display: "flex" }}>
          <img
            src="https://img.freepik.com/free-vector/modern-productivity-concept-with-flat-design_23-2147972848.jpg?w=740&t=st=1665594057~exp=1665594657~hmac=b2fe4196354aef239a9e17552bde7788e091a39fa1ccc8ff8f967d66e29c04d1"
            alt="projects"
            style={{ width: "50%" }}
          />
          <div className="description">
            <h2
              style={{
                fontSize: "32px",
                padding: "60px 0 10px",
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
          </div>
        </Box>
        <Box sx={{ display: "flex" }}>
          <div className="description">
            <h2
              style={{
                fontSize: "32px",
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
          </div>
          <img
            src="https://img.freepik.com/free-vector/push-notifications-concept-illustration_114360-4986.jpg?w=740&t=st=1665593989~exp=1665594589~hmac=41d1f5f60f6d5b0cad44b8a7b42484695b495eebfc21b8379bba1a2de7f82f0b"
            alt="chats"
            style={{ width: "50%" }}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <img
            src="https://img.freepik.com/free-vector/illustration-characters-fixing-cogwheel_53876-40796.jpg?w=740&t=st=1665594167~exp=1665594767~hmac=ea199f49d33dea4abdb02ed664e515b9b691a55a2999b7a7ae54c4492783170f"
            alt="portfolio"
            style={{ width: "50%" }}
          />
          <div className="description">
            <h2
              style={{
                fontSize: "32px",
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
          </div>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
