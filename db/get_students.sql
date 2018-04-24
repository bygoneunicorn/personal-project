select student_id, first_name, last_name, birthday, grade, history, gender from students
join users on users.user_id = students.user_id
where users.user_id = $1;