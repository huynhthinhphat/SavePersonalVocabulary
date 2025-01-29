package com.example.StudyWordToeic.entities;

import jakarta.persistence.*;

@Entity
public class Word {

	@Id
	@Column(columnDefinition = "VARCHAR(225)") 
	private String word;

	@Column(columnDefinition = "VARCHAR(225)") 
	private String meaning;

	public String getWord() {
		return word;
	}

	public void setWord(String word) {
		this.word = word;
	}

	public String getMeaning() {
		return meaning;
	}

	public void setMeaning(String meaning) {
		this.meaning = meaning;
	}
}
