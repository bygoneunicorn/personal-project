update lessons
set date_of_lesson = $1,
    price = $2
where lesson_id = $3;