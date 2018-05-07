select lesson_id, lessons.student_id as student_id, time_of_lesson, date_of_lesson, first_name, last_name 
from lessons
join students 
on lessons.student_id = students.student_id
where paid = true
and user_id = 1;