"use strict"

const API_URL = "https://api.github.com/users/"
const app = document.getElementById("app")
const form = document.querySelector("form")
const search = document.querySelector("input")

// load github user data
function loadGithubUser(name){
    return fetch(API_URL + name).then(response => response.json())
}

function loadCardData(data) {
     app.innerHTML = 
    `
    <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="${data.name}">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>
                <ul>
                    <li>${data.followers} <strong>Followers</strong></li>
                    <li>${data.following} <strong>Following</strong></li>
                    <li>${data.public_repos} </strong>repos</li>
                </ul>
                <div id="repos">
                </div>
            </div>
        </div>
    `
    console.log(data)
}

// load github users repos
function loadRepos(name){
    return fetch(API_URL + name + "/repos").then(response => response.json())
}

function addReposToCard(repos){
    let allRepos = document.getElementById("repos")
    let reposSlice = repos.slice(0, 10)

    reposSlice.forEach(x => {
        let repoEl = document.createElement("a")
        repoEl.classList.add("repo")

        repoEl.innerText = x.name
        repoEl.href = x.html_url
        repoEl.target = "_blank"
        allRepos.append(repoEl)
    })
}


form.addEventListener("submit", function(e) {
    e.preventDefault()
    let user = search.value
    if(user){
        loadGithubUser(user).then(loadCardData)
        loadRepos(user).then(addReposToCard)
    }

    search.value = ""
})
