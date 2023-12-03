console.log("User Connected");
document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");
    const queryInput = document.getElementById("query");
    const resultsContainer = document.getElementById("results");
    const loadMoreButton = document.getElementById("load-more");
    const playerOptions = document.querySelector(".player-options");
    const playerContainer = document.getElementById("player-container");
    let nextPageToken = "";
    let currentQuery = "";
    const maxResults = 10; // Number of results to load at a time

    // Listen for changes in the player options
    playerOptions.addEventListener("change", function () {
        const customPlayerSelected = document.getElementById("custom-player").checked;
        setCustomPlayer(customPlayerSelected);
    });

    function setCustomPlayer(customPlayerSelected) {
        const videos = resultsContainer.querySelectorAll("div");

        for (const video of videos) {
            const anchor = video.querySelector("a");
            anchor.onclick = function () {
                const videoId = anchor.getAttribute("data-video-id");
                if (customPlayerSelected) {
                    loadVideo(videoId);
                    console.log(videoId);
                    return false; // Prevent default link behavior
                }
            };
        }
    }

    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const query = queryInput.value;
        clearResults();
        search(query);
        currentQuery = query;
        saveQueryToCookie(query);
    });

    queryInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            const query = queryInput.value;
            clearResults();
            search(query);
            currentQuery = query;
            saveQueryToCookie(query);
        }
    });

    loadMoreButton.addEventListener("click", function () {
        loadMoreResults();
    });

    function search(query) {
        const key = "AIzaSyAqXNqaQYHtA0h6hXoDqUn8mYN_-Ke7aLw"; // Replace with your actual YouTube API key
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(
            query
        )}&key=${key}`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (!nextPageToken) {
                    clearResults();
                }
                data.items.forEach((item) => {
                    const video = document.createElement("div");
                    video.innerHTML = `<h2>${item.snippet.title}</h2><a href="https://yewtu.be/watch?v=${item.id.videoId}&listen=1" target="_blank"><img src="${item.snippet.thumbnails.default.url}" data-video-id="${item.id.videoId}"></a>`;
                    resultsContainer.appendChild(video);
                });
                nextPageToken = data.nextPageToken;
                setCustomPlayer(document.getElementById("custom-player").checked);
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
            });
    }

    function loadMoreResults() {
        if (nextPageToken) {
            const key = "AIzaSyAqXNqaQYHtA0h6hXoDqUn8mYN_-Ke7aLw"; // Replace with your actual YouTube API key
            const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(
                currentQuery
            )}&key=${key}&pageToken=${nextPageToken}`;

            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    data.items.forEach((item) => {
                        const video = document.createElement("div");
                        video.innerHTML = `<h2>${item.snippet.title}</h2><a href="https://yewtu.be/watch?v=${item.id.videoId}&listen=1" target="_blank"><img src="${item.snippet.thumbnails.default.url}" data-video-id="${item.id.videoId}"></a>`;
                        resultsContainer.appendChild(video);
                    });
                    nextPageToken = data.nextPageToken;
                    setCustomPlayer(document.getElementById("custom-player").checked);
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("An error occurred while loading more results. Please try again later.");
                });
        }
    }

    function clearResults() {
        resultsContainer.innerHTML = "";
        nextPageToken = "";
    }

    function saveQueryToCookie(query) {
        document.cookie = `search_query=${encodeURIComponent(query)}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }

    function loadVideo(videoId) {
        playerContainer.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    }
});