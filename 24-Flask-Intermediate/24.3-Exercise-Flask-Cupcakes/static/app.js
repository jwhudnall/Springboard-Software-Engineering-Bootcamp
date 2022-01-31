const populateCupcakeList = async function() {
	// Refactor to accept a json response
	const cupcakes = await getCupcakes();
	for (let c of cupcakes) {
		addCupcakeLi(c);
	}
};

const getCupcakes = async function() {
	try {
		const res = await axios.get('/api/cupcakes');
		return res.data.cupcakes;
	} catch (e) {
		alert(`API Issue. Error: ${e}`);
	}
};

const addCupcakeLi = function(c) {
	const $newLi = $(`<li>${c.flavor}</li>`);
	$newLi.attr('data-id', `${c.id}`);
	$('#cupcake-lst').append($newLi);
};

const addCupcake = async function() {
	const url = '/api/cupcakes';
	const flavor = $('#flavor').val();
	const size = $('#size').val();
	const rating = $('#rating').val();
	const image = $('#image').val();
	try {
		const res = await axios.post(url, { flavor, size, rating, image });
		addCupcakeLi(res.cupcake);
	} catch (e) {
		alert('Something went wrong.');
	}
};

const filterCupcakes = async function(e) {
	e.preventDefault();
	const term = $('#search-term').val();
	const res = await axios.get('/api/cupcakes', {
		params: {
			term: term
		}
	});
	console.dir(res);
	$('#cupcake-lst').empty();

	for (let c of res.data.cupcakes) {
		addCupcakeLi(c);
	}
};

$(document).ready(function() {
	populateCupcakeList();
	$('#cupcake-form').submit(addCupcake);
	$('#search-form').on('submit', filterCupcakes);
});
