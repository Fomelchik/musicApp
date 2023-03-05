let albumInfo = document.querySelector(`.album`);
let tracksList = document.querySelector(`.tracks`);
let tracksCard = document.querySelector(`.tracks-card`);
let errorNode = document.querySelector(`.error`);

let search = new URLSearchParams(window.location.search);
let albumIndex = search.get(`albumIndex`);

function setupAlbum() {
  albumInfo.innerHTML += `
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="../assets/${albums[albumIndex].img}" class="img-fluid album__img" alt="...">
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
  tracksCard.classList.remove(`d-none`);
};

function setupTracks() {
  for (let i = 0; i < albums[albumIndex].tracks.length; i++) {
    let src = albums[albumIndex].tracks[i].src;
    src = src.replaceAll(albums[albumIndex].tracks[i].author, ``, `_-_`, ``);
    tracksList.innerHTML += `
                  <li class="list-group-item justify-content-center">
                    <div class="track">
                      <button class="play_button">
                        <img class="button_img" src="../assets/play.svg" width="32px" height="32px" alt="">
                      </button>
                      <audio class="audio" src="../music/${albums[albumIndex].tracks[i].src}"></audio>
                      <div class="track_info">
                        <span class="name">${albums[albumIndex].tracks[i].title}</span>
                        <span class="author text-secondary">${albums[albumIndex].tracks[i].author.replaceAll(`_`, ` `)}</span>
                      </div>
                      <div class="progress ms-auto" role="progressbar" aria-label="Example 10px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 10px">
                        <div class="progress-bar" style="width: 0%"></div>
                      </div>
                      <div class="time ms-3">
                        ${albums[albumIndex].tracks[i].time}
                      </div>
                    </div>
                  </li>
    `;
    function setupTitle(){
      document.title += `${albums[albumIndex].tracks[i].author.replaceAll(`_`, ` `)} альбом ${albums[albumIndex].tracks[i].title}`;
    }
    setupTitle();
  };
};



function renderError() {
  errorNode.classList.remove(`d-none`);
}

let isPlaying = false;

function setupAudio() {
  let tracksNode = document.querySelectorAll(`.track`);
  console.log(tracksNode);
  for (let i = 0; i < tracksNode.length; i++) {
    let node = tracksNode[i];
    node.addEventListener(`click`, function() {
      let audio = node.querySelector(`.audio`);
      let btn = node.querySelector(`.button_img`);
      let timeNode = node.querySelector(`.time`);
      let progressBar = node.querySelector(`.progress-bar`);
      function updateTime() {
        currentTime = Math.trunc(audio.currentTime);
        let minutes = Math.trunc(audio.currentTime / 60);
        let seconds = Math.trunc(audio.currentTime % 60);
        if (minutes < 10) {
          minutes = `0${minutes}`;
        }
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
        timeNode.innerHTML = `${minutes}:${seconds}`
        if (isPlaying) {
          requestAnimationFrame(updateTime);
        }
      }
      function updateProgress() {
        let progressPercentage = (Math.trunc(audio.currentTime) / Math.trunc(audio.duration)) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        if (isPlaying) {
          requestAnimationFrame(updateProgress);
        }
      }
      console.log(btn);
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
        btn.src = `../assets/play.svg`;
      } else {
        audio.play();
        isPlaying = true;
        btn.src = `../assets/pause.svg`;
        updateTime();
        updateProgress();
      }
    })
  }
};

if (!albumIndex) {
  renderError();
} else {
  setupAlbum();
  setupTracks();
  setupAudio();
}