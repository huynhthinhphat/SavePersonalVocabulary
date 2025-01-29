package com.example.StudyWordToeic.controller;

import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

	@GetMapping({ "", "/" })
	public String addnewWord() {
		return "views/index";
	}
	
	@GetMapping("/luyentap_AV")
	public String examAV() {
		return "views/luyentap_AV";
	}
	
	@GetMapping("/luyentap_VA")
	public String examVA() {
		return "views/luyentap_VA";
	}
	
	@GetMapping("/ghituvung")
	public String writeWord() {
		return "views/ghituvung";
	}
}
