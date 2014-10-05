package com.edu.util;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;


public class SystemPropertyUtil
{
	 public String getPropValues(String name) throws IOException 
	 {
	        Properties prop = new Properties();
	        String propFileName = "configuration.properties";
	 
	        InputStream inputStream = getClass().getClassLoader().getResourceAsStream(propFileName);
	        prop.load(inputStream);
	        if (inputStream == null) 
	        {
	            throw new FileNotFoundException("property file '" + propFileName + "' not found in the classpath");
	        }
	 
	        return prop.getProperty(name);
	    }
	
}
