import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { Divider } from "@mui/material";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { styled } from "@mui/material/styles";
import { fontSize } from "@mui/system";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
  display: "flex",
  alignItems: "flex-end",
  fontSize: "18px",
  fontWeight: "600",
}));
const ProjectCard = ({ data }) => {
  const user = data.user ? data.user[0] : data.user_id;
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: "#4cacbc" }} aria-label="recipe">
            {user.profile_image === "null" &&
              user.username.substring(0, 1).toUpperCase()}
            {user.profile_image != "null" && (
              <img
                src={user.profile_image}
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                alt=""
              />
            )}
          </Avatar>
        }
        title={data.name}
        subheader={`@${user.username}`}
      />
      <Divider />
      <CardMedia>
        {data.video_url && (
          <video width="100%" height="240" controls>
            <source src={data.video_url} type="video/mp4" />
          </video>
        )}
        {!data.video_url && (
          <img
            src={data.images_url[0]}
            style={{ height: "240px", width: "100%" }}
            alt=""
          />
        )}
      </CardMedia>
      <CardContent>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {data.required_skills.slice(0, 3).map((elem) => {
            return (
              <Chip
                label={elem}
                sx={{
                  textTransform: "capitalize",
                  margin: "4px",
                }}
                variant="outlined"
              />
            );
          })}
          {data.required_skills.length > 3 && (
            <Chip
              label={`+ ${data.required_skills.length - 3}`}
              sx={{
                textTransform: "capitalize",
                margin: "2px",
              }}
              variant="outlined"
            />
          )}
        </div>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "space-around" }}>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Item>
            <FavoriteBorderIcon
              sx={{ marginRight: "6px", color: "#4cacbc", fontSize: "20px" }}
            />
            {data.likes.length}
          </Item>
          <Item>
            <ChatBubbleOutlineIcon
              sx={{ marginRight: "6px", color: "#4cacbc", fontSize: "20px" }}
            />
            {data.comments.length}
          </Item>
          <Item>
            <RemoveRedEyeIcon
              sx={{ marginRight: "6px", color: "#4cacbc", fontSize: "20px" }}
            />
            {data.viewsCount ? data.viewsCount : 0}
          </Item>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
