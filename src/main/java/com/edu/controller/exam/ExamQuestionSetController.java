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
import com.edu.db.repository.ExamStatsRepository;
import com.edu.db.repository.QuestionBankRepository;
import com.edu.model.ExamReport;
import com.edu.pojo.QuestionDocument;
import com.google.gson.Gson;


@Controller
@RequestMapping("set")
public class ExamQuestionSetController{
	
	@Autowired
	QuestionBankRepository bankRepo;
	
	@Autowired
	Gson gson;
	
	/**
	 * persists exam stats
	 * @param examReport
	 */
	/*@RequestMapping(value = "/save", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	public void saveExamSet(@RequestBody ExamReport examReport,HttpServletResponse response) {
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
	}*/
	
	/**
	 * fetches exam stats
	 */
	@RequestMapping(value = "/questions/{subject}/{subjectCategory}", method = RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<QuestionDocument> getExamStats(@PathVariable String subject,@PathVariable String subjectCategory) {
		System.out.println("getExamStats() request received. subject:"+subject+" subjectCategory:"+subjectCategory);
		List<QuestionDocument> questionDocList=null;
		try {
			if((subject!=null && !"".equals(subject)) || (subjectCategory!=null && !"".equals(subjectCategory))){
				if(subjectCategory!=null && !"".equals(subjectCategory)){
					questionDocList=bankRepo.findBySubjectAndSubjectCategory(subject, subjectCategory);
				}else{
					questionDocList=bankRepo.findBySubject(subject);
				}
			}else{
				questionDocList=bankRepo.findAll();
			}			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return questionDocList;		
	}	

}
