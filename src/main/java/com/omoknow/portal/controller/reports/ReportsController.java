package com.omoknow.portal.controller.reports;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.omoknow.portal.db.domain.ExamScore;
import com.omoknow.portal.db.domain.ExamStats;
import com.omoknow.portal.db.repository.ExamScoreRepository;
import com.omoknow.portal.db.repository.ExamStatsRepository;
import com.omoknow.portal.model.ExamReport;
import com.google.gson.Gson;


@Controller
@RequestMapping("reports")
public class ReportsController{
	
	@Autowired
	ExamScoreRepository examRepo;
	
	@Autowired
	ExamStatsRepository examStatsRepo;
	
	@Autowired
	Gson gson;
	
	
	/**
	 * fetches reports data
	 */
	@RequestMapping(value = "/exams", method = RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<ExamReport> fetchAllExamsData(@RequestBody String userId) {
		System.out.println("fetchAllExamsData() request received for userId:"+userId);
		List<ExamReport> reportList=new ArrayList<ExamReport>();
		ExamReport examReport=null;
		try {
			//code to fetch exam stats
			List<ExamScore> examScoreList=examRepo.findByUserId(userId);
			System.out.println("examsList size:"+examScoreList.size());
			if(examScoreList!=null && examScoreList.size()>0){
				List<ExamStats> examStatsList=null;
				for(ExamScore examScore:examScoreList){
					examReport=new ExamReport();
					examReport.setExamScore(examScore);
					
					examStatsList=examStatsRepo.findByExamIdAndUserIdAndAttemptNo(examScore.getExamId(), userId, examScore.getAttemptNo());
					if(examStatsList!=null){
						System.out.println("Examset Question list size:"+examStatsList.size());
						examReport.setExamStatList(examStatsList);
					}
					
					reportList.add(examReport);
				}								
			}			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportList;		
	}	
	

}
