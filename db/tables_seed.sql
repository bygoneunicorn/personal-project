create table users(
    user_id serial primary key,
    display_name text,
    img text,
    auth_id text,
    email text
);

create table students(
    student_id serial primary key,
    user_id references users.user_id,
    first_name varchar(40)
    last_name varchar(40)
    birthday varchar(60)
    grade varchar(20)
    history varchar(300)
    gender varchar(20)
);

create table lessons(
    lesson_id serial primary key,
    student_id references students.student_id,
    date_of_lesson varchar(60)
    time_of_lesson varchar(60)
    price decimal(8,2)
    group_lesson boolean
);

create table payments(
    payment_id serial primary key,
    lesson_id references lessons.lesson_id
    amount decimal(8,2)
);
