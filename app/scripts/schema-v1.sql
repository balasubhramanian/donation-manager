# ************************************************************
# Donation App
# Version 1
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table account
# ------------------------------------------------------------

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_no` varchar(255) DEFAULT NULL,
  `balance` bigint(20) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` char(1) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;

INSERT INTO `account` (`id`, `account_no`, `balance`, `description`, `name`, `status`)
VALUES
	(1,NULL,0,NULL,'Cash Account','A');

/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table campaign
# ------------------------------------------------------------

DROP TABLE IF EXISTS `campaign`;

CREATE TABLE `campaign` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  `type_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmey1osnuq6knrrcija42xk3fp` (`type_id`),
  CONSTRAINT `FKmey1osnuq6knrrcija42xk3fp` FOREIGN KEY (`type_id`) REFERENCES `config` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table config
# ------------------------------------------------------------

DROP TABLE IF EXISTS `config`;

CREATE TABLE `config` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `module` varchar(255) DEFAULT NULL,
  `name` varchar(500) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  `value` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;

INSERT INTO `config` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `description`, `module`, `name`, `status`, `value`)
VALUES
	(12,'2018-04-28 10:20:25',1,NULL,NULL,NULL,'sms_donation_text','Thanks for donating ${amount}.\n','A',NULL),
	(14,'2018-05-13 10:01:43',1,NULL,NULL,'','notification','sms_enabled','A','1');

/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dim_month_year
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dim_month_year`;

CREATE TABLE `dim_month_year` (
  `month` varchar(2) DEFAULT NULL,
  `year` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `dim_month_year` WRITE;
/*!40000 ALTER TABLE `dim_month_year` DISABLE KEYS */;

INSERT INTO `dim_month_year` (`month`, `year`)
VALUES
	('01','2018'),
	('02','2018'),
	('03','2018'),
	('04','2018'),
	('05','2018'),
	('06','2018'),
	('07','2018'),
	('08','2018'),
	('09','2018'),
	('10','2018'),
	('11','2018'),
	('12','2018'),
	('01','2019'),
	('02','2019'),
	('03','2019'),
	('04','2019'),
	('05','2019'),
	('06','2019'),
	('07','2019'),
	('08','2019'),
	('09','2019'),
	('10','2019'),
	('11','2019'),
	('12','2019'),
	('01','2020'),
	('02','2020'),
	('03','2020'),
	('04','2020'),
	('05','2020'),
	('06','2020'),
	('07','2020'),
	('08','2020'),
	('09','2020'),
	('10','2020'),
	('11','2020'),
	('12','2020'),
	('01','2021'),
	('02','2021'),
	('03','2021'),
	('04','2021'),
	('05','2021'),
	('06','2021'),
	('07','2021'),
	('08','2021'),
	('09','2021'),
	('10','2021'),
	('11','2021'),
	('12','2021'),
	('01','2022'),
	('02','2022'),
	('03','2022'),
	('04','2022'),
	('05','2022'),
	('06','2022'),
	('07','2022'),
	('08','2022'),
	('09','2022'),
	('10','2022'),
	('11','2022'),
	('12','2022'),
	('01','2023'),
	('02','2023'),
	('03','2023'),
	('04','2023'),
	('05','2023'),
	('06','2023'),
	('07','2023'),
	('08','2023'),
	('09','2023'),
	('10','2023'),
	('11','2023'),
	('12','2023'),
	('01','2024'),
	('02','2024'),
	('03','2024'),
	('04','2024'),
	('05','2024'),
	('06','2024'),
	('07','2024'),
	('08','2024'),
	('09','2024'),
	('10','2024'),
	('11','2024'),
	('12','2024'),
	('01','2025'),
	('02','2025'),
	('03','2025'),
	('04','2025'),
	('05','2025'),
	('06','2025'),
	('07','2025'),
	('08','2025'),
	('09','2025'),
	('10','2025'),
	('11','2025'),
	('12','2025'),
	('01','2026'),
	('02','2026'),
	('03','2026'),
	('04','2026'),
	('05','2026'),
	('06','2026'),
	('07','2026'),
	('08','2026'),
	('09','2026'),
	('10','2026'),
	('11','2026'),
	('12','2026'),
	('01','2027'),
	('02','2027'),
	('03','2027'),
	('04','2027'),
	('05','2027'),
	('06','2027'),
	('07','2027'),
	('08','2027'),
	('09','2027'),
	('10','2027'),
	('11','2027'),
	('12','2027'),
	('01','2028'),
	('02','2028'),
	('03','2028'),
	('04','2028'),
	('05','2028'),
	('06','2028'),
	('07','2028'),
	('08','2028'),
	('09','2028'),
	('10','2028'),
	('11','2028'),
	('12','2028'),
	('01','2029'),
	('02','2029'),
	('03','2029'),
	('04','2029'),
	('05','2029'),
	('06','2029'),
	('07','2029'),
	('08','2029'),
	('09','2029'),
	('10','2029'),
	('11','2029'),
	('12','2029');

/*!40000 ALTER TABLE `dim_month_year` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table donation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `donation`;

CREATE TABLE `donation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `amount` bigint(20) NOT NULL,
  `date` date DEFAULT NULL,
  `account_id` bigint(20) DEFAULT NULL,
  `campaign_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqf83pxmnl0g7f0cowjnj241ps` (`account_id`),
  KEY `FKsxnno1gc78toq75tqbxv95igb` (`campaign_id`),
  KEY `FKb3tiv71blyfp9j2qid64mhqnc` (`user_id`),
  CONSTRAINT `FKb3tiv71blyfp9j2qid64mhqnc` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`id`),
  CONSTRAINT `FKqf83pxmnl0g7f0cowjnj241ps` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `FKsxnno1gc78toq75tqbxv95igb` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table permission
# ------------------------------------------------------------

DROP TABLE IF EXISTS `permission`;

CREATE TABLE `permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table role_permission
# ------------------------------------------------------------

DROP TABLE IF EXISTS `role_permission`;

CREATE TABLE `role_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `permssion_id` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt0ufqt6u7mq4o4wuvpkt48vgb` (`permssion_id`),
  KEY `FKa6jx8n8xkesmjmv6jqug6bg68` (`role_id`),
  CONSTRAINT `FKa6jx8n8xkesmjmv6jqug6bg68` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `FKt0ufqt6u7mq4o4wuvpkt48vgb` FOREIGN KEY (`permssion_id`) REFERENCES `permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table transaction
# ------------------------------------------------------------

DROP TABLE IF EXISTS `transaction`;

CREATE TABLE `transaction` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `amount` bigint(20) NOT NULL,
  `date` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `transaction_type` int(11) DEFAULT NULL,
  `transfer_id` bigint(20) NOT NULL,
  `account_id` bigint(20) DEFAULT NULL,
  `type_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6g20fcr3bhr6bihgy24rq1r1b` (`account_id`),
  KEY `FKp7otfogx4pfgdb13rm6rwel12` (`type_id`),
  CONSTRAINT `FK6g20fcr3bhr6bihgy24rq1r1b` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `FKp7otfogx4pfgdb13rm6rwel12` FOREIGN KEY (`type_id`) REFERENCES `config` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table user_details
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_details`;

CREATE TABLE `user_details` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `doorno` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `user_login_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjx4oa7h2o2rbiperg3x4uipbp` (`user_login_id`),
  CONSTRAINT `FKjx4oa7h2o2rbiperg3x4uipbp` FOREIGN KEY (`user_login_id`) REFERENCES `user_login` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `user_details` WRITE;
/*!40000 ALTER TABLE `user_details` DISABLE KEYS */;

INSERT INTO `user_details` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `area`, `city`, `country`, `doorno`, `email`, `firstname`, `lastname`, `phone`, `state`, `street`, `user_login_id`)
VALUES
	(1,'2018-03-28 23:21:24',1,NULL,NULL,'system','system','system','4','balasubhramanian@gmail.com','Admin','','','system','system',1);

/*!40000 ALTER TABLE `user_details` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_login
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_login`;

CREATE TABLE `user_login` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `user_login` WRITE;
/*!40000 ALTER TABLE `user_login` DISABLE KEYS */;

INSERT INTO `user_login` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `password`, `username`)
VALUES
	(1,'2018-03-28 23:21:24',1,NULL,NULL,'test','admin');

/*!40000 ALTER TABLE `user_login` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_pledge
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_pledge`;

CREATE TABLE `user_pledge` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `amount` bigint(20) NOT NULL,
  `is_active` bit(1) NOT NULL,
  `campaign_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7eq8wwj3u0p52c9sgpty4xlfi` (`campaign_id`),
  KEY `FKh0ffhlq5fdor9ctu1i8xhq53a` (`user_id`),
  CONSTRAINT `FK7eq8wwj3u0p52c9sgpty4xlfi` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`id`),
  CONSTRAINT `FKh0ffhlq5fdor9ctu1i8xhq53a` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table user_role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_role`;

CREATE TABLE `user_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKa68196081fvovjhkek5m97n3y` (`role_id`),
  KEY `FKsey0o8kqr5hp7oxvyix9vpfbf` (`user_id`),
  CONSTRAINT `FKa68196081fvovjhkek5m97n3y` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `FKsey0o8kqr5hp7oxvyix9vpfbf` FOREIGN KEY (`user_id`) REFERENCES `user_login` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


create index transaction_date_idx on transaction (date);

create index donation_date_idx on donation (date);

create UNIQUE index user_login_unq_idx on user_login (username);



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
