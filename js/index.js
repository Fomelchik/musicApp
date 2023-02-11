let albums_container = document.querySelector(`.albums`);

for (let i = 0; i < albums.length; i++) {
  albums_container.innerHTML += `        
          <div class="col">
            <a href="html/album.html?albumIndex=${i}">
              <div class="card card_album">
                <img src="${albums[i].img}" class="card-img-top" alt="...">
                <div class="card-body">
                  <p class="card-text">${albums[i].title}</p>
                </div>
              </div>
            </a>
          </div>
          `;
}

