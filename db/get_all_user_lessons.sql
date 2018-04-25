select first_name, last_name, lesson_id, date_of_lesson, time_of_lesson, price, group_lesson from users
join students on users.user_id = students.user_id
join lessons on students.student_id = lessons.lesson_id
where users.user_id = $1