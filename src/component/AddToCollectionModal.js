import React, { useEffect } from "react";
import { Avatar, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SAVE_PROJECT_RESET } from "../constants/collectionConstants";

const AddToCollectionModal = ({
  selectedCollection,
  setSelectedCollection,
  added,
  setAdded,
  coll,
  currentCard,
}) => {
  const dispatch = useDispatch();
  const { success, error, collection } = useSelector(
    (state) => state.saveProject
  );

  useEffect(() => {
    if (success) {
      toast.success(`Project successfully added in ${collection.name}`);
      dispatch({ type: SAVE_PROJECT_RESET });
    }
    if (!success && error) {
      toast.error(error);
      dispatch({ type: SAVE_PROJECT_RESET });
    }
  }, [error, success]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 10px",
        gap: "2rem",
        alignItems: "center",
      }}
      key={coll._id}
    >
      <Avatar src={coll?.image} alt="img" variant="square" />
      <span style={{ fontWeight: "600" }}>{coll.name}</span>
      {currentCard === selectedCollection ? (
        !added ? (
          <Button
            variant="contained"
            sx={{ borderRadius: "5px" }}
            onClick={() => {
              setSelectedCollection(coll._id);
              if (coll._id === selectedCollection) setAdded(true);
            }}
          >
            +
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              borderRadius: "5px",
              background: "red",
              ":hover": { bgcolor: "red" },
            }}
            onClick={() => {
              if (coll._id === selectedCollection) setAdded(false);
            }}
          >
            <Delete />
          </Button>
        )
      ) : (
        <Button
          variant="contained"
          sx={{ borderRadius: "5px" }}
          onClick={() => {
            setSelectedCollection(coll._id);
            if (coll._id === selectedCollection) setAdded(true);
          }}
        >
          +
        </Button>
      )}
    </div>
  );
};

export default AddToCollectionModal;
