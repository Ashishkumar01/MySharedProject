package com.omoknow.controller.question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.ModelAndView;


public abstract class CommonController {

	@Value("${project.server.appengine}")
	protected String isAppEngine;
	
	@Value("${project.upload.dir}")
	protected String uploadDirectory;


	@Value("${project.question.dir}")
	protected String questionDirectory;

	@Autowired
	protected ControllerUtil controllerUtil;

	protected void addSuccessMessage(ModelAndView mv, String messageCode,
			Object[] parameters) {
		addMessage(ProcessingStatus.SUCCESS, mv, messageCode, parameters);
	}

	protected void addFailureMessage(ModelAndView mv, String messageCode,
			Object[] parameters) {
		addMessage(ProcessingStatus.FAILURE, mv, messageCode, parameters);
	}

	protected void addMessage(ProcessingStatus status, ModelAndView mv,
			String messageCode, Object[] parameters) {
		mv.addObject("messageType", status.toString());
		mv.addObject("message", messageCode);
		if (parameters != null) {
			StringBuilder parameter = new StringBuilder();
			for (Object object : parameters) {
				parameter.append(object + ",");
			}
			mv.addObject("message_arg", parameter.toString());
		}

	}

	protected ModelAndView getModelAndView(String viewName) {
		ModelAndView mv = controllerUtil.getModelView();
		mv.setViewName(viewName);

		mv.addObject("viewName", viewName);
		return mv;
	}
}
