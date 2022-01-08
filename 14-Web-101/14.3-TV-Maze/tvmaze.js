/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  const res = await axios.get(`https://api.tvmaze.com//search/shows?q=${query}`);
  const showResults = res.data;
  const shows = [];

  for (let show of showResults) {
    const { id, name, summary } = show.show;
    const image = show.show.image ? show.show.image.original : 'https://tinyurl.com/tv-missing';
    shows.push({ id, name, summary, image });
  }
  return shows;
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */
function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    // console.log(shows.image);
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
          <img class="card-img-top" src="${show.image}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">Episodes</button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});

// Episode Button
$('#shows-list').on('click', '.btn.btn-primary', async function (e) {
  const id = $(this).closest('.card').data('show-id');
  const episodeList = await getEpisodes(id);
  populateEpisodes(episodeList);
})


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above
  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  const episodeList = res.data;
  const episodes = [];

  for (let episode of episodeList) {
    const { airdate, id, name, season, summary } = episode;
    episodes.push({ airdate, id, name, season, summary });
  }

  return episodes;
}

function populateEpisodes(episodes) {
  const $episodeList = $('#episodes-list');
  $episodeList.empty();


  for (let episode of episodes) {
    const { airdate, id, name, season, summary } = episode;
    const snippet = `<li><h5>${name}</h5><p>${summary}</p></li>`;
    $episodeList.append(snippet)
  }
  $('#episodes-area').show();
}