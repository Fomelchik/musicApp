let albumInfo = document.querySelector(`.album`);
let tracksList = document.querySelector(`.tracks`);

let search = new URLSearchParams(window.location.search);
let albumIndex = search.get(`albumIndex`);

albumInfo.innerHTML += `
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="../${albums[albumIndex].img}" class="img-fluid album__img" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${albums[albumIndex].title}</h5>
                  <p class="card-text">${albums[albumIndex].description}</p>
                  <p class="year text-body-tertiary">Выпущен в ${albums[albumIndex].year} году</p>
                </div>
              </div>
            </div>
          </div>
`;

for (let i = 0; i < albums[albumIndex].tracks.length; i++) {
  tracksList.innerHTML += `
                <li class="list-group-item">
                  <div class="track">
                    <button class="play_button">
                      <img src="../assets/play.svg" width="32px" height="32px" alt="">
                    </button>
                    <div class="track_info">
                      <span class="name">${albums[albumIndex].tracks[i].title}</span>
                      <span class="author text-secondary">${albums[albumIndex].tracks[i].author}</span>
                    </div>
                    <div class="time ms-auto">
                    ${albums[albumIndex].tracks[i].time}
                    </div>
                  </div>
                </li>
`
};