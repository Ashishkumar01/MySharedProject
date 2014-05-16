package com.edu.controller.question;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.edu.pojo.QuestionDocList;
import com.edu.pojo.QuestionDocument;


@Controller
@RequestMapping("upload")
public class FileUploadController{

	@Autowired
	QuestionBeanProcessor questionProcessor;

	@RequestMapping(method = RequestMethod.POST, value = { "uploadFile.do" },produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody QuestionDocList uploadFile(HttpServletRequest request) {

		try {
			ServletFileUpload upload = new ServletFileUpload();

			FileItemIterator fileItemIterator = upload.getItemIterator(request);
			while (fileItemIterator.hasNext()) {
				FileItemStream item = fileItemIterator.next();
				if (item.isFormField()) {
				} else {
					QuestionDocList document = QuestionDocList
							.getQuestionDocumentList(questionProcessor
									.getQuestionListFromExcel(item.openStream()));
					return document;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		
		return null;
	}
	
	@RequestMapping(method = RequestMethod.POST, value = { "saveQuestions.do" },produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody QuestionDocList saveQuestions(QuestionDocument[] request) {

		

		return null;
	}
}
