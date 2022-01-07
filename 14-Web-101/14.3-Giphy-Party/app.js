const gifForm = document.querySelector('#gif-form');

gifForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const q = e.target.search.value;
  giphySearch(q);
})

const giphySearch = async function (q) {
  const res = await axios.get('https://api.giphy.com/v1/gifs/search', {
    params: {
      api_key: 'X8u8SGkuk7axOu2S1PpGLm5DJPKYthKq',
      q:q
    }
  });
  appendGif(res);
}

const appendGif = function (res) {
  // TODO: Randomize returned image
  const gifURL = res.data.data[0].images.original.url;
  const newGif = document.createElement('img');
  newGif.src = gifURL;
  document.body.append(newGif);
}