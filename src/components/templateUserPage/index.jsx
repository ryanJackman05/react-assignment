// code adapted from templateMoviePage
import {React, useEffect, useContext} from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { MoviesContext } from "../../contexts/moviesContext";
import ArticleIcon from '@mui/icons-material/Article';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router";
import { getMovieImages } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";

const TemplateUserPage = ({ children }) => {
    const context = useContext(MoviesContext);
    const reviews = context.myReviews; // get reviews from context wrapped around app
    console.log(reviews);
    let profile = loadProfile();
    useEffect(() => {
        const saved = loadProfile(); // ...profile : returns new profile object with existing fields
        if (saved) profile = saved;
      }, []);

    function loadProfile() {
        try {
            const profileObject = localStorage.getItem(profileObjectName);
            if (!profileObject) return null;
            return JSON.parse(profileObject);
        } catch {
            return null;
        }
    }
  // getQuery not needed, data will be fetched from local cache, and checked for null values

  return (
    <> {/* adapted from Movie Header component, but includes links to user profile and reviews*/}
      <Paper 
        component="div" 
        sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            padding: 1.5,
            margin: 0,
        }}
      >
        <a href="/user/profile">
            <IconButton aria-label="user profile">
                <AccountCircleIcon color="primary" fontSize="large" />
            </IconButton>
        </a>
        <Typography variant="h4" component="h3">
            {!profile ? "Not Logged in" : "Logged in as:"} 
            <span sx={{ fontSize: "1.5rem" }}>{`${!profile ? "" : profile.name}`} </span>
        </Typography>
        <a href="/user/reviews">
            <IconButton aria-label="user reviews">
                <ArticleIcon color="primary" fontSize="large" />
            </IconButton>
        </a>
      </Paper>

      {children}
    </>
  );
};

export default TemplateUserPage;
