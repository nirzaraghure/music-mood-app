const musicData = {
    happy: [
      { name: "Happy – Pharrell Williams", link: "https://youtu.be/ZbZSe6N_BXs" },
      { name: "Good Vibes – Chris Janson", link: "https://youtu.be/kNku1uNBVkU" }
    ],
    sad: [
      { name: "Let Her Go – Passenger", link: "https://youtu.be/RBumgq5yVrA" },
      { name: "Someone Like You – Adele", link: "https://youtu.be/hLQl3WQQoQ0" }
    ],
    energetic: [
      { name: "Stronger – Kanye West", link: "https://youtu.be/PsO6ZnUZI0g" },
      { name: "Can't Hold Us – Macklemore", link: "https://youtu.be/2zNSgSzhBfM" }
    ],
    chill: [
      { name: "Sunflower – Post Malone", link: "https://youtu.be/ApXoWvfEYVU" },
      { name: "Better Together – Jack Johnson", link: "https://youtu.be/u57d4_b_YgI" }
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
      const p = document.createElement("p");
      p.innerHTML = `<a href="${song.link}" target="_blank">${song.name}</a>`;
      resultsDiv.appendChild(p);
    });
  }
  
