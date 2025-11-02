import UserReview from "../components/userReview";
import { MoviesContext } from "../contexts/moviesContext";
import TemplateUserPage from "../components/templateUserPage";
import {React, useContext} from "react";
import { useLocation } from "react-router";


export default function UserReviewsPage() {
    const context = useContext(MoviesContext);
    const reviews = context.myReviews; // get reviews from context wrapped around app
    if(!reviews || reviews.length === 0){
        return(
            <TemplateUserPage>
                <h2 style={{ marginTop: 0 }}>Reviews</h2>
                <p>No reviews yet. Go write some!</p>
            </TemplateUserPage>
        )
    }
    let reviewCards = reviews.map((m) => (
    <Grid key={m.id} size={1} sx={{padding: "20px"}}>
      <UserReview review = {r}/>
    </Grid>
    ));
    return (
    <TemplateUserPage>
        <h2 style={{ marginTop: 0 }}>Reviews</h2>
        <div style={styles.card}>
            {reviewCards}
        </div>
    </TemplateUserPage>
  );
}

const styles = { // generated styles object
  page: { padding: 16, maxWidth: 900, margin: "0 auto", fontFamily: "system-ui, Arial" },
  card: {
    display: "flex",
    gap: 20,
    alignItems: "flex-start",
    background: "#fff",
    borderRadius: 8,
    padding: 20,
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },
  avatarColumn: { width: 160, textAlign: "center" },
  avatar: { width: 120, height: 120, objectFit: "cover", borderRadius: 8, cursor: "pointer", border: "1px solid #e6e6e6" },
  formColumn: { flex: 1, display: "flex", flexDirection: "column" },
  label: { display: "flex", flexDirection: "column", marginBottom: 10, fontSize: 14 },
  input: { padding: 8, marginTop: 6, borderRadius: 6, border: "1px solid #ddd", fontSize: 14 },
  button: { padding: "8px 12px", borderRadius: 6, border: "1px solid #ddd", background: "#f7f7f7", cursor: "pointer" },
  buttonPrimary: { padding: "8px 12px", borderRadius: 6, border: "none", background: "#0066ff", color: "#fff", cursor: "pointer" },
};