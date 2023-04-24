create table users (
    userId int4 unsigned primary key auto_increment,
    email varchar(64) not null unique,
    password varchar(64) not null,
    name varchar(64) not null,
    surname varchar(64) not null,
    phone varchar(20) not null,
    companyName varchar(64),
    image varchar(512),
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp,
    role ENUM('USER', 'ADMIN') default 'USER'
);

create table services (
    serviceId int4 unsigned primary key auto_increment,
    userId int4 unsigned not null,
    title varchar(32) not null,
    description varchar(800) not null,
    price varchar(16) not null,
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp,
    foreign key (userId) references users(userId)
);
create table workImages (
    workImagesId int4 unsigned primary key auto_increment,
    src varchar(512) not null,
    serviceId int4 unsigned not null,
    foreign key (serviceId) references services(serviceId)
);
create table message (
    messageId int4 unsigned primary key auto_increment,
    receiverId int4 unsigned not null,
    senderId int4 unsigned not null,
    deliveryDate date not null,
    text varchar(700) not null,
    seen int(1) default 0,
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp,
    foreign key(receiverId) references users(userId),
    foreign key(senderId) references users(userId)
);

create table userLiked (
    userId int4 unsigned not null,
    serviceId int4 unsigned not null,
    foreign key (userId) references users(userId),
    foreign key (serviceId) references services(serviceId)
);
