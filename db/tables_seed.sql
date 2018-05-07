create table users(
    user_id serial primary key,
    display_name text,
    img text,
    auth_id text,
    email text
);

create table students(
    student_id serial primary key,
    user_id integer references users.user_id,
    first_name varchar(40),
    last_name varchar(40),
    birthday varchar(60),
    history varchar(300),
    gender integer
);
insert into students(user_id, first_name, last_name, birthday, history, gender)
values (1, 'Billy', 'Bob Jr', '05-14-1999', 'Used to play violin with grandparents', 2);

create table lessons(
    lesson_id serial primary key,
    student_id integer references students.student_id,
    date_of_lesson varchar(60),
    time_of_lesson varchar(60),
    price decimal(8,2),
    group_lesson boolean
);
insert into lessons(student_id, date_of_lesson, time_of_lesson, price, group_lesson)
values(1, '12-12-2020', '1:00PM', 35.00, false);

create table payments(
    payment_id serial primary key,
    lesson_id integer references lessons.lesson_id,
    amount decimal(8,2),
    paid boolean default false
);

insert into payments(lesson_id, amount)
values (1, 35.00);

select * from users
join students on users.user_id = students.user_id
join lessons on students.student_id = lessons.student_id
join payments on lessons.lesson_id = payments.lesson_id;
