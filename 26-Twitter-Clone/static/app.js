$(document).ready(function() {
	$('#newMessage').on('show.bs.modal', async function(e) {
		const html = await getMsgFormHTML();
		$('#modal-body').append(html);
	});

	$('#newMessage').on('hidden.bs.modal', function() {
		$('#modal-body').empty();
	});

	$('#messages').on('click', '#likeBtn', likeMessage);
});

async function getMsgFormHTML() {
	const res = await axios({
		url: '/messages/new',
		method: 'GET'
	});
	return res.data;
}

async function likeMessage(e) {
	e.preventDefault();
	const $tgt = $(e.target);
	const msgid = $tgt.closest('li').data().msgid;
	try {
		const res = await axios({
			url: `/users/add_like/${msgid}`,
			method: 'POST'
		});
	} catch (err) {
		alert(`Something went wrong with the API. Info: ${err}`);
	}
	$tgt.closest('i').toggleClass('fas far');
}
