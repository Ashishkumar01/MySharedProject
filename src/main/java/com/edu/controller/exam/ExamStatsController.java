package com.edu.controller.exam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.edu.db.repository.ExamScoreRepository;
import com.edu.db.repository.ExamStatsRepository;
import com.edu.model.ExamReport;
import com.google.gson.Gson;


@Controller
@RequestMapping("exam")
public class ExamStatsController{
	
	@Autowired
	ExamScoreRepository examRepo;
	
	@Autowired
	ExamStatsRepository examStatsRepo;
	
	@Autowired
	Gson gson;
	
	@RequestMapping(value = "/save", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	public void saveExamStats(@RequestBody String examReport) {
		System.out.println("saveExamStats() examScore received:"+examReport);
		try {
			ExamReport examReportObj = gson.fromJson(examReport, ExamReport.class);
			System.out.println("saveExamStats() save ExamScore:"+examReportObj.getExamScore());
			examRepo.save(examReportObj.getExamScore());
			
			System.out.println("saveExamStats() save ExamStatsList -- total questions:"+examReportObj.getExamStatList().size());
			examStatsRepo.save(examReportObj.getExamStatList());
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}
	
	

}
