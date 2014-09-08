package com.edu.controller.exam;

import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.edu.controller.question.FileUploadController;
import com.edu.db.domain.ExamSet;
import com.edu.db.domain.ExamSetDtl;
import com.edu.db.repository.ExamSetRepository;
import com.edu.db.repository.QuestionBankRepository;
import com.edu.model.QuestionWithMetadata;
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
			int questionNo=1;
			for(int i=0; i<tempDtlList.size(); i++){
				questionNo=i+1;
				tempDtl=tempDtlList.get(i);
				if(tempMap.containsKey(tempDtl.getSubject())){
					ExamSetDtl tempSetDtl=tempMap.get(tempDtl.getSubject());
					tempSetDtl.setEndIndex(questionNo);
					tempSetDtl.setLinkedQuestions(tempSetDtl.getLinkedQuestions()+","+questionNo);					
				}else{
					ExamSetDtl tempSetDtl=new ExamSetDtl();
					tempSetDtl.setStartIndex(questionNo);
					tempSetDtl.setEndIndex(questionNo);
					tempSetDtl.setLinkedQuestions(""+questionNo);
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
	
	@RequestMapping(value = "/loadQuestion/{language}", method = RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE, consumes=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<QuestionWithMetadata> loadQuestion(@RequestBody List<ExamSetDtl> examSetDtlList,@PathVariable String language) {
		System.out.println("loadQuestion() request received for examSetId:"+examSetDtlList);
		List<QuestionWithMetadata> questionsData = new ArrayList<QuestionWithMetadata>();
		FileUploadController uploadController = new FileUploadController();
		try 
		{
			/*HashMap<String,Object> questionMap = gson.fromJson(questionLinked, HashMap.class);
			List<ExamSetDtl> examSetDtlList = (List<ExamSetDtl>)questionMap.get("examSetDetails");*/
			
				for (ExamSetDtl setDtl:examSetDtlList)
				{
					// System.out.println(gson.fromJson(examListItr.next().toString(), HashMap.class));
					String linkQuestions = setDtl.getLinkedQuestions();
					System.out.println("linkQuestions:"+linkQuestions);
					String[] questionList=linkQuestions.split(",");
					
					for (String questionId:questionList)
					{
						long fileId = Long.parseLong(questionId);
						File questionFile = uploadController.getQuestionFile(fileId,language);
						String contents = FileUtils.readFileToString(questionFile, "UTF-8");
						System.out.println(contents);
						QuestionWithMetadata questionsInJson =gson.fromJson(contents, QuestionWithMetadata.class);
						//linkQuestionss.get("questions");
						//FileReader reader = new FileReader(uploadController.getQuestionFile(fileId));
						//HashMap questionDataMap = gson.fromJson(reader, HashMap.class);
						questionsData.add(questionsInJson);
					}
				 }
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return questionsData;		
	}
	
	/**
	 * gets all examsets
	 * @param examSetId
	 * @return
	 */
	@RequestMapping(value = "/examsets", method = RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<Map<String,String>> getAllExamSets() {
		System.out.println("getExamSet() request received.");
		List<Map<String,String>> examList=new ArrayList<Map<String,String>>();
		Map<String,String> json = null;
		try {
			List<ExamSet> setList=(List<ExamSet>) examSetRepo.findAll();
			for(ExamSet exam:setList){
				json = new HashMap<String,String>();
				json.put("id", exam.getExamSetId().toString());
				json.put("name", exam.getName());
				json.put("code", exam.getCode());			
				
				examList.add(json);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return examList;		
	}

}
