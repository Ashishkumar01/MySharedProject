package com.edu.controller.exam;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.edu.db.domain.ExamSet;
import com.edu.db.domain.ExamSetDtl;
import com.edu.db.repository.ExamSetRepository;
import com.edu.db.repository.QuestionBankRepository;
import com.edu.model.SearchParams;
import com.edu.pojo.QuestionDocument;
import com.google.gson.Gson;


@Controller
@RequestMapping("set")
public class ExamQuestionSetController{
	
	@Autowired
	QuestionBankRepository bankRepo;
	
	@Autowired
	ExamSetRepository examSetRepo;
	
	@Autowired
	Gson gson;
	
	/**
	 * persists exam stats
	 * @param examReport
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	public void saveExamSet(@RequestBody ExamSet examSet,HttpServletResponse response) {
		System.out.println("saveExamSet() data received:"+examSet);
		try {
			Map<String,ExamSetDtl> tempMap=new HashMap<String,ExamSetDtl>();
			System.out.println("saveExamSet() save ExamSet:"+examSet.getTotalQuestions());
			List<ExamSetDtl> tempDtlList=examSet.getExamSetDetails();
			//sort dtlList in order of Subject
			Collections.sort(tempDtlList,new Comparator<ExamSetDtl>(){
				public int compare(ExamSetDtl o1, ExamSetDtl o2) {
					return o1.getSubject().compareTo(o2.getSubject());
				}
				
			} );
			ExamSetDtl tempDtl=null;
			/*convert dtls to below format
			 * "subject":"Quantitative Aptitude","start_number":0,"end_number":9,"active": true,"linked_questions": "0,1,2"
			 * */
			for(int i=0; i<tempDtlList.size(); i++){
				tempDtl=tempDtlList.get(i);
				if(tempMap.containsKey(tempDtl.getSubject())){
					ExamSetDtl tempSetDtl=tempMap.get(tempDtl.getSubject());
					tempSetDtl.setEndIndex(i);
					tempSetDtl.setLinkedQuestions(tempSetDtl.getLinkedQuestions()+","+i);					
				}else{
					ExamSetDtl tempSetDtl=new ExamSetDtl();
					tempSetDtl.setStartIndex(i);
					tempSetDtl.setEndIndex(i);
					tempSetDtl.setLinkedQuestions(""+i);
					tempSetDtl.setSubject(tempDtl.getSubject());
					tempSetDtl.setActive(true);
					tempSetDtl.setExamSet(examSet);
					
					tempMap.put(tempDtl.getSubject(),tempSetDtl);
				}
			}
			
			//set the ordered examsetDtl
			List<ExamSetDtl> finalDtlList=new ArrayList<ExamSetDtl>();
			for(ExamSetDtl temp:tempMap.values()){
				finalDtlList.add(temp);
			}
			examSet.setExamSetDetails(finalDtlList);
			examSetRepo.save(examSet);
			
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
			return;
		}
		
		response.setStatus(HttpStatus.OK.value());		
	}
	
	/**
	 * fetches exam stats
	 */
	@RequestMapping(value = "/questions", method = RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<QuestionDocument> getQuestions(@RequestBody SearchParams searchParams) {
		System.out.println("getExamStats() request received. subject:"+searchParams.getSubject()+" subjectCategory:"+searchParams.getSubjectCriteria());
		List<QuestionDocument> questionDocList=null;
		try {
			String subject=searchParams.getSubject();
			String subjectCategory=searchParams.getSubjectCriteria();
			
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
	
	@RequestMapping(value = "/examset/{examSetId}", method = RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ExamSet getExamSet(@PathVariable String examSetId) {
		System.out.println("getExamSet() request received for examSetId:"+examSetId);
		ExamSet set=null;
		try {
			List<ExamSet> setList=examSetRepo.findByExamSetId(Long.parseLong(examSetId));
			if(setList!=null && !setList.isEmpty()){
				set=setList.get(0);
				System.out.println("No of Questions Attached: "+set.getExamSetDetails().size());				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return set;		
	}

}
