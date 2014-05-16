package com.edu.pojo;

import java.util.ArrayList;
import java.util.List;

public class TableRow {
	private List<Object> listData;
	public List<Object> getData() {
		return listData;
	}

	public void addData(List<Object> listData) {
		this.listData.addAll(listData);
	}

	public void setData(List<Object> listData) {
		this.listData.clear();
		this.listData.addAll(listData);
	}

	public void addData(Object data) {
		this.listData.add(data);
	}

	public TableRow() {
		listData = new ArrayList<Object>();
	}

	public static TableRow getTableRow() {
		// TODO Auto-generated method stub
		return new TableRow();
	}
}
