package com.edu.controller.question;

import java.io.File;
import java.io.IOException;
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

import com.edu.db.repository.QuestionBankRepository;
import com.edu.pojo.QuestionDocument;


@Controller
@RequestMapping("upload")
public class FileUploadController{

	@Autowired
	QuestionBeanProcessor questionProcessor;

	@Autowired
	ObjectMapper mapper;
	
	@Autowired
	QuestionBankRepository bankRepo;
	
	private File questionDir;
	int dirFileCount = 0;
	
	public FileUploadController(){
		questionDir = FileUtils.getFile("../../questiondir");
		
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
		QuestionDocument savedQuestionDocument;
		for (QuestionDocument questionDocument : request) {
			savedQuestionDocument=bankRepo.save(questionDocument);
			FileUtils.writeByteArrayToFile(getQuestionFile(savedQuestionDocument.getId()), objectToJSON(questionDocument).getBytes());
			count++;
		}
		return count;
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
	private File getQuestionFile(Long fileId) {
		File questionFile = new File(questionDir, "Question_"+fileId+".json");
		System.out.println(questionFile.getAbsolutePath());
		
		return questionFile;
	}
}
