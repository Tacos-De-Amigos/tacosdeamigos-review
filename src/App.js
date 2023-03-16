import { useEffect, useState } from "react";
import supabase from "./supabase";

import "./style.css";

// const initialReviews = [
//   {
//     id: 1,
//     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, quia tempore explicabo tempora necessitatibus tenetur maxime quo dicta velit a neque ea ipsa ducimus suscipit soluta cum id totam cumque.",
//     rating: "very satisfied",
//     thumbs_up: 10,
//     heart: 20,
//     thumbs_down: 0,
//     createdIn: 2023,
//   },

//   {
//     id: 2,
//     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, quia tempore explicabo tempora necessitatibus tenetur maxime quo dicta velit a neque ea ipsa ducimus suscipit soluta cum id totam cumque.",
//     rating: "satisfied",
//     thumbs_up: 10,
//     heart: 20,
//     thumbs_down: 0,
//     createdIn: 2023,
//   },

//   {
//     id: 3,
//     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, quia tempore explicabo tempora necessitatibus tenetur maxime quo dicta velit a neque ea ipsa ducimus suscipit soluta cum id totam cumque.",

//     rating: "neutral",
//     thumbs_up: 10,
//     heart: 20,
//     thumbs_down: 0,
//     createdIn: 2023,
//   },

//   {
//     id: 4,
//     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, quia tempore explicabo tempora necessitatibus tenetur maxime quo dicta velit a neque ea ipsa ducimus suscipit soluta cum id totam cumque.",
//     rating: "unsatisfied",
//     thumbs_up: 10,
//     heart: 20,
//     thumbs_down: 0,
//     createdIn: 2023,
//   },
// ];

