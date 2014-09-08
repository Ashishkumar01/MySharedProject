package com.edu.util;
import java.io.File;
import java.io.FileInputStream;
import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


public class SystemPropertyUtil
{
	private static Log logger = LogFactory.getLog(SystemPropertyUtil.class);
	

	private static final String	PROPERTY_USER_HOME	= "user.home";
	private static final String PROPERTY_FILE_SEPARATOR = "file.separator"; 
	private static final String PROPERTY_OS_NAME = "os.name";
	
	private static final String	WINDOWS_FILE_SEPARATOR	= "\\";
	private static final String OS_NAME_WINDOWS = "windows";

	public static final String PROPERTY_CONF_QUESTION = "question.dir.path";


	private static final boolean windows;
	static
	{
		String os = System.getProperty(PROPERTY_OS_NAME);
		windows = os.toLowerCase().contains(OS_NAME_WINDOWS);
	}
	
	public static String getFileSeparator()
	{
		return System.getProperty(PROPERTY_FILE_SEPARATOR);
	}
	
	public static String getUserHome()
	{
		String userHome = "c:";
		if (!getFileSeparator().equals(WINDOWS_FILE_SEPARATOR))
		{
			userHome = System.getProperty(PROPERTY_USER_HOME);
		}
		return userHome;
	}
	
	public static boolean isWindows()
	{
		return windows;
	}
	
	public static String getQuestionPropertiesFilePath()
	{
		String defaultPath = System.getProperty("user.dir");
		System.out.println("defaultPath : "+ defaultPath);
		return getPropertyValue(PROPERTY_CONF_QUESTION, String.format("%s/conf/configuration.properties", defaultPath));
	}
	
	private static String getPropertyValue(String name, String defaultValue)
	{
        logger.debug(String.format("Reading the property %1$s from the system properties", name));
		String value = System.getProperty(name, defaultValue);
        logger.debug(String.format("Property %1$s, Value: %2$s", name, value));
		return value;
	}
	
	public static String readProperty(String name) throws Exception 
	{
		FileInputStream fis = null;
		try
		{
			File file = new File(getQuestionPropertiesFilePath());
			if (!file.exists())
				throw new Exception("configuration.properties file doesn't exist in the conf directory");
			
			fis = new FileInputStream(file);
			Properties props = new Properties();
			props.load(fis);
			return props.getProperty(name);
		}
		catch (Exception e)
		{
			logger.error("readProperty() failed, message: " + e.getMessage(), e);
			throw new Exception("readProperty() failed, message: " + e.getMessage());
		}
		finally
		{
			if (fis != null) 
				fis.close();
		}
	}
}
