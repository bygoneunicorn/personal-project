insert into students(user_id, first_name, last_name, birthday, grade, history, gender)
values($1, $2, $3, $4, $5, $6, $7)
returning *;