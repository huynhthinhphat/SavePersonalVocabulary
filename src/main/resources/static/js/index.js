document.addEventListener('DOMContentLoaded', function() {
	var form = document.getElementById('form');
	var notice = document.getElementById('notice');
	var tbody = document.getElementById('tbody');
	var page_choose = 0;

	form.addEventListener('submit', function(e) {
		e.preventDefault();

		var word = document.getElementById('word');
		var meaning = document.getElementById('meaning');

		$.ajax({
			url: '/add/' + word.value.trim() + '/' + meaning.value.trim(),
			method: 'GET',
			success: function(res) {
				if (res != '') {
					loadData();

					$('#text_notice').html('Thêm thành công');
					notice.classList.add('show');
					setTimeout(function() {
						notice.classList.remove('show');
						$('#text_notice').html('');
					}, 1500);

					word.value = '';
					meaning.value = '';
				} else {
					Swal.fire({
						title: 'Từ vựng đã tồn tại',
						icon: 'info',
						confirmButtonText: 'Hiển thị từ vựng này'
					}).then((result) => {
						if (result.isConfirmed) {
							moveToWords(word.value.trim());
						}
					});
				}
			}
		})
	})

	loadData();
	function loadData() {
		tbody.innerHTML = '';
		$.ajax({
			url: '/get_all_word/0',
			method: 'GET',
			success: function(res) {
				if (res) {
					res.forEach(function(item, index) {
						var inner = `<tr>
							<td>${index + 1}</td>
							<td>${item.word}</td>
							<td>${item.meaning}</td>
							<td><button data="${item.word}" class="btn_delete">Xóa</button></td>
						</tr>`;

						tbody.innerHTML += inner;
					})

					$.ajax({
						url: '/total',
						method: 'GET',
						success: function(res) {
							if (res) {
								$('#number_word').html(res + ' từ vựng toeic');

								var container_page = document.getElementById('page');

								let totalPage = Math.ceil(res / 50);

								var pages = '';
								for (let i = 0; i < totalPage; i++) {
									pages += `<button class="btn_page ${i === page_choose ? 'active_page' : ''}" data="${i}">${i + 1}</button>`;
								}
								container_page.innerHTML = pages;

								loadFollowPage();
							}
						}
					})
					deleteWord();
				}
			}
		})
	}

	function deleteWord() {
		var btn_delete = document.querySelectorAll('.btn_delete');
		btn_delete.forEach(function(item) {
			item.addEventListener('click', function() {
				Swal.fire({
					title: 'Bạn muốn xóa?',
					icon: 'question',
					confirmButtonText: 'OK'
				}).then((result) => {
					if (result.isConfirmed) {
						var data = item.getAttribute('data');
						$.ajax({
							url: '/delete/' + data,
							method: 'DELETE',
							success: function(res) {
								if (res == true) {
									loadData();

									$('#text_notice').html('Xóa thành công');
									notice.classList.add('show');
									setTimeout(function() {
										notice.classList.remove('show');
										$('#text_notice').html('Xóa thành công');
									}, 1500);
								}
							}
						})
					}
				});
			})
		})
	}

	function moveToWords(keyword) {
		var tbody = document.getElementById('tbody');
		tbody.innerHTML = '';
		$.ajax({
			url: '/search_word/' + keyword,
			method: 'GET',
			success: function(res) {
				if (res) {
					$('#number_word').html(res.length + ' từ vựng toeic');

					res.forEach(function(item, index) {
						var inner = `<tr>
									<td>${index + 1}</td>
									<td>${item.word}</td>
									<td>${item.meaning}</td>
									<td><button data="${item.word}" class="btn_delete">Xóa</button></td>
								</tr>`;

						tbody.innerHTML += inner;
					})

					deleteWord();
				}
			}
		})
	}

	const width = window.innerWidth;
	const height = window.innerHeight;

	console.log('Chiều rộng:', width);
	console.log('Chiều cao:', height);

	function loadFollowPage() {
		var btn_page = document.querySelectorAll('.btn_page');
		btn_page.forEach(function(item) {
			item.addEventListener('click', function() {
				var data = item.getAttribute('data');

				btn_page[page_choose].classList.remove('active_page');
				
				page_choose = data;
				item.classList.add('active_page')
				
				$.ajax({
					url: '/get_all_word/' + data,
					method: 'GET',
					success: function(res) {
						if (res) {
							window.scrollTo({ top: 0, behavior: 'smooth' });
							tbody.innerHTML = '';

							res.forEach(function(item, index) {
								var inner = `<tr>
												<td>${index + 1}</td>
												<td>${item.word}</td>
												<td>${item.meaning}</td>
												<td><button data="${item.word}" class="btn_delete">Xóa</button></td>
											</tr>`;

								tbody.innerHTML += inner;
							})
							deleteWord();
						}
					}
				})
			})
		})
	}
})