function searchMovies() {
  const apiKey = "a843b1e6";
  const searchInput = document.getElementById("searchInput").value.trim();

  if (searchInput === "") {
    alert("Please enter a movie title.");
    return;
  }

  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "False") {
        document.getElementById("moviesGrid").innerHTML =
          "<p>No movies found.</p>";
      } else {
        const movies = data.Search;
        let moviesHTML = "";

        movies.forEach((movie) => {
          fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
            .then((response) => response.json())
            .then((movieDetails) => {
              moviesHTML += `
                <div class="movie">
                  <img src="${
                    movieDetails.Poster !== "N/A"
                      ? movieDetails.Poster
                      : "placeholder.jpg"
                  }" alt="${movieDetails.Title} Poster">
                  <h2>${movieDetails.Title}</h2>
                  <p><strong>Year:</strong> ${movieDetails.Year}</p>
                  <p><strong>Genre:</strong> ${movieDetails.Genre}</p>
                  <p><strong>Director:</strong> ${movieDetails.Director}</p>
                  <p><strong>Actors:</strong> ${movieDetails.Actors}</p>
                  <p><strong>Plot:</strong> ${movieDetails.Plot}</p>
                </div>
              `;

              document.getElementById("moviesGrid").innerHTML = moviesHTML;
            })
            .catch((error) => console.log("Error:", error));
        });
      }
    })
    .catch((error) => console.log("Error:", error));
}
