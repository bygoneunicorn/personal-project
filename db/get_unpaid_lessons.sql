select lesson_id, time_of_lesson, date_of_lesson, first_name, last_name, price 
from lessons
join students 
on lessons.student_id = students.student_id
where paid = false
and user_id = $1;