update lessons
set paid = 'paid'
from students
where students.user_id = $1
and paid = 'pending';

select lesson_id, date_of_lesson, first_name, last_name, price, paid 
from lessons
join students 
on lessons.student_id = students.student_id
where user_id = $1;