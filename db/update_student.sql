update students
set first_name = $2,
    last_name = $3,
    birthday = $4,
    history = $5,
    gender = $6
where student_id = $1
returning *;