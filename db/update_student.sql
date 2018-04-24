update students
set first_name = $2,
    last_name = $3,
    birthday = $4,
    grade = $5,
    history = $6,
    gender = $7
where student_id = $1
returning *;