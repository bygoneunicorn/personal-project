select lesson_id, lessons.student_id as student_id, date_of_lesson, first_name, last_name 
from lessons
join students 
on lessons.student_id = students.student_id
where paid = "paid"
and user_id = $1
order by date_of_lesson::date;