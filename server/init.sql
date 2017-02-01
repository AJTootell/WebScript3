create database if not exists template;

create table if not exists template.users (
  username varchar(20) primary key,
  password varchar(20)
);

create table if not exists template.layout (
  id int primary key,
  imageBack boolean,
  imageSrc varchar(50),
  widget int foriegn key
);

create table if not exists template.widget (
  id int primary key,
  name varchar(15),
  description varchar(150)
);

create table if not exists template.layoutWidget (
  layoutID int foriegn key,
  widgetID int foriegn key
);
