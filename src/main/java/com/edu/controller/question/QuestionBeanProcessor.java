package com.edu.controller.question;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.stereotype.Component;

import com.edu.pojo.Option;
import com.edu.pojo.Question;
import com.edu.pojo.QuestionDocument;
import com.edu.pojo.Questions;
import com.edu.pojo.Table;
import com.edu.pojo.TableRow;
import com.edu.util.Validation;


@Component
public class QuestionBeanProcessor {

	public List<QuestionDocument> getQuestionListFromExcel(File file)
			throws Exception {
		return getQuestionListFromExcel(new FileInputStream(file));
	}
	public List<QuestionDocument> getQuestionListFromExcel(File file, String metaDataSheet)
			throws Exception {
		return getQuestionListFromExcel(new FileInputStream(file),metaDataSheet);
	}
	public List<QuestionDocument> getQuestionListFromExcel(InputStream file)
			throws Exception {
		return getQuestionListFromExcel(file, "Question_Bank");
	}

	public List<QuestionDocument> getQuestionListFromExcel(
			InputStream inputStream, String metaDataSheet) throws Exception {

		List<QuestionDocument> questionList = new LinkedList<QuestionDocument>();
		QuestionDocument questionDocument = null;
		int rowIndex=0;
		Workbook workbook;
		try {
			String passageQuestionSheet = null;
			List<String> questionData=null;
			List<Questions> questions=null;
			workbook = WorkbookFactory.create(inputStream);
			Sheet meataDatasheet = workbook.getSheet(metaDataSheet);
			Iterator<Row> itrMetaDataRow = meataDatasheet.rowIterator();

			while (itrMetaDataRow.hasNext()) {
				Row metaDataRow = itrMetaDataRow.next();
				//Since first row is header, so skip it.
				if(rowIndex==0){
					rowIndex++;
					continue;
				}
				
				//terminate the processing if empty row is encountered
				if(isBlankRow(metaDataRow,0,2)){
					break;
				}
				questionDocument = QuestionDocument.newBeanInstance();
				passageQuestionSheet = "NA";	
				questionData = new LinkedList<String>();
				questions = new LinkedList<Questions>();				
				Iterator<Cell> itrMetaDataCell = metaDataRow.cellIterator();
				int index = 0;

				while (itrMetaDataCell.hasNext()) {
					String cellValue = getCellValue(itrMetaDataCell.next());
					//columns before questions
					switch(index){
						case 0:
							questionDocument.setSubject(cellValue);							
							break;
						case 1:
							questionDocument.setSubjectCategory(cellValue);
							break;
						case 2:
							questionDocument.setMetaData(cellValue);
							break;
						case 3:
							questionDocument.setQuestionType(cellValue);							
							break;
						case 4:
							questionDocument.setQuestionSubType(cellValue);							
							break;
						case 5:
							questionDocument.setQuestionCategory(cellValue);
							break;
						case 6:
							questionDocument.setOptionType(cellValue);
							break;
							
						case 7:
							questionDocument.setIsPassage(cellValue);
							break;
						case 8:
							questionDocument.setPassageSheetName(cellValue);
							passageQuestionSheet = cellValue;
							break;
						case 9:
							questionDocument.setPassage(cellValue);
							break;
						case 10:
							questionDocument.setIsGraph(cellValue);							
							break;
						case 11:
							questionDocument.setPassageQuestionCount(cellValue);
							break;
						case 12:
							questionDocument.setHasImage(cellValue);
							break;
							
						case 13:
							questionDocument.setImagePath(cellValue);
							break;
						case 14:
							questionDocument.setToughnessLevel(cellValue);
							break;
						case 15:
							questionDocument.setTimeAllowed(cellValue);							
							break;
						case 16:
							questionDocument.setLanguageSupported(cellValue);							
							break;
						
						default:
							if(Validation.isNullOrEmpty(passageQuestionSheet)){
								questionData.add(cellValue);
							}
					}
					index++;
				}
				
				if (!Validation.isNullOrEmpty(passageQuestionSheet)) {
					Sheet questionsheet = workbook.getSheet(passageQuestionSheet);
					Iterator<Row> itrRow = questionsheet.rowIterator();
					int counter=0;
					while (itrRow.hasNext()) {
						Row row = itrRow.next();
						//skip header row
						if(counter==0){
							counter++;
							continue;
						}
						//terminate the processing if empty row is encountered
						if(isBlankRow(row,0,1)){
							break;
						}
						questionData = new LinkedList<String>();
						Iterator<Cell> itrCell = row.cellIterator();
						while (itrCell.hasNext()) {
							Cell cell = itrCell.next();
							questionData.add(getCellValue(cell));

						}
						questions.add(createQuestions(questionData));
					}					
				}else{
					questions.add(createQuestions(questionData));
				}
				
				questionDocument.setQuestions(questions);
				
				questionList.add(questionDocument);
			}
			
		} catch (Exception e) {
			throw e;
		}
		return questionList;

	}

	private String getCellValue(Cell cell) {
		String returnVal;
		if (cell.getCellType() == Cell.CELL_TYPE_BLANK) {
			returnVal = "";
		} else if (cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
			returnVal = String.valueOf(cell.getNumericCellValue());
		} else if (cell.getCellType() == Cell.CELL_TYPE_BOOLEAN) {
			returnVal = String.valueOf(cell.getBooleanCellValue());
		} else if (cell.getCellType() == Cell.CELL_TYPE_STRING) {
			returnVal = cell.getStringCellValue();
		} else {
			returnVal = cell.getStringCellValue();
		}
		
		if(returnVal!=null){
			returnVal=returnVal.trim();
		}else{
			returnVal="";
		}
		return returnVal;
	}
	
	//checks mandatory columns. If any of them is empty, skip that row.
	private boolean isBlankRow(Row row, int fcell, int lcell) 
	{
	    boolean flag = false;
	    for (int i = fcell; i < lcell; i++) {
		    if (row.getCell(i) == null || "".equals(String.valueOf(row.getCell(i))) || String.valueOf(row.getCell(i)).length() == 0) 
		    {
		    	flag = true;
		    } 	    
	    }
	    
	    return flag;
	}

	public List<QuestionDocument> getQuestionListFromJExcel(File file,
			String metaDataSheetName) throws Exception {

		List<QuestionDocument> questionList = new LinkedList<QuestionDocument>();

		jxl.Workbook workbook;
		try {
			workbook = jxl.Workbook.getWorkbook(file);

			jxl.Sheet metaDatasheet = workbook.getSheet(metaDataSheetName);
			int rows = metaDatasheet.getRows();

			for (int rowIndex = 0; rowIndex < rows; rowIndex++) {
				String questionSheetName = null;

				jxl.Cell[] metaDataCells = metaDatasheet.getRow(rowIndex);
				if (metaDataCells.length > 0) {
					List<String> metaData = new LinkedList<String>();
					questionSheetName = metaDataCells[0].getContents();

					for (int cellIndex = 3; cellIndex < metaDataCells.length; cellIndex++) {
						metaData.add(metaDataCells[cellIndex].getContents());
					}

					if (!Validation.isNullOrEmpty(questionSheetName)) {
						jxl.Sheet questionsheet = workbook
								.getSheet(questionSheetName);
						int questionRows = questionsheet.getRows();

						List<Question> questions = new LinkedList<Question>();
						for (int questionRowIndex = 0; questionRowIndex < questionRows; questionRowIndex++) {

							List<String> questionData = new LinkedList<String>();
							jxl.Cell[] questionCells = questionsheet
									.getRow(questionRowIndex);
							for (jxl.Cell cell : questionCells) {
								questionData.add(cell.getContents());
							}
							if (!Validation.isNullOrEmpty(questionData.get(0))) {
								questions.add(createQuestion(questionData));
							}
						}

						/*questionList.add(createQuestionElement(metaData,
								questions,direction,questionSheetName,isGrouped));*/
					}

				}

			}
		} catch (Exception e) {
			throw e;
		}
		return questionList;

	}
	
	/**
	 * creates question list considering different languages
	 */
	private Questions createQuestions(List<String> question) {
		Questions questions = new Questions();
		List<Question> questionList=new ArrayList<Question>();
		List<String> rawQuestionList=new ArrayList<String>();

		if (question.size() > 0) {
			for(String rawQuestion:question){
				if(rawQuestion.equalsIgnoreCase("<EOQ>")){
					questionList.add(createQuestion(rawQuestionList));
					rawQuestionList=new ArrayList<String>();
				}else{
					rawQuestionList.add(rawQuestion);
				}
			}			
		}
		questions.setQuestions(questionList);
		return questions;
	}

	/**
	 * creates question
	 */
	private Question createQuestion(List<String> question) {
		Question questionType = Question.newBeanInstance();

		if (question.size() > 0) {
			Iterator<String> itrCell = question.iterator();

			questionType.setLanguage(itrCell.next());
			questionType.setQuestionStatement(itrCell.next());
			List<Option> optionList = new LinkedList<Option>();
			while (itrCell.hasNext()) {
				optionList.add(new Option(itrCell.next(), Option.CORRECT
						.equals(itrCell.next())));
			}

			questionType.setOptions(optionList);
		}
		return questionType;
	}

	public Table getDataFromFile(File file, String metaDataSheet)
			throws Exception {
		Table table = Table.getTable();
		try {
			Workbook workbook = new HSSFWorkbook(new FileInputStream(file));
			Sheet sheet = workbook.getSheet(metaDataSheet);
			Iterator<Row> itrRow = sheet.rowIterator();
			String questionSheet = null;
			while (itrRow.hasNext()) {
				Row row = itrRow.next();
				TableRow tableRow = TableRow.getTableRow();
				Iterator<Cell> itrCell = row.cellIterator();
				boolean firstColumn = true;
				while (itrCell.hasNext()) {
					if (!firstColumn) {
						tableRow.addData(questionSheet);
					} else {
						firstColumn = false;
					}
					questionSheet = getCellValue(itrCell.next());
				}

				table.setHeaderRows(tableRow);
				break;
			}
			if (!Validation.isNullOrEmpty(questionSheet)) {
				sheet = workbook.getSheet(questionSheet);
				itrRow = sheet.rowIterator();

				while (itrRow.hasNext()) {
					Row row = itrRow.next();
					TableRow tableRow = TableRow.getTableRow();
					Iterator<Cell> itrCell = row.cellIterator();
					while (itrCell.hasNext()) {
						tableRow.addData(itrCell.next()
								.getRichStringCellValue());
					}
					table.addRow(tableRow);
				}
			}
		} catch (IOException e) {
			throw new Exception("Invalid file");
		}
		return table;
	}
}
