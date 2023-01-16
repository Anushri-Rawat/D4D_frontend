import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCollections } from "../actions/collectionAction";
import CollectionCard from "../component/CollectionCard";
import { Grid, Container, Typography } from "@mui/material";
import { toast } from "react-toastify";
import {
  COLLECTION_DELETE_RESET,
  COLLECTION_LIST_SUCCESS,
} from "../constants/collectionConstants";
import Spinner from "../component/Spinner.js";
import { useNavigate } from "react-router-dom";

const CollectionsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { collections, loading } = useSelector((state) => state.collectionList);

  const {
    success: deleteSuccess,
    id: deletedId,
    error: deleteError,
  } = useSelector((state) => state.collectionDelete);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }

    dispatch(getAllCollections());
  }, [userInfo]);

  useEffect(() => {
    if (deleteSuccess) {
      dispatch({
        type: COLLECTION_LIST_SUCCESS,
        payload: collections.filter((c) => c.id !== deletedId),
      });
      toast.success("Collection deleted successfully");
      dispatch({ type: COLLECTION_DELETE_RESET });
    }
    if (!deleteSuccess && deleteError) {
      toast.error(deleteError);
    }
  }, [deleteSuccess, deleteError, deletedId]);

  return !loading ? (
    collections.length === 0 ? (
      "No Collection yet"
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
              padding: "15px 0 20px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Your Collections
          </Typography>
          <Grid container spacing={3}>
            {collections?.map((collection) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={collection._id}>
                <CollectionCard data={collection} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    )
  ) : (
    <Spinner />
  );
};

export default CollectionsPage;
