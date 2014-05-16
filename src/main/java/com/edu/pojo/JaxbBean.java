package com.edu.pojo;

import java.io.File;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

public final class JaxbBean {

	public static void save(Object object,File destination) throws Exception {
		JAXBContext jaxbContext = JAXBContext.newInstance(object.getClass());
		Marshaller jaxbMarshaller = jaxbContext.createMarshaller();

		// output pretty printed
		jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

		jaxbMarshaller.marshal(object, destination);
	}

	public static Object load(File source,Class<?> sourceClass) throws Exception {
		JAXBContext jaxbContext = JAXBContext.newInstance(sourceClass);
		Unmarshaller jaxbUnMarshaller = jaxbContext.createUnmarshaller();

		return jaxbUnMarshaller.unmarshal(source);
	}
}
