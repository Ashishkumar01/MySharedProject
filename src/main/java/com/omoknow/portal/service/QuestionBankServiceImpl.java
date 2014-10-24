package com.omoknow.portal.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.mysema.query.jpa.JPQLQuery;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.Predicate;
import com.mysema.query.types.expr.BooleanExpression;
import com.omoknow.portal.db.repository.QuestionBankRepository;
import com.omoknow.portal.pojo.QQuestionDocument;
import com.omoknow.portal.pojo.QuestionDocument;
import com.omoknow.portal.pojo.QuestionSearchParameters;

@Service
public class QuestionBankServiceImpl implements QuestionBankService {
	
	@Autowired
	QuestionBankRepository bankRepo;
	
	@PersistenceContext
	private EntityManager em;
	
	/**
	 * finds all questions
	 */
	public List<QuestionDocument> findAll(){
		return bankRepo.findAll();
	};
	
	/**
	 * Search questions based on any parameters provided
	 * @param searchParameters
	 * @return
	 */
	public List<QuestionDocument> findQuestions(QuestionSearchParameters searchParameters){
		QQuestionDocument questionDocument=QQuestionDocument.questionDocument;
		JPQLQuery query = new JPAQuery(em);
		query.from(questionDocument);
		
		List<BooleanExpression> expList=new ArrayList<BooleanExpression>();		
		if(!StringUtils.isEmpty(searchParameters.getSubject()) ){
			expList.add(questionDocument.subject.equalsIgnoreCase(searchParameters.getSubject()));
		}		
		if(!StringUtils.isEmpty(searchParameters.getSubjectCategory()) ){
			expList.add(questionDocument.subjectCategory.equalsIgnoreCase(searchParameters.getSubjectCategory()));
		}		
		if(!StringUtils.isEmpty(searchParameters.getMetaData()) ){
			expList.add(questionDocument.metaData.equalsIgnoreCase(searchParameters.getMetaData()));
		}
		
		return query.where(expList.toArray(new Predicate[0])).list(QQuestionDocument.questionDocument);		
	}


}
