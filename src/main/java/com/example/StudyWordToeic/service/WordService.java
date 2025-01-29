package com.example.StudyWordToeic.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.StudyWordToeic.entities.Exam;
import com.example.StudyWordToeic.entities.Word;
import com.example.StudyWordToeic.repository.WordRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Service
public class WordService {

	@Autowired
	private WordRepository repo;

	@Autowired
	private HttpSession session;

	public List<Exam> getWords() {
		@SuppressWarnings("unchecked")
		List<Exam> list = (List<Exam>) session.getAttribute("list_word");
		if (list == null) {
			list = new ArrayList<>();
			session.setAttribute("list_word", list);
		}
		return list;
	}

	public void addList() {
		List<Exam> list = new ArrayList<>();

		for (Word word : repo.findAll()) {
			Exam exam = new Exam();
			exam.setWord(word.getWord());
			exam.setMeaning(word.getMeaning());
			exam.setStatus(false);

			list.add(exam);
		}
		session.setAttribute("list_word", list);
	}

	public Boolean setStatusForKeyWord(String keyword) {
		@SuppressWarnings("unchecked")
		List<Exam> list = (List<Exam>) session.getAttribute("list_word");
		for (Exam e : list) {
			if (e.getWord().equals(keyword)) {
				e.setStatus(true);
				return true;
			}
		}
		session.setAttribute("list_word", list);
		return false;
	}

	public void clearList() {
		session.removeAttribute("list_word");
	}
	
	public long totalWord() {
		return repo.count();
	}

	public List<Word> findAll(int page) {
		 Pageable pageable = PageRequest.of(page, 50);
		return repo.findAllAndSort(pageable);
	}

	public Word add(String keyword, String meaning) {
		if (repo.findById(keyword).isPresent()) {
			return null;
		}

		Word word = new Word();
		word.setWord(keyword);
		word.setMeaning(meaning);

		return repo.save(word);
	}

	public boolean delete(String keyword) {
		if (repo.findById(keyword).isPresent()) {
			repo.deleteById(keyword);

			if (!repo.findById(keyword).isPresent()) {
				return true;
			}
		}

		return false;
	}

	public List<Word> findWordsSearch(String keyword) {
		return repo.findWordsSearch(keyword);
	}
}
