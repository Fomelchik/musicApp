let isPlaying = false;

function setupAudio() {
  let tracks = document.querySelector(`.tracks`);
  console.log(tracks);
  for (let i = 0; i < tracks.length; i++) {
    let node = tracks[i];
    console.log(node);
    node.addEventListener(`click`, function() {
      let audio = node.querySelector(`.audio`);
      console.log(audio);
      if (isPlaying) {
        isPlaying = false;
        audio.pause();
      } else {
        isPlaying = true;
        audio.play();
      }
    })
  }  
}
setupAudio();