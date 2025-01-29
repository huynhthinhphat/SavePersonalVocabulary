package com.example.StudyWordToeic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.StudyWordToeic.entities.Exam;
import com.example.StudyWordToeic.service.WordService;

@RestController
public class ExamController {

	@Autowired
	private WordService service;

	@GetMapping("/set_session")
	public List<Exam> getList() {
		service.addList();
		return service.getWords();
	}

	@GetMapping("/set_status/{keyword}")
	public Boolean setStatusForKeyWord(@PathVariable String keyword) {
		return service.setStatusForKeyWord(keyword);
	}
}
