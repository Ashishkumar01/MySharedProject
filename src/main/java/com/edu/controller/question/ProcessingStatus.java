package com.edu.controller.question;
/**
 * 
 * @author Udit
 * @description This will have different status used any where
 */
public enum ProcessingStatus {

	SUCCESS("SUCCESS"), FAILURE("FAILURE"), RED("RED"), GREEN("GREEN");

	String value;

	private ProcessingStatus(String value) {
		this.value = value;
	}

	public String toString() {
		return this.value;
	}
}
