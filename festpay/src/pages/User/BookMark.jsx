import React from "react";
import { Box, Typography, Card, CardContent, Button, Grid, CardActions } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Sample bookmark data
const bookmarks = [
  {
    id: 1,
    title: "MUI Documentation",
    description: "Material UI documentation for quick reference on React components.",
    url: "https://mui.com/",
  },
  {
    id: 2,
    title: "ReactJS Official Site",
    description: "The official React website for tutorials and documentation.",
    url: "https://reactjs.org/",
  },
  {
    id: 3,
    title: "JavaScript Info",
    description: "A comprehensive guide to modern JavaScript concepts and features.",
    url: "https://javascript.info/",
  },
  {
    id: 4,
    title: "FreeCodeCamp",
    description: "FreeCodeCamp offers free courses to learn full stack web development.",
    url: "https://www.freecodecamp.org/",
  },
  {
    id: 5,
    title: "FreeCodeCamp",
    description: "FreeCodeCamp offers free courses to learn full stack web development.",
    url: "https://www.freecodecamp.org/",
  },
  {
    id: 6,
    title: "FreeCodeCamp",
    description: "FreeCodeCamp offers free courses to learn full stack web development.",
    url: "https://www.freecodecamp.org/",
  },
];

export default function BookMark() {
  return (
    <Box sx={{ p: 4 }}>
      {/* Bookmarks List */}
      <Grid container spacing={3} justifyContent="center">
        {bookmarks.map((bookmark) => (
          <Grid item xs={12} sm={6} md={4} key={bookmark.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
                transition: "0.3s",
                height: "100%",
                "&:hover": {
                  boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                <BookmarkBorderIcon sx={{ fontSize: 28, mr: 1 }} />
                {bookmark.title}
              </Typography>

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {bookmark.description}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: "space-between" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  href={bookmark.url}
                  target="_blank"
                >
                  Visit
                </Button>
                <Box>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </Button>
                  <Button variant="outlined" color="error" size="small">
                    <DeleteIcon />
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
