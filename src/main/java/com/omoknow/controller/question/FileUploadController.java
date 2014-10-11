package com.omoknow.controller.question;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FileUtils;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.omoknow.db.repository.QuestionBankRepository;
import com.omoknow.model.QuestionWithMetadata;
import com.omoknow.pojo.Question;
import com.omoknow.pojo.QuestionDocument;
import com.omoknow.pojo.Questions;


@Controller
@RequestMapping("upload")
public class FileUploadController{
	
	public static final String PROPERTY_CONF_QUESTION = "question.dir.path";

	@Autowired
	QuestionBeanProcessor questionProcessor;

	@Autowired
	ObjectMapper mapper;
	
	@Autowired
	QuestionBankRepository bankRepo;
	
	private File questionDir;
	int dirFileCount = 0;
	
	public FileUploadController(){
		try 
		{
			questionDir = FileUtils.getFile("D:/questiondir");
		} 
		catch (Exception e1) 
		{
			e1.printStackTrace();
		}
		if(!questionDir.exists()){
			try {
				FileUtils.forceMkdir(questionDir);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		dirFileCount = questionDir.listFiles().length;
	}
	
	/**
	 * uploads question xls and returns list to client UI for edit
	 * @param request
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST, value = { "uploadFile.do" },produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<QuestionDocument> uploadFile(HttpServletRequest request) {

		try {
			ServletFileUpload upload = new ServletFileUpload();

			FileItemIterator fileItemIterator = upload.getItemIterator(request);
			while (fileItemIterator.hasNext()) {
				FileItemStream item = fileItemIterator.next();
				if (item.isFormField()) {
				} else {
					List<QuestionDocument> document =questionProcessor
									.getQuestionListFromExcel(item.openStream());
					return document;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		
		return null;
	}
	
	/**
	 * persists question matadata in DB and create json file for questions
	 * @param request
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(method = RequestMethod.POST, value = { "saveQuestions.do" },produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody int saveQuestions(@RequestBody QuestionDocument[] request) throws IOException {
		int count=0;
		List<Question> singleQuestion=null;
		List<Questions> questionList=null;
		QuestionDocument savedQuestionDocument;
		QuestionWithMetadata questionWithMetadata;
		List<Question> questionsEnglish;
		List<Question> questionsHindi;
		for (QuestionDocument questionDocument : request) {
			savedQuestionDocument=bankRepo.save(questionDocument);
			
			questionWithMetadata=copyQuestionDocument(savedQuestionDocument);
			questionsEnglish=new ArrayList<Question>();
			questionsHindi=new ArrayList<Question>();
			
			questionList=questionDocument.getQuestions();
			for(Questions question:questionList){
				singleQuestion=question.getQuestions();
				for(Question rawQuestion:singleQuestion){
					if(rawQuestion.getLanguage().equalsIgnoreCase("HINDI")){
						questionsHindi.add(rawQuestion);
					}else{
						questionsEnglish.add(rawQuestion);
					}
					/*FileUtils.writeByteArrayToFile(getQuestionFile(savedQuestionDocument.getId(),rawQuestion.getLanguage()), objectToJSON(rawQuestion).getBytes());*/
				}				
			}
			//create json file for english
			if(!questionsEnglish.isEmpty()){
				questionWithMetadata.setQuestions(questionsEnglish);
				//FileUtils.writeByteArrayToFile(getQuestionFile(savedQuestionDocument.getId(),"ENGLISH"), objectToJSON(questionWithMetadata).getBytes());
				FileUtils.writeStringToFile(getQuestionFile(savedQuestionDocument.getId(),"ENGLISH"),objectToJSON(questionWithMetadata),"UTF-8");
			}			
			
			//create json file for hindi
			if(!questionsHindi.isEmpty()){
				questionWithMetadata.setQuestions(questionsHindi);
				//FileUtils.writeByteArrayToFile(getQuestionFile(savedQuestionDocument.getId(),"HINDI"), objectToJSON(questionWithMetadata).getBytes());
				FileUtils.writeStringToFile(getQuestionFile(savedQuestionDocument.getId(),"HINDI"),objectToJSON(questionWithMetadata),"UTF-8");
			}
			count++;
		}
		return count;
	}
	
	/**
	 * copy question document to another pojo
	 * @param questionDocument
	 * @return
	 */
	private QuestionWithMetadata copyQuestionDocument(QuestionDocument questionDocument){
		QuestionWithMetadata questionWithMetadata=new QuestionWithMetadata();
		questionWithMetadata.setId(questionDocument.getId());
		questionWithMetadata.setHasImage(questionDocument.getHasImage());
		questionWithMetadata.setImagePath(questionDocument.getImagePath());
		questionWithMetadata.setIsGraph(questionDocument.getIsGraph());
		questionWithMetadata.setIsPassage(questionDocument.getIsPassage());
		questionWithMetadata.setLanguageSupported(questionDocument.getLanguageSupported());
		questionWithMetadata.setMetaData(questionDocument.getMetaData());
		
		questionWithMetadata.setOptionType(questionDocument.getOptionType());
		questionWithMetadata.setPassage(questionDocument.getPassage());
		questionWithMetadata.setPassageQuestionCount(questionDocument.getPassageQuestionCount());
		questionWithMetadata.setPassageSheetName(questionDocument.getPassageSheetName());
		questionWithMetadata.setQuestionCategory(questionDocument.getQuestionCategory());
		questionWithMetadata.setQuestionSubType(questionDocument.getQuestionSubType());
		questionWithMetadata.setQuestionType(questionDocument.getQuestionType());
		questionWithMetadata.setSubject(questionDocument.getSubject());
		questionWithMetadata.setSubjectCategory(questionDocument.getSubjectCategory());
		questionWithMetadata.setTimeAllowed(questionDocument.getTimeAllowed());
		questionWithMetadata.setToughnessLevel(questionDocument.getToughnessLevel());
		
		return questionWithMetadata;
	}
	
	/**
	 * converts object to JSON
	 * @param object
	 * @return
	 * @throws JsonGenerationException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	private String objectToJSON(Object object) throws JsonGenerationException, JsonMappingException, IOException{
		return mapper.writeValueAsString(object);
	}

	/**
	 * gets file instance
	 * @param fileId
	 * @return
	 */
	public File getQuestionFile(Long fileId,String language) {
		File questionFile = new File(questionDir, "Question_"+fileId+"_"+language.toLowerCase()+".json");
		System.out.println(questionFile.getAbsolutePath());
		
		return questionFile;
	}
}
