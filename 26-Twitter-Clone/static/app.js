$(document).ready(function() {
	// $('#submitMsg').on('click', async function(e) {
	// 	formData = {
	// 		msg: $('#msgText').val()
	// 	};
	// 	const res = await axios({
	// 		url: '/messages/new',
	// 		method: 'POST',
	// 		data: formData
	// 	});
	// 	console.dir(res);
	// });

	$('#newMessage').on('show.bs.modal', async function(e) {
		// var link = $(e.relatedTarget);
		const res = await axios({
			url: '/messages/new',
			method: 'GET'
		});

		console.log('Modal toggled!');
		$('#modal-body').append(res.data);
	});

	// TODO: on hide.bs.modal, $('#modal-body').empty()
	$('#newMessage').on('hidden.bs.modal', function() {
		$('#modal-body').empty();
		console.log('Modal body cleared!');
	});
});
