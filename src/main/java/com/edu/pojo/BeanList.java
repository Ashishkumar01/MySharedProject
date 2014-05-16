package com.edu.pojo;

import java.util.ArrayList;
import java.util.List;

public class BeanList<T> {

	private List<T> bean;

	public BeanList() {
		bean = new ArrayList<T>();
	}
	

	public List<T> getBean() {
		return bean;
	}

	public void setBean(List<T> object) {
		this.bean = object;
	}

	public static <E> BeanList<E> getBeanList(List<E> object) {
		BeanList<E> bean = new BeanList<E>();
		bean.setBean(object);
		return bean;
	}
}
