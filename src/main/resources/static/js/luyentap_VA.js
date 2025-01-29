document.addEventListener('DOMContentLoaded', function() {
	var question_word = document.getElementById('question_word');
	var container_next_word = document.getElementById('container-next-word');

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

		let arrayAnswer = [];

		while (arrayAnswer.length < 3) {
			let index_answer = Math.floor(Math.random() * (list.length));

			if (index_answer != index) {
				if (!arrayAnswer.includes(list[index_answer].word)) {
					arrayAnswer.push(list[index_answer].word);
				}
			}
		}
		arrayAnswer.push(list[index].word);
		arrayAnswer.sort();

		var answers = document.getElementById('answers');
		answers.innerHTML = '';

		let answer = '';
		arrayAnswer.forEach(function(item) {
			answer += `<div data='${item}' class="btn_answer">
							<i class="fa-solid fa-x" style="color: rgba(255, 152, 58, 1)"></i>
							<i class="fa-solid fa-check" style="color: #59e8b5"></i>
							${item}
						</div>`;
		})
		answers.innerHTML = answer;

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

	function checkAnswer() {
		let list = JSON.parse(localStorage.getItem('listQuestion'));
		var btn_answer = document.querySelectorAll('.btn_answer');
		btn_answer.forEach(function(button) {
			button.addEventListener('click', function() {
				let data = button.getAttribute('data');
				var icon_check = button.querySelectorAll('.fa-solid');
				list.forEach(function(item) {
					if (item.meaning == question_word.textContent && !item.status) {
						if (item.word == data) {
							item.status = true;

							button.classList.add('correct');

							icon_check[1].style.opacity = '1';

							localStorage.setItem('listQuestion', JSON.stringify(list));
							number++;
						} else {
							button.classList.add('incorrect');
							icon_check[0].style.opacity = '1';

							btn_answer.forEach(function(button_correct) {
								let data_correct = button_correct.getAttribute('data');
								var icon_correct = button_correct.querySelectorAll('.fa-solid');

								if (data_correct == item.word) {
									button_correct.classList.add('correct');

									icon_correct[1].style.opacity = '1';
								}
							})
						}

						btn_answer.forEach(function(button) {
							if (!button.classList.contains('correct') && !button.classList.contains('incorrect')) {
								button.classList.add('disable');
							}
						})

						container_next_word.classList.add('show');
					}
				})
			})
		})
	}

	nextQuestion();
	function nextQuestion() {
		let list = JSON.parse(localStorage.getItem('listQuestion'));
		var btn_continue = document.getElementById('btn_continue');
		btn_continue.addEventListener('click', function() {
			if (number != list.length) {
				$('#quantity_question_correct').html('Số câu đúng: ' + number + '/' + list.length);
				randomQuestion();
			} else {
				finishStudy();
			}
			container_next_word.classList.remove('show');
		})
	}
})