create database college;
use college;

CREATE TABLE schools (school_id INT, school_name VARCHAR(255)); 
Insert into schools values (1, 'School of Engineering'), (2, 'School of Business'), (3, 'School of Arts');
Insert into schools values (4, 'School of Medicine'), (5, 'School of Law'), (6, 'School of Education');


CREATE TABLE students (student_id INT, school_id INT); 
Insert into students values (1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6);

CREATE TABLE courses (course_id INT, course_name VARCHAR(255), completion_date DATE); 
insert into courses values (1, 'Math 101', '2021-01-01'), (2, 'Math 102', '2021-01-01'), (3, 'Math 103', '2021-01-01'), (4, 'Math 104', '2021-01-01'), (5, 'Math 105', '2021-01-01'), (6, 'Math 106', '2021-01-01');
insert into courses values (7, 'Science 101', '2021-01-01'), (8, 'Science 102', '2021-01-01'), (9, 'Science 103', '2021-01-01'), (10, 'Science 104', '2021-01-01'), (11, 'Science 105', '2021-01-01'), (12, 'Science 106', '2021-01-01');

CREATE TABLE student_courses (student_id INT, course_id INT);
insert into student_courses values (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6);