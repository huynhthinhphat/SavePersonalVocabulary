document.addEventListener('DOMContentLoaded', function() {
	var question_word = document.getElementById('question_word');
	var form = document.getElementById('form');
	var text_word = document.getElementById('text_word');
	var form_answer = document.getElementById('form-answer');
	var contrainer_answer_correct = document.getElementById('contrainer_answer_correct');
	var container_next_word = document.getElementById('container-next-word');
	var btn_forgot_meaning = document.getElementById('btn_forgot_meaning');

	var icon_check = form.querySelectorAll('.fa-solid');

	let number = 0;

	loadQuestion();
	function loadQuestion() {
		$.ajax({
			url: '/set_session',
			method: 'GET',
			success: function(res) {
				if (res) {
					localStorage.setItem('listQuestion', JSON.stringify(res));
					$('#quantity_question_correct').html('Số câu đúng: ' + number + '/' + res.length);
					randomQuestion();
				}
			}
		})
	}

	function randomQuestion() {
		let list = JSON.parse(localStorage.getItem('listQuestion'));

		let index = -1;
		let stop = false;
		do {
			//question
			index = Math.floor(Math.random() * (list.length));
			if (list[index].status) {
				continue;
			}

			question_word.innerHTML = list[index].meaning;
			stop = true;
		} while (!stop)

		btn_forgot_meaning.addEventListener('click', function() {
			$('#text_forgot_meaning').html(list[index].word);
		})

		checkAnswer();
	}

	function finishStudy() {
		Swal.fire({
			title: 'Đã hoàn thành',
			icon: 'success',
			confirmButtonText: 'Làm lại',
			showCancelButton: true,
			cancelButtonText: 'Thoát'
		}).then((result) => {
			if (result.isConfirmed) {
				window.location.reload();
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				window.location.href = "http://localhost:8080/";
			}
		});
	}

	let isSubmitHandlerAttached = false;

	function checkAnswer() {
		text_word.value = '';

		let list = JSON.parse(localStorage.getItem('listQuestion'));

		if (!isSubmitHandlerAttached) {
			form.addEventListener('submit', function(e) {
				e.preventDefault();

				if (text_word.value.trim() != '') {
					list.forEach(function(item) {
						if (item.meaning.trim().toLowerCase() == question_word.textContent.trim().toLowerCase()) {
							if (text_word.value.trim().toLowerCase() == item.word.trim().toLowerCase()) {
								item.status = true;

								form_answer.classList.add('correct');
								icon_check[1].style.opacity = '1';

								localStorage.setItem('listQuestion', JSON.stringify(list));
								number++;

								$('#quantity_question_correct').html('Số câu đúng: ' + number + '/' + list.length);
							} else {
								form_answer.classList.add('incorrect');
								icon_check[0].style.opacity = '1';

								$('#answer_correct').html(item.word.trim().toLowerCase());

								contrainer_answer_correct.classList.add('show_answer_correct');
							}
						}
					});
					text_word.readOnly = true;
					container_next_word.classList.add('show');
				}
			});

			isSubmitHandlerAttached = true;
		}
	}

	nextQuestion();
	function nextQuestion() {
		let list = JSON.parse(localStorage.getItem('listQuestion'));
		var btn_continue = document.getElementById('btn_continue');
		btn_continue.addEventListener('click', function() {
			console.log(number)
			if (number != list.length) {
				randomQuestion();
			} else {
				finishStudy();
			}
			text_word.readOnly = false;
			icon_check[0].style.opacity = '0';
			icon_check[1].style.opacity = '0';
			form_answer.classList.remove('correct')
			form_answer.classList.remove('incorrect')
			contrainer_answer_correct.classList.remove('show_answer_correct');
			container_next_word.classList.remove('show');
			$('#text_forgot_meaning').html('');
		})
	}
})