```javascript
const musicData = {
  happy: [
    { name: "Happy – Pharrell Williams", link: "https://www.youtube.com/watch?v=ZbZSe6N_BXs" },
    { name: "Good Vibes – Chris Janson", link: "https://www.youtube.com/watch?v=kNku1uNBVkU" }
  ],
  sad: [
    { name: "Let Her Go – Passenger", link: "https://www.youtube.com/watch?v=RBumgq5yVrA" },
    { name: "Someone Like You – Adele", link: "https://www.youtube.com/watch?v=hLQl3WQQoQ0" }
  ],
  energetic: [
    { name: "Stronger – Kanye West", link: "https://www.youtube.com/watch?v=Pc8wKZ9e5XU" },
    { name: "Can't Hold Us – Macklemore", link: "https://www.youtube.com/watch?v=2zNSgSzhBfM" }
  ],
  chill: [
    { name: "Sunflower – Post Malone", link: "https://www.youtube.com/watch?v=Aq0z5mY5cL0" },
    { name: "Better Together – Jack Johnson", link: "https://www.youtube.com/watch?v=u57d4_b_YgI" }
  ]
};

function showSongs() {
  const mood = document.getElementById("mood").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!mood || !musicData[mood]) {
    resultsDiv.innerHTML = "<p>Please select a mood.</p>";
    return;
  }

  const songs = musicData[mood];
  songs.forEach(song => {
    const a = document.createElement("a");
    a.href = song.link;
    a.target = "_blank";
    const p = document.createElement("p");
    a.textContent = song.name;
    p.appendChild(a);
    resultsDiv.appendChild(p);
  });
}
```