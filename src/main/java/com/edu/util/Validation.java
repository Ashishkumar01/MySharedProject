package com.edu.util;

import java.util.Collection;
/**
 * 
 * @author udit
 * @description validation or custom function for common utilities
 */
public class Validation {

	/**
	 * 
	 * @param string
	 * @return true if string is null or empty
	 */
	public static boolean isNullOrEmpty(String string){
		return string==null || string.trim().equals("");
	}
	/**
	 * 
	 * @param collection
	 * @return true if collection is null or empty
	 */
	public static boolean isNullOrEmpty(Collection<?> collection){
		return collection==null || collection.isEmpty();
	}
}
