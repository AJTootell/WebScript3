create database if not exists template;

create table if not exists template.users (
  user_username varchar(20) not null primary key,
  user_password varchar(20)
);

create table if not exists template.layout (
  lay_id int not null auto_increment primary key,
  lay_imageBack boolean not null,
  lay_imageSrc varchar(50),
  lay_widget int not null
);

create table if not exists template.widget (
  wid_id int not null auto_increment primary key,
  wid_name varchar(15) not null,
  wid_description varchar(150)
);

create table if not exists template.layoutWidget (
  lay_wid_id int not null,
  wid_lay_id int not null,
  FOREIGN KEY fk_lay(lay_wid_id)
  REFERENCES layout(lay_id),
  FOREIGN KEY fk_wid(wid_lay_id)
  REFERENCES widget(wid_id)
);
