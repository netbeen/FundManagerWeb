# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 47.88.175.208 (MySQL 5.7.18-0ubuntu0.16.04.1)
# Database: wealthManager
# Generation Time: 2017-06-30 14:47:25 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(64) NOT NULL DEFAULT '',
  `nick` varchar(32) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `uuid`, `nick`)
VALUES
	(1,'edbeefb8-0ec8-494b-b2cd-3abc03411b8b','歪歪'),
	(2,'f1bc529c-debf-4876-b525-a2797bb4443d','晓娴');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table wealthDistributions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `wealthDistributions`;

CREATE TABLE `wealthDistributions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `recordDate` date NOT NULL,
  `cash` decimal(10,2) NOT NULL,
  `deposit` decimal(10,2) NOT NULL,
  `moneyFund` decimal(10,2) NOT NULL,
  `antFinance` decimal(10,2) NOT NULL,
  `luFax` decimal(10,2) NOT NULL,
  `renRenDai` decimal(10,2) NOT NULL,
  `bondFund` decimal(10,2) NOT NULL,
  `indexFund` decimal(10,2) NOT NULL,
  `commodityFund` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;

LOCK TABLES `wealthDistributions` WRITE;
/*!40000 ALTER TABLE `wealthDistributions` DISABLE KEYS */;

INSERT INTO `wealthDistributions` (`id`, `recordDate`, `cash`, `deposit`, `moneyFund`, `antFinance`, `luFax`, `renRenDai`, `bondFund`, `indexFund`, `commodityFund`, `created_at`, `updated_at`)
VALUES
	(1,'2014-12-29',32.60,2740.06,2185.40,24284.91,0.00,0.00,0.00,0.00,0.00,NULL,NULL),
	(2,'2015-01-19',56.60,2739.91,2570.84,25284.91,0.00,0.00,0.00,0.00,0.00,NULL,NULL),
	(3,'2015-02-01',232.20,2739.91,2554.86,25284.91,0.00,0.00,0.00,0.00,0.00,NULL,NULL),
	(4,'2015-02-07',132.20,2739.91,3254.87,25284.91,1000.00,0.00,0.00,0.00,0.00,NULL,NULL),
	(5,'2015-02-12',131.70,2373.91,2242.30,25284.91,1005.00,0.00,0.00,0.00,0.00,NULL,NULL),
	(6,'2015-02-16',122.70,2873.91,4023.10,25284.91,1005.00,1000.00,0.00,0.00,0.00,NULL,NULL),
	(7,'2015-02-21',118.70,2873.91,3044.03,25284.91,2000.00,1000.00,0.00,0.00,0.00,NULL,NULL),
	(8,'2015-03-04',104.40,2462.88,4523.91,25284.91,2050.00,2000.00,0.00,0.00,0.00,NULL,NULL),
	(9,'2015-03-11',86.40,2452.88,5027.83,25284.91,2050.00,3001.00,0.00,0.00,0.00,NULL,NULL),
	(10,'2015-04-10',83.90,2455.20,3822.79,25284.91,2050.00,5605.23,0.00,0.00,0.00,NULL,NULL),
	(11,'2015-05-02',50.40,1055.20,2893.48,30284.91,2000.00,5638.51,0.00,0.00,0.00,NULL,NULL),
	(12,'2015-05-18',280.10,1055.20,4300.01,30284.91,2000.00,5697.83,0.00,0.00,0.00,NULL,NULL),
	(13,'2015-06-10',212.30,1055.20,247.40,30284.91,2000.00,10313.32,0.00,0.00,0.00,NULL,NULL),
	(14,'2015-06-21',171.30,1056.50,2260.13,28284.91,2001.52,10697.98,0.00,0.00,0.00,NULL,NULL),
	(15,'2015-07-03',160.10,1056.50,2020.25,26284.91,2000.00,17554.94,0.00,0.00,0.00,NULL,NULL),
	(16,'2015-07-14',149.90,1056.50,1926.36,26284.91,2000.00,18948.71,0.00,0.00,0.00,NULL,NULL),
	(17,'2015-07-20',133.70,1046.50,1859.10,18284.93,2000.00,26945.78,0.00,0.00,0.00,NULL,NULL),
	(18,'2015-08-05',89.20,1045.50,2001.71,18284.93,2000.00,27334.66,0.00,0.00,0.00,NULL,NULL),
	(19,'2015-08-13',84.60,1045.50,2037.87,18284.93,2000.00,28544.73,0.00,0.00,0.00,NULL,NULL),
	(20,'2015-09-14',42.30,903.50,1874.61,18284.93,2000.00,29019.44,0.00,0.00,0.00,NULL,NULL),
	(21,'2015-09-26',98.60,904.41,1328.05,18284.93,2000.00,30107.82,0.00,0.00,0.00,NULL,NULL),
	(22,'2015-10-16',11.70,500.00,800.06,18284.93,3000.93,32122.66,0.00,0.00,0.00,NULL,NULL),
	(23,'2015-11-05',36.40,500.00,796.78,18284.93,3003.52,34110.79,0.00,0.00,0.00,NULL,NULL),
	(24,'2015-11-17',14.80,500.00,520.31,18284.93,3801.98,34309.07,0.00,0.00,0.00,NULL,NULL),
	(25,'2015-12-08',82.10,500.00,229.68,18284.93,3254.23,35271.20,0.00,200.00,0.00,NULL,NULL),
	(26,'2015-12-18',69.80,500.00,749.90,18284.93,3555.84,36603.55,0.00,408.20,0.00,NULL,NULL),
	(27,'2016-01-07',11.30,500.00,99.87,18284.93,3242.33,36813.07,0.00,391.58,0.00,NULL,NULL),
	(28,'2016-01-21',17.30,500.00,360.70,17284.92,4941.92,37048.99,0.00,784.71,0.00,NULL,NULL),
	(29,'2016-01-27',171.20,500.00,566.36,17284.92,5744.10,38104.77,0.00,755.15,0.00,NULL,NULL),
	(30,'2016-02-15',293.60,500.00,1305.09,17284.92,7554.39,38356.92,0.00,760.50,0.00,NULL,NULL),
	(31,'2016-03-10',240.90,500.00,1648.07,17284.92,2073.85,38636.57,0.00,1057.62,0.00,NULL,NULL),
	(32,'2016-03-22',142.20,0.00,436.95,17284.92,601.51,42408.00,0.00,922.02,0.00,NULL,NULL),
	(33,'2016-04-01',110.20,500.00,989.21,17284.92,6102.22,42451.76,0.00,1433.65,0.00,NULL,NULL),
	(34,'2016-04-13',20.20,500.00,752.21,17284.92,6811.44,42656.30,0.00,1463.79,0.00,NULL,NULL),
	(35,'2016-05-01',21.80,368.39,748.62,17284.92,11662.34,42890.55,0.00,3401.26,0.00,NULL,NULL),
	(36,'2016-05-12',25.00,500.00,1060.78,17284.92,11677.89,73270.14,0.00,3362.05,0.00,NULL,NULL),
	(37,'2016-05-31',22.50,500.00,5118.13,17284.92,7717.93,73525.00,0.00,4161.35,0.00,NULL,NULL),
	(38,'2016-06-14',32.60,500.00,456.34,17284.92,2314.60,82609.62,0.00,4400.05,0.00,NULL,NULL),
	(39,'2016-06-30',27.60,500.00,3320.25,17284.92,2318.96,82814.15,0.00,6105.46,0.00,NULL,NULL),
	(40,'2016-07-21',23.70,5.00,1149.42,17284.92,2324.63,83478.86,0.00,3217.75,0.00,NULL,NULL),
	(41,'2016-07-29',25.70,500.00,7200.70,17284.92,6441.78,83576.32,0.00,6465.45,0.00,NULL,NULL),
	(42,'2016-08-19',25.70,498.00,1714.47,17284.92,6455.72,84194.58,0.00,6617.10,0.00,NULL,NULL),
	(43,'2016-08-31',43.30,500.00,8180.69,17284.92,10257.36,84347.85,0.00,8578.21,0.00,NULL,NULL),
	(44,'2016-09-12',49.30,500.00,977.19,17284.92,12071.57,84756.29,0.00,8447.10,0.00,NULL,NULL),
	(45,'2016-09-30',49.30,500.00,5847.96,17284.92,12094.99,85120.86,1000.00,13406.52,0.00,NULL,NULL),
	(46,'2016-10-12',30.30,450.00,1134.55,17284.92,12110.60,85535.61,1003.19,12641.85,1000.00,NULL,NULL),
	(47,'2016-10-31',15.30,500.00,12201.78,14951.93,14835.82,85897.03,1006.39,12369.41,1000.00,NULL,NULL),
	(48,'2016-11-12',16.30,300.08,1047.89,14951.93,14877.17,86306.00,1998.40,17645.24,1000.00,NULL,NULL),
	(49,'2016-12-01',16.30,4135.00,8938.61,13951.93,14909.16,86667.87,1974.47,11599.68,1875.21,NULL,NULL),
	(50,'2016-12-12',16.30,2135.00,5490.17,13951.93,14928.30,86855.75,3047.95,15611.86,3146.04,NULL,NULL),
	(51,'2016-12-30',12.30,1000.00,4276.96,13951.93,34891.08,87448.63,2988.09,14868.43,3104.11,NULL,NULL),
	(52,'2017-01-09',88.30,2.37,2845.36,13951.93,9075.00,87580.08,4192.55,20307.88,4448.04,NULL,NULL),
	(53,'2017-01-20',88.30,0.00,4116.54,13951.93,8056.26,96014.10,4195.03,19623.25,4491.05,NULL,NULL),
	(54,'2017-01-26',2088.30,8554.38,4659.35,13951.93,8061.68,96124.73,4201.99,19877.05,4491.91,NULL,NULL),
	(55,'2017-02-09',88.30,1000.00,972.53,13951.93,8073.80,96843.49,5411.25,25940.87,5616.22,NULL,NULL),
	(56,'2017-02-28',91.30,1000.00,10724.23,13951.93,8089.25,98868.54,5416.82,26360.70,5736.04,NULL,NULL),
	(57,'2017-03-12',52.30,1000.00,1453.89,13951.93,8097.26,99286.08,6675.72,31388.07,6723.98,NULL,NULL),
	(58,'2017-03-31',52.30,1000.00,9937.66,13951.93,8114.60,104376.19,6693.57,31254.48,6896.45,NULL,NULL),
	(59,'2017-04-10',52.30,1000.00,2072.88,13951.93,8123.11,104539.89,7922.96,36493.94,7985.90,NULL,NULL),
	(60,'2017-04-28',82.00,1000.00,22960.68,13951.93,8138.41,142938.46,7876.73,35542.37,8020.83,NULL,NULL),
	(61,'2017-05-08',52.00,500.00,11577.77,12951.93,8147.15,143133.57,9184.93,43079.59,8824.57,NULL,NULL),
	(62,'2017-05-31',27.00,500.00,23589.23,12951.93,8168.16,144154.66,9132.00,43215.70,8980.45,NULL,NULL),
	(63,'2017-06-09',27.00,500.00,11705.00,12951.93,8176.45,144331.49,10566.00,51915.29,9960.24,NULL,NULL),
	(64,'2017-06-30',48.00,12596.00,11821.48,12951.93,8195.74,145349.88,10717.84,52760.10,9724.29,NULL,NULL);

/*!40000 ALTER TABLE `wealthDistributions` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
