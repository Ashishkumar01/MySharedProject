package com.edu.controller.exam;

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

import com.edu.db.domain.ExamScore;
import com.edu.db.domain.ExamStats;
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
	
	/**
	 * persists exam stats
	 * @param examReport
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	public void saveExamStats(@RequestBody ExamReport examReport,HttpServletResponse response) {
		System.out.println("saveExamStats() examScore received:"+examReport);
		try {
			//ExamReport examReportObj = gson.fromJson(examReport, ExamReport.class);
			ExamReport examReportObj = examReport;
			System.out.println("saveExamStats() save ExamScore:"+examReportObj.getExamScore());
			examRepo.save(examReportObj.getExamScore());
			
			System.out.println("saveExamStats() save ExamStatsList -- total questions:"+examReportObj.getExamStatList().size());
			examStatsRepo.save(examReportObj.getExamStatList());
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
		}
		
		response.setStatus(HttpStatus.OK.value());		
	}
	
	/**
	 * fetches exam stats
	 */
	@RequestMapping(value = "/report/{examId}/{attemptNo}", method = RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ExamReport getExamStats(@PathVariable String examId,@PathVariable String attemptNo,@RequestBody String userId) {
		System.out.println("getExamStats() request received. examId:"+examId+" attemptNo:"+attemptNo+" userId:"+userId);
		ExamReport examReport=new ExamReport();
		try {
			//code to fetch exam stats
			List<ExamScore> examScoreList=examRepo.findByExamIdAndUserIdAndAttemptNo(examId, userId, Integer.parseInt(attemptNo));
			if(examScoreList!=null && examScoreList.size()>0){
				System.out.println("examScoreList size:"+examScoreList.size());
				examReport.setExamScore(examScoreList.get(0));
				
				List<ExamStats> examStatsList=examStatsRepo.findByExamIdAndUserIdAndAttemptNo(examId, userId, Integer.parseInt(attemptNo));
				if(examStatsList!=null){
					System.out.println("examStatsList size:"+examStatsList.size());
					examReport.setExamStatList(examStatsList);
				}				
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return examReport;		
	}	
	

}
