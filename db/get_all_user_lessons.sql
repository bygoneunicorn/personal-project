select first_name, last_name, lesson_id, date_of_lesson, price, group_lesson from lessons
join students on lessons.student_id = students.student_id
join users on users.user_id = students.user_id
where users.user_id = $1
order by date_of_lesson::date;