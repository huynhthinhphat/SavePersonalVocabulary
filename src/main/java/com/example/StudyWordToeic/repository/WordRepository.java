package com.example.StudyWordToeic.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.*;

import com.example.StudyWordToeic.entities.Word;

@Repository
public interface WordRepository extends JpaRepository<Word, String>{

	@Query("SELECT w FROM Word w ORDER BY w.word ASC")
	List<Word> findAllAndSort(Pageable pageable);
	
	@Query("SELECT w FROM Word w WHERE w.word LIKE %:keyword% ORDER BY w.word ASC")
	List<Word> findWordsSearch(@Param("keyword") String keyword);
}
