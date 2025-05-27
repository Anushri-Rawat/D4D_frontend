import React from "react";
import { Skeleton, Box, Card, CardContent, Grid } from "@mui/material";

export const ProfileSkeleton = () => (
  <Box sx={{ width: "100%", padding: 2 }}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
      <Skeleton variant="circular" width={120} height={120} sx={{ mr: 2 }} />
      <Box sx={{ width: "100%" }}>
        <Skeleton variant="text" width="60%" height={40} />
        <Skeleton variant="text" width="40%" height={30} />
        <Skeleton variant="text" width="30%" height={25} />
      </Box>
    </Box>
    {[1, 2].map((item) => (
      <Card key={item} sx={{ mb: 2 }}>
        <CardContent>
          <Skeleton variant="text" width="40%" height={30} />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="80%" />
        </CardContent>
      </Card>
    ))}
  </Box>
);

export const ProjectCardSkeleton = () => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Box sx={{ pt: 2 }}>
        <Skeleton variant="text" width="70%" height={32} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} variant="rounded" width={80} height={24} />
          ))}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export const SearchResultSkeleton = ({count,xs,md,sm}) => (
  <Grid container spacing={2}>
    {Array(count).fill(0).map((_,index) => (
      <Grid item xs={xs} sm={sm} md={md} key={index}>
        <ProjectCardSkeleton />
      </Grid>
    ))}
  </Grid>
);

export const ChatSkeleton = () => (
  <Box sx={{ width: "100%", height: "70vh" }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        borderBottom: "1px solid #eee",
      }}
    >
      <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
      <Skeleton variant="text" width={150} height={24} />
    </Box>
    <Box sx={{ p: 2 }}>
      {[1, 2, 3].map((item) => (
        <Box
          key={item}
          sx={{
            display: "flex",
            justifyContent: item % 2 === 0 ? "flex-end" : "flex-start",
            mb: 2,
          }}
        >
          <Skeleton
            variant="rounded"
            width={200}
            height={60}
            sx={{ borderRadius: 2 }}
          />
        </Box>
      ))}
    </Box>
  </Box>
);

export const TopProjectsSkeleton = () => (
  <Grid
    container
    spacing={3}
    sx={{ minHeight: "250px", justifyContent: "center" }}
  >
    {[1, 2, 3, 4].map((item) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Skeleton variant="rectangular" width="100%" height={160} />
            <Box sx={{ pt: 2 }}>
              <Skeleton variant="text" width="80%" height={28} />
              <Skeleton variant="text" width="60%" height={20} />
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                {[1, 2, 3].map((tag) => (
                  <Skeleton
                    key={tag}
                    variant="rounded"
                    width={60}
                    height={24}
                  />
                ))}
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Skeleton variant="circular" width={32} height={32} />
                <Skeleton variant="text" width={80} height={24} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);
