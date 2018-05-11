update lessons
set paid = 'unpaid'
where lesson_id = $1;

select lesson_id, date_of_lesson, first_name, last_name, price, paid 
from lessons
join students 
on lessons.student_id = students.student_id
where user_id = $2;