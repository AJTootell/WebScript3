create database if not exists template;

drop table if exists template.layoutWidget;
drop table if exists template.layout;
drop table if exists template.widget;
drop table if exists template.user;
drop table if exists template.users;

create table if not exists template.user (
  user_username varchar(20) not null primary key,
  user_password varchar(20)
);

create table if not exists template.layout (
  lay_id int not null auto_increment primary key,
  lay_name varchar(30),
  lay_imageBack boolean not null,
  lay_imageOrHex varchar(30),
  lay_user varchar(20) not null,
  FOREIGN KEY fk_user(lay_user)
  REFERENCES user(user_username)
);

create table if not exists template.widget (
  wid_id int not null auto_increment primary key,
  wid_name varchar(15) not null,
  wid_description varchar(150)
);

create table if not exists template.layoutWidget (
  lay_id int not null,
  wid_id int not null,
  laywid_x int,
  laywid_y int,
  FOREIGN KEY fk_lay(lay_id)
  REFERENCES layout(lay_id),
  FOREIGN KEY fk_wid(wid_id)
  REFERENCES widget(wid_id)
);

insert into user(user_username,user_password) values ("AJTootell","wibble");
insert into widget(wid_name, wid_description) values ("weather", "Get the next weeks forecast of weather");
insert into layout(lay_name, lay_imageBack, lay_imageOrHex, lay_user) values ("Testing", false, "#aa00aa", "AJTootell");
insert into layoutWidget(lay_id,wid_id,laywid_x,laywid_y) values (1,1,50,50);
