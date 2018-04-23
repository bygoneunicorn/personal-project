insert into users(display_name, img, auth_id, email)
values($1, $2, $3, $4)
returning *;