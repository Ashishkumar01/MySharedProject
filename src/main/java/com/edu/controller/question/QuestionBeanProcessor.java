package com.edu.controller.question;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
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
		return getQuestionListFromExcel(file, "MetaData");
	}

	public List<QuestionDocument> getQuestionListFromExcel(
			InputStream inputStream, String metaDataSheet) throws Exception {

		List<QuestionDocument> questionList = new LinkedList<QuestionDocument>();

		Workbook workbook;
		try {
			workbook = WorkbookFactory.create(inputStream);

			Sheet meataDatasheet = workbook.getSheet(metaDataSheet);
			Iterator<Row> itrMetaDataRow = meataDatasheet.rowIterator();

			List<String> metaDataArray = null;
			while (itrMetaDataRow.hasNext()) {
				String questionSheet = null;
				Row metaDataRow = itrMetaDataRow.next();
				List<String> metaData = new LinkedList<String>();
				Iterator<Cell> itrMetaDataCell = metaDataRow.cellIterator();
				int index = 0;
				boolean isGrouped = false;
				String direction=null;
				while (itrMetaDataCell.hasNext()) {
					String cellValue = getCellValue(itrMetaDataCell.next());
					switch(index){
						case 0:
							questionSheet = cellValue;
							index++;
							break;
						case 1:
							isGrouped = "GROUPED".equals(cellValue);
							index++;
							break;
						case 2:
							index++;
							direction = cellValue;
							break;
						default:
							metaData.add(cellValue);
					}
				}
				metaDataArray = metaData;
				if (!Validation.isNullOrEmpty(questionSheet)) {
					Sheet questionsheet = workbook.getSheet(questionSheet);
					Iterator<Row> itrRow = questionsheet.rowIterator();
					List<Question> questions = new LinkedList<Question>();
					while (itrRow.hasNext()) {
						Row row = itrRow.next();
						List<String> questionData = new LinkedList<String>();
						Iterator<Cell> itrCell = row.cellIterator();
						while (itrCell.hasNext()) {
							Cell cell = itrCell.next();
							questionData.add(getCellValue(cell));

						}
						questions.add(createQuestion(questionData));
					}

					questionList.add(createQuestionElement(metaDataArray,
							questions,direction,questionSheet,isGrouped));
				}
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
		return returnVal;
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
				String direction = null;
				boolean isGrouped = false;
				jxl.Cell[] metaDataCells = metaDatasheet.getRow(rowIndex);
				if (metaDataCells.length > 0) {
					List<String> metaData = new LinkedList<String>();
					questionSheetName = metaDataCells[0].getContents();
					isGrouped = "GROUPED".equals(metaDataCells[1].getContents());
					direction = metaDataCells[2].getContents();
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

						questionList.add(createQuestionElement(metaData,
								questions,direction,questionSheetName,isGrouped));
					}

				}

			}
		} catch (Exception e) {
			throw e;
		}
		return questionList;

	}

	

	

	private QuestionDocument createQuestionElement(List<String> metaDataArray,
			List<Question> questionArray,String direction,String sheetName,boolean isGrouped) {
		QuestionDocument questionDocument = QuestionDocument.newBeanInstance();
		questionDocument.setMetaData(metaDataArray);
		questionDocument.setQuestions(questionArray);
		questionDocument.setSheetName(sheetName);
		questionDocument.setGrouped(isGrouped);
		questionDocument.setDirections(direction);
		return questionDocument;
	}

	private Question createQuestion(List<String> question) {
		Question questionType = Question.newBeanInstance();

		if (question.size() > 0) {
			Iterator<String> itrCell = question.iterator();

			questionType.setQuestion(itrCell.next());
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
