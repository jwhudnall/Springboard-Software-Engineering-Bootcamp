$(document).ready(function() {
	$('#newMessage').on('show.bs.modal', async function(e) {
		const html = await getMsgFormHTML();
		$('#modal-body').append(html);
	});

	$('#newMessage').on('hidden.bs.modal', function() {
		$('#modal-body').empty();
	});
});

async function getMsgFormHTML() {
	const res = await axios({
		url: '/messages/new',
		method: 'GET'
	});
	return res.data;
}
