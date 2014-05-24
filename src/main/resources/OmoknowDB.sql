-- drop table preference;
DROP TABLE IF EXISTS question_type;
Create table question_type
(
		id bigint auto_increment , 
		question_type varchar(255) primary key, 
		description varchar(255)
);

DROP TABLE IF EXISTS question_category;
Create table question_category
(
		id bigint auto_increment , 
		category varchar(255) primary key, 
		description varchar(255)
);

DROP TABLE IF EXISTS question_subject;
Create table question_subject
(
		id bigint auto_increment , 
		subject varchar(255) primary key, 
		description varchar(255)
);

DROP TABLE IF EXISTS question_bank;
Create table question_bank
(
		id bigint auto_increment primary key,
		questionSubject varchar(255),
		questionType varchar(255),
		questionCategory varchar(255) , 
		numbersOfQuestions int,
		toughnessLavel int,
		timeToSolve int,
		questionUri varchar(1024),
		foreign key(questionSubject) references question_subject(subject),
		foreign key(questionType) references question_type(question_type),
		foreign key(questionCategory) references question_category(category)
);


insert into question_type values (1,'TIME_WORK','Time and work');
insert into question_type values (2,'MENSURATION','Mensuration');
insert into question_type values (3,'DATA_ANALYSSIS','Data Analyssis');
insert into question_type values ('HISTORY','Data Analyssis');

insert into question_category values (1,'SUB','Subjective');
insert into question_category values (2,'OBJ','Objective');
insert into question_category values (3,'PASS','Passage');
insert into question_category values (4,'FIB','Fill in the blanks');

insert into question_subject values (1,'QUANTITATIVE_APTITUDE','Quantitative Aptitude');
insert into question_subject values (2,'GENERAL_AWARENESS','GK');
insert into question_subject values (3,'ENGLISH_LANGUAGE','English');
insert into question_subject values (4,'REASONING','Reasoning');


