/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>

   Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.

   Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
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
    console.log("response", res.data)
    const githubUser = createCard(res.data)
    cards.appendChild(githubUser)
  })
  // Handles Failure
  .catch(error => {
    console.log("API error", error);
  })

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [  
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell"
];

followersArray.forEach(follower => {
  axios
    .get(`https://api.github.com/users/${follower}`)
    .then(res => {
      const githubFollower = createCard(res.data)
      cards.appendChild(githubFollower)
    })
})

/* Step 3: Create a function that accepts a single object as its only argument,
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
</div>

*/

function createCard(githubProfile) {
  // create elements
  const card = document.createElement("div")
  const img = document.createElement("img")
  const cardInfo = document.createElement("div")
  const name = document.createElement("h3")
  const username = document.createElement("p")
  const location = document.createElement("p")
  const profile = document.createElement("p")
  const githubUrl = document.createElement("a")
  const followers = document.createElement("p")
  const following = document.createElement("p")
  const bio = document.createElement("p")

  // html structure
  card.appendChild(img)
  card.appendChild(cardInfo)
  cardInfo.appendChild(name)
  cardInfo.appendChild(username)
  cardInfo.appendChild(location)
  cardInfo.appendChild(profile)
  // profile.appendChild(githubUrl)
  cardInfo.appendChild(followers)
  cardInfo.appendChild(following)
  cardInfo.appendChild(bio)

  // apply classes and tags
  card.classList.add("card")
  cardInfo.classList.add("card-info")
  name.classList.add("name")
  username.classList.add("username")

  // apply tags
  img.src = githubProfile.avatar_url;
  githubUrl.href = `${githubProfile.html_url}`
  
  // apply text content
  name.textContent = githubProfile.name;
  username.textContent = githubProfile.login;
  location.textContent = `Location: ${githubProfile.location}`
  profile.textContent = "Profile: " //Overrides anchor tag children with text. From MDN - Setting textContent on a node removes all of the node's children and replaces them with a single text node with the given string value.
  profile.appendChild(githubUrl)
  // profile.innerHTML = `Profile: <a href=${githubProfile.html_url}> ${githubProfile.html_url} </a>`
  githubUrl.textContent = `${githubProfile.html_url}`
  followers.textContent = `Followers: ${githubProfile.followers}`
  following.textContent = `Following: ${githubProfile.following}`
  bio.textContent = `Bio: ${githubProfile.bio || 'N/A'}`

  return card
}


