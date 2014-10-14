package com.omoknow.portal.pojo;

import java.util.ArrayList;
import java.util.List;

public class Table {

	private TableRow headerRow;

	private int maxColumn;

	public int getMaxColumn() {
		return maxColumn;
	}
	public TableRow getHeaderRow() {
		return headerRow;
	}
	private void setMaxColumn(int currentRowColumn){
		if(this.maxColumn < currentRowColumn){
			this.maxColumn = currentRowColumn;
		}
	}
	public void setHeaderRows(TableRow headerRow) {
		this.maxColumn = headerRow.getData().size();
		this.headerRow = headerRow;
	}

	private List<TableRow> dataRows;

	public List<TableRow> getRows() {
		return dataRows;
	}

	public void setRows(List<TableRow> listRows) {
		this.dataRows.clear();
		this.dataRows.addAll(listRows);
	}

	public void addRows(List<TableRow> listRows) {
		this.dataRows.addAll(listRows);
	}

	public void addRow(TableRow rows) {
		setMaxColumn(rows.getData().size());
		this.dataRows.add(rows);
	}

	public Table() {
		dataRows = new ArrayList<TableRow>();
		maxColumn = 0;
	}
	public static Table getTable() {
		// TODO Auto-generated method stub
		return new Table();
	}
}
