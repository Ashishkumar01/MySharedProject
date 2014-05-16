package com.edu.pojo;

import javax.jdo.annotations.Extension;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

public class SimulatorBean {

	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	@Extension(vendorName="datanucleus", key="gae.pk-id", value="true")
	protected Long key;

	public Long getKey() {
		return key;
	}

	public void setKey(Long key) {
		this.key = key;
	}

}
