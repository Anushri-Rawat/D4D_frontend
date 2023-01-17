import { Delete } from "@mui/icons-material";
import { Container, Grid, Typography, Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCollection } from "../actions/collectionAction";
import ProjectCard from "../component/ProjectCard";
import Spinner from "../component/Spinner";
import { COLLECTION_DETAILS_RESET } from "../constants/collectionConstants";

const CollectionDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { collection, loading, error } = useSelector(
    (state) => state.collectionDetails
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: COLLECTION_DETAILS_RESET });
    }
    dispatch(getCollection(id));
  }, [id, error]);

  return loading ? (
    <Spinner />
  ) : (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "700",
            padding: "15px 0 20px",
          }}
        >
          {collection?.name}
        </Typography>
        <Grid container spacing={3}>
          {collection?.project_id?.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <ProjectCard data={item} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default CollectionDetailsPage;
