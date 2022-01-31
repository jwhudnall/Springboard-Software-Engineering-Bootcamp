const populateCupcakeList = async function() {
	cupcakes = await getCupcakes();
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
	$newLi = $(`<li>${c.flavor}</li>`);
	$newLi.attr('data-id', `${c.id}`);
	$('#cupcake-lst').append($newLi);
};

const addCupcake = async function() {
	url = '/api/cupcakes';
	flavor = $('#flavor').val();
	size = $('#size').val();
	rating = $('#rating').val();
	image = $('#image').val();
	try {
		res = await axios.post(url, { flavor, size, rating, image });
		addCupcakeLi(res.cupcake);
	} catch (e) {
		alert('Something went wrong.');
	}
};

populateCupcakeList();
$('#cupcake-form').submit(addCupcake);
