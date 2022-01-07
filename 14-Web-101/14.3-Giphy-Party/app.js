const gifContainer = document.querySelector('#gif-container');
const gifForm = document.querySelector('#gif-form');
const delBtn = document.querySelector('#remove-btn');

delBtn.addEventListener('click',clearGifs);

gifForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const q = e.target.search.value;
  giphySearch(q);
  e.target.search.value = '';
})


const giphySearch = async function (q) {
  try {
    const res = await axios.get('https://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: 'X8u8SGkuk7axOu2S1PpGLm5DJPKYthKq',
        q
      }
    });
    appendGif(res);
  } catch (e) {
    alert('Try another search term!');
  }
}

const appendGif = function (res) {
  const randIdx = Math.floor(Math.random() * res.data.data.length);
  const gifURL = res.data.data[randIdx].images.original.url;
  const newGif = document.createElement('img');
  newGif.src = gifURL;
  gifContainer.append(newGif);
}

function clearGifs() {
  gifContainer.innerHTML = '';
}