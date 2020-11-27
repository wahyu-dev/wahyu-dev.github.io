const API_KEY = "16d85bf702974259b17e4dff4faeade4";
const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2014;

const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

function getAllStandings() {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION).then(response => {
            if (response) {
                response.json().then(data => {
                    console.log("Competition Data: " + data);
                    showStanding(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_COMPETITION)
        .then(data => {
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showStanding(data) {
    let standings = "";
    let standingElement =  document.getElementById("homeStandings");

    data.standings[0].table.forEach(standing => {
        standings += `
                <tr>
                    <td><a href="./team.html?id=${standing.team.id}"><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></a></td>
                    <td><a href="./team.html?id=${standing.team.id}" style="color:black;">${standing.team.name}</a></td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `;

        document.getElementById('progress').style.display = 'none'
    });

     standingElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                    <table class="striped responsive-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Team Name</th>
                                <th>W</th>
                                <th>D</th>
                                <th>L</th>
                                <th>P</th>
                                <th>GF</th>
                                <th>GA</th>
                                <th>GD</th>
                            </tr>
                        </thead>
                        <tbody id="standings">
                            ${standings}
                        </tbody>
                    </table>
                
                </div>
    `;
}

function getTeamById(){
    return new Promise((resolve, reject) => {
        // Ambil nilai query parameter (?id=)
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");

        console.log(idParam);

        if ("caches" in window) {
            caches.match(`${BASE_URL}teams/${idParam}`).then(response => {
                if (response) {
                    response.json().then(data => {
                        console.log("Competition Data: " + data);
                        showTeam(data);
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(`${BASE_URL}teams/${idParam}`)
            .then(data => {
                showTeam(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
                reject(error);
            });

    });
}

function showTeam(data){
    let imgHtml = `
            <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.crestUrl}" alt="logo team"/>
            </div>
        `;

    let infoTeam = `
            <table>
                <tr>
                    <td>Name</td>
                    <td>${data.name}</td>
                </tr>
                <tr>
                    <td>Short Name</td>
                    <td>${data.shortName}</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>${data.address}</td>
                </tr>
                <tr>
                    <td>Phone</td>
                    <td>${data.phone}</td>
                </tr>
                <tr>
                    <td>Website</td>
                    <td>${data.website}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>${data.email}</td>
                </tr>
                <tr>
                    <td>Founded</td>
                    <td>${data.founded}</td>
                </tr>
                <tr>
                    <td>Venue</td>
                    <td>${data.venue}</td>
                </tr>
            </table>
    `;

    let squad = "";
    let squadElement = document.getElementById("squad");
    document.getElementById('progress1').style.display = 'none'

    data.squad.forEach((player) => {
        squad += `
            <tr>
                <td>${player.name}</td>
                <td>${player.position}</td>
                <td>${player.dateOfBirth}</td>
                <td>${player.countryOfBirth}</td>
                <td>${player.nationality}</td>
                <td>${player.role}</td>
            </tr>
        `;
    });

    squadElement.innerHTML = `
        <table class="striped responsive-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Date</th>
                    <th>Country</th>
                    <th>Nationality</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                ${squad}
            </tbody>
        </table>
    `;

    document.getElementById("image").innerHTML = imgHtml;
    document.getElementById("content").innerHTML = infoTeam;
    document.getElementById('progress2').style.display = 'none'
    
}

function getSavedTeams(){
    getAll().then(teams => {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    let teamsHTML = "";
    teams.forEach(team => {
        console.log(team.id);
      teamsHTML += `
                <div class="col s12 m6">
                    <div class="card">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator img-card" src="${team.crestUrl}">
                        </div>
                        <div class="card-content">
                            <table>
                                <tr>
                                    <td colspan="2">${team.name}</td>
                                    <td><button id="${team.id}" class="removeButton"><i id="${team.id}" class="material-icons">delete</i></button></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                `;
    }); 

    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("teams").innerHTML = teamsHTML;

    let removeBtn = document.querySelectorAll(".removeButton");
    for(let button of removeBtn){
        button.addEventListener("click", event => {
            let teamId;
            let target = event.target;
            if (target.nodeName.toLowerCase() === "i"){
                teamId = target.parentElement.id;
            }else{
                teamId = target.id;
            }
            console.log(parseInt(teamId));
            deleteTeam(parseInt(teamId));
            getSavedTeams()
        })
    }

  });

}

function getSavedTeamById(){
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    let teamHtml = "";

    getById(parseInt(idParam)).then(team => {
        console.log(team);
        teamHtml = `
            <h3 class="center">Form Edit</h3>
            <div class="row">
                <div class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                    <input type="text" placeholder="Name" name="name" id="autocomplete-input" class="autocomplete" value="${team.name}">
                    </div>
                    <div class="input-field col s12">
                    <input type="text" placeholder="Short name" name="shortName" id="autocomplete-input" class="autocomplete" value="${team.shortName}">
                    </div>
                    <div class="input-field col s12">
                    <input type="text" placeholder="Short name" name="email" id="autocomplete-input" class="autocomplete" value="${team.email}">
                    </div>
                    <div class="input-field col s12">
                    <input type="text" placeholder="Short name" name="address" id="autocomplete-input" class="autocomplete" value="${team.address}">
                    </div>
                    <div class="input-field col s12">
                    <input type="text" placeholder="Short name" name="phone" id="autocomplete-input" class="autocomplete" value="${team.phone}">
                    </div>
                </div>
                </div>
            </div>
        `;
         document.getElementById("body-content").innerHTML = teamHtml;
    });
}