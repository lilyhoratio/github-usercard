/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>

   Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
   Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:  
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
      <button></button>
      <div class="card-info-more">
        <p>Company: {users company}</p>
        <p>Public Repos: {users public repos count}</p>
      </div>
    </div>

   Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards

  Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const githubHandle = "lilyhoratio";
const cards = document.querySelector(".cards");
// const promise = axios
//   .get(`https://api.github.com/users/${githubHandle}`)
//   .then(data => {
//     data.data;
//   });
// console.log("response", githubDataObj) // response > Promise {<pending>}

axios
  .get(`https://api.github.com/users/${githubHandle}`)
  // Handles Success: here's where we get the results from server
  .then(res => {
    console.log("Response:", res.data);
    const githubUser = createCard(res.data);
    cards.appendChild(githubUser);
  })
  // Handles Failure
  .catch(error => {
    console.log("API error:", error);
  });

const followersArray = [
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell"
];

followersArray.forEach(follower => {
  axios.get(`https://api.github.com/users/${follower}`).then(res => {
    const githubFollower = createCard(res.data);
    cards.appendChild(githubFollower);
  });
});

//stretch
// v1 - from walkthrough
// axios
//   .get(`https://api.github.com/users/${githubHandle}/followers`)
//   .then(res => {
//     res.data
//       .slice(0, 3) // limit to first 3 followers
//       .forEach(follower => {
//         axios
//           .get(`https://api.github.com/users/${follower.login}`)
//           .then(res => {
//             const card = createCard(res.data);
//             cards.append(card);
//           });
//       });
//   });

// v2 - from walkthrough

axios
  .get(`https://api.github.com/users/${githubHandle}/followers`)
  .then(res => res.data.slice(0, 5))
  .then(followers => {
    followers.forEach(follower => {
      axios.get(`https://api.github.com/users/${follower.login}`).then(res => {
        const card = createCard(res.data);
        cards.append(card);
      });
    });
  });

function createCard(githubProfile) {
  // create elements
  const card = document.createElement("div");
  const img = document.createElement("img");
  const cardInfo = document.createElement("div");
  const name = document.createElement("h3");
  const username = document.createElement("p");
  const location = document.createElement("p");
  const profile = document.createElement("p");
  const githubUrl = document.createElement("a");
  const followers = document.createElement("p");
  const following = document.createElement("p");
  const bio = document.createElement("p");
  const expandButton = document.createElement("button");
  const company = document.createElement("p")

  // html structure
  card.append(img, cardInfo);
  cardInfo.append(name, username, location, profile, followers, following, bio, expandButton, company);
  // profile.append(githubUrl) //move to after setting profile.textContent so that githubUrl isn't overridden

  // apply classes
  card.classList.add("card");
  cardInfo.classList.add("card-info");
  name.classList.add("name");
  username.classList.add("username");
  expandButton.classList.add("expandButton")

  // apply tags
  img.src = githubProfile.avatar_url;
  githubUrl.href = githubProfile.html_url;

  // apply text content
  name.textContent = githubProfile.name;
  username.textContent = githubProfile.login;
  location.textContent = `Location: ${githubProfile.location || "N/A"}`;
  profile.textContent = "Profile: "; //Overrides anchor tag children with text. From MDN - Setting textContent on a node removes all of the node's children and replaces them with a single text node with the given string value.
  profile.append(githubUrl);
  // profile.innerHTML = `Profile: <a href=${githubProfile.html_url}> ${githubProfile.html_url} </a>`
  githubUrl.textContent = githubProfile.html_url;
  followers.textContent = `Followers: ${githubProfile.followers}`;
  following.textContent = `Following: ${githubProfile.following}`;
  bio.textContent = `Bio: ${githubProfile.bio || "N/A"}`;
  expandButton.textContent = "Expand"
  company.textContent = `Company: ${githubProfile.company || "N/A"}`

  //eventListener
  expandButton.addEventListener("click", () => {
    card.classList.toggle("card-open")
  })

  return card;
}
