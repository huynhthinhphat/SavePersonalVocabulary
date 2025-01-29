package com.example.StudyWordToeic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.StudyWordToeic.entities.Word;
import com.example.StudyWordToeic.service.WordService;

@RestController
public class AddNewWordController {

	@Autowired
	private WordService service;

	@GetMapping("/get_all_word/{page}")
	public List<Word> findAll(@PathVariable int page) {		
		return service.findAll(page);
	}

	@GetMapping("/add/{keyword}/{meaning}")
	public Word add(@PathVariable String keyword, @PathVariable String meaning) {
		return service.add(keyword, meaning);
	}

	@DeleteMapping("/delete/{keyword}")
	public boolean delete(@PathVariable String keyword) {
		return service.delete(keyword);
	}

	@GetMapping("/search_word/{keyword}")
	public List<Word> findWordsSearch(@PathVariable String keyword) {
		return service.findWordsSearch(keyword);
	}
	
	@GetMapping("/total")
	public long totalWord() {
		return service.totalWord();
	}
}