// Ang sulod sa App function kay all UI nga naa sa index.html old version
function App() {
  // return a JSX | similar to html
  //  1. Define state var

  const [showForm, setShowForm] = useState(false);
  const [allReviews, setAllReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRating, setCurrentRating] = useState("all");

  // SUPABASE CLIENT
  useEffect(
    function () {
      async function getAllReviews() {
        setIsLoading(true);
        // QUERYING
        let query = supabase.from("reviews").select("*");

        if (currentRating !== "all") query = query.eq("rating", currentRating);

        const { data: reviews, error } = await query
          .order("thumbs_up", { ascending: false })
          .limit(1000);

        if (!error) setAllReviews(reviews);
        else alert("There was a problem getting data");
        setIsLoading(false);
      }
      getAllReviews();
    },
    [currentRating]
  );

  return (
    // FRAGMENT - JSX element not produce any html output: <></>
    <>
      {/* Pass setShowForm functon as a PROP into the header */}
      {/* Prop : setShowForm */}
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewReviewForm
          setAllReviews={setAllReviews}
          setShowForm={setShowForm}
        />
      ) : null}

      {/* RATING CATEGORY FILTERS */}

      <main className="main">
        <RatingCategoryFilters setCurrentRating={setCurrentRating} />

        {/* LOADING  message ayha mo show ang REVIEWS */}
        {isLoading ? (
          <Loader />
        ) : (
          <ReviewList allReviews={allReviews} setAllReviews={setAllReviews} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className="loading-message">Loading...</p>;
}

// LOADING MESSAGE
function Header({ showForm, setShowForm }) {
  // HEADER COMPONENT

  const webTitle = "share your experience amigo";

  return (
    <header className="header">
      <div className="logo">
        {/* <!-- Tacos De Amigos LOGO --> */}

        <img src="imgs/TDAs logo partial.png" alt="Tacos De Amigos Logo" />

        {/* <!-- Main Header --> */}
        <h1>{webTitle}</h1>
      </div>

      {/* <!-- review button --> */}

      {/* 3. Updating state variable */}
      <button
        className="btn btn-medium btn-open"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close " : "Share a review"}
      </button>
    </header>
  );
}

//  RATING | CATEGORIES ARRAY

const RATING = [
  { name: "very satisfied", color: "#16a34a" },
  { name: "satisfied", color: "#fb923c" },
  { name: "neutral", color: "#93A689" },
  { name: "unsatisfied", color: "#dc2626" },
];

// NEW REVIEW FORM COMPONENT

function NewReviewForm({ setAllReviews, setShowForm }) {
  // TECHNIQUE: Controlled input field component
  const [postText, setPostText] = useState("");
  const [rateCategories, setRateCategories] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = postText.length;

  async function handleSubmission(ev) {
    // 1. Prevent browser reload
    ev.preventDefault();

    // 2. Check if data is valid | USING IF ELSE

    if (postText && rateCategories && textLength <= 300) {
      //3.  Create new review object

      // const theNewRev = {
      //   id: Math.round(Math.random() * 1000000),
      //   postText,
      //   rateCategories,
      //   thumbs_up: 10,
      //   heart: 20,
      //   thumbs_down: 0,
      //   createdIn: new Date().getFullYear(),
      // };

      // 3.1 Upload reviews to Supabase and receive the new review object
      setIsUploading(true);
      const { data: newReview, error } = await supabase
        .from("reviews")
        .insert([{ text: postText, rating: rateCategories }])
        .select();
      setIsUploading(false);

      // console.log(data);
      // 4  Add new review to the UI: add the review to state
      if (!error) setAllReviews((allReviews) => [newReview[0], ...allReviews]);
      // 5 Reset input fields
      setPostText("");
      setRateCategories("");
      // 6  Close form after clicking post
      setShowForm(false);
    }
  }
  return (
    <form className="fact-form" onSubmit={handleSubmission}>
      {/* <!-- delicious, hygienic, and affordable --> */}
      <input
        maxLength={300}
        type="text"
        placeholder="I really enjoy the tacos of tacos de amigos..."
        value={postText}
        onChange={(ev) => setPostText(ev.target.value)}
        disabled={isUploading}
      />
      <span id="word-count">{300 - textLength}</span>
      <select
        value={rateCategories}
        onChange={(ev) => setRateCategories(ev.target.value)}
        disabled={isUploading}
      >
        {/* <!-- COLORS RATING used
        Very Satisfied - #16a34a
        Satisfied - #fb923c
        Neutral - #93A689
        Unsatisfied - #dc2626
        --> */}
        <option value="">Rate us:</option>
        {RATING.map((opt) => (
          <option key={opt.name}>{opt.name}</option>
        ))}
      </select>
      <button className="btn btn-medium" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

//  Rating category COMPONENT

function RatingCategoryFilters({ setCurrentRating }) {
  return (
    <aside>
      <ul>
        {/* INDEPENDENT LI ELEMENT - NOT INCLUDE IN LOOPING TO RATING ARRAY */}

        <li className="category">
          {/* ALL button */}
          <button
            className="btn btn-all-reviews"
            onClick={() => setCurrentRating("all")}
          >
            All
          </button>
        </li>

        {/* RENDER A RATING CATEGORIES USING MAP TO LOOP IN RATING ARRAY */}

        {RATING.map((rateCat) => (
          <li key={rateCat.name} className="category">
            {/* EACH RATING */}
            <button
              className="btn btn-category"
              style={{ backgroundColor: rateCat.color }}
              onClick={() => setCurrentRating(rateCat.name)}
            >
              {rateCat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// Review List COMPONENT
function ReviewList({ allReviews, setAllReviews }) {
  if (allReviews.length === 0)
    return (
      <p className="loading-message">
        AMIGO NO REVIEWS HERE YET, CREATE THE FIRST ONE 🌮
      </p>
    );

  return (
    <section>
      <ul className="review-list">
        {allReviews.map((rev) => (
          <Review key={rev.id} rev={rev} setAllReviews={setAllReviews} />
        ))}
      </ul>
      <p>There are {allReviews.length} reviews. Make your own Amigo!</p>
    </section>
  );
}

// Review post COMPONENT
function Review({ rev, setAllReviews }) {
  const [isUpdating, setIsUpdating] = useState(false);

  async function handlingVote(columnName) {
    setIsUpdating(true);
    const { data: updatedReview, error } = await supabase
      .from("reviews")
      .update({ [columnName]: rev[columnName] + 1 })
      .eq("id", rev.id)
      .select();

    setIsUpdating(false);

    if (!error)
      setAllReviews((revs) =>
        revs.map((f) => (f.id === rev.id ? updatedReview[0] : f))
      );
  }

  return (
    <li className="fact">
      <p>{rev.text}</p>
      <span
        className="tag"
        style={{
          backgroundColor: RATING.find((fcolor) => fcolor.name === rev.rating)
            .color,
        }}
      >
        {rev.rating}
      </span>
      <div className="reactions">
        <button onClick={() => handlingVote("thumbs_up")} disabled={isUpdating}>
          👍 {rev.thumbs_up}
        </button>
        <button onClick={() => handlingVote("heart")} disabled={isUpdating}>
          💓 {rev.heart}
        </button>
        <button
          onClick={() => handlingVote("thumbs_down")}
          disabled={isUpdating}
        >
          👎 {rev.thumbs_down}
        </button>
      </div>
    </li>
  );
}

export default App;
