# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 47.88.175.208 (MySQL 5.7.20-0ubuntu0.16.04.1)
# Database: wealthManager
# Generation Time: 2018-02-28 07:23:29 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table investmentHistories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `investmentHistories`;

CREATE TABLE `investmentHistories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `strategy` int(11) NOT NULL,
  `base` decimal(10,2) NOT NULL,
  `totalCost` decimal(10,2) NOT NULL,
  `totalGain` decimal(10,2) NOT NULL,
  `fundId` varchar(15) NOT NULL DEFAULT '',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `investmentHistories` WRITE;
/*!40000 ALTER TABLE `investmentHistories` DISABLE KEYS */;

INSERT INTO `investmentHistories` (`id`, `startDate`, `endDate`, `strategy`, `base`, `totalCost`, `totalGain`, `fundId`, `created_at`, `updated_at`)
VALUES
	(1,'2016-05-09','2016-07-04',1,800.00,1600.00,1654.38,'202015',NULL,NULL),
	(2,'2016-06-08','2016-07-04',1,800.00,800.00,821.55,'002656',NULL,NULL),
	(3,'2015-12-08','2016-07-13',1,200.00,1757.00,1862.57,'160119',NULL,NULL),
	(4,'2016-07-08','2016-11-24',1,1000.00,5000.00,5294.48,'202015',NULL,NULL),
	(5,'2016-12-09','2017-06-30',1,1060.00,7742.00,8264.30,'202015',NULL,NULL),
	(6,'2016-09-30','2017-08-02',1,1000.00,10057.00,11377.32,'000071',NULL,NULL),
	(7,'2017-07-10','2017-09-08',1,1000.00,2000.00,2068.74,'202015',NULL,NULL),
	(8,'2017-09-08','2017-11-06',1,1000.00,2000.00,2072.71,'202015',NULL,NULL);

/*!40000 ALTER TABLE `investmentHistories` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table transactions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `transactions`;

CREATE TABLE `transactions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `target_type` varchar(11) NOT NULL DEFAULT '',
  `target_id` varchar(11) NOT NULL DEFAULT '',
  `unit_price` decimal(10,4) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `poundage` decimal(10,2) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `date` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;

INSERT INTO `transactions` (`id`, `target_type`, `target_id`, `unit_price`, `total_price`, `poundage`, `is_deleted`, `date`, `user_id`)
VALUES
	(1,'fund','160119',1.2345,1000.00,2.34,0,'2018-02-02 08:00:00',1),
	(2,'fund','160119',1.2345,1000.00,2.34,0,'2018-02-02 08:00:00',1),
	(3,'fund','160119',1.2345,1000.00,2.34,0,'2018-02-02 08:00:00',1),
	(4,'fund','160119',1.2345,1000.00,2.34,0,'2018-02-02 08:00:00',1),
	(5,'fund','160119',1.2345,1000.00,2.34,0,'2018-02-02 08:00:00',1),
	(6,'fund','160119',1.2345,1000.00,2.34,0,'2018-02-02 08:00:00',1);

/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(64) NOT NULL DEFAULT '',
  `nick` varchar(32) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `uuid`, `nick`)
VALUES
	(1,'edbeefb8-0ec8-494b-b2cd-3abc03411b8b','歪歪');

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
  `renRenDai` decimal(10,2) NOT NULL,
  `yiRenDai` decimal(10,2) NOT NULL,
  `paiPaiDai` decimal(10,2) NOT NULL,
  `bondFund` decimal(10,2) NOT NULL,
  `indexFund` decimal(10,2) NOT NULL,
  `commodityFund` decimal(10,2) NOT NULL,
  `debt` decimal(10,2) NOT NULL,
  `antFinance` decimal(10,2) NOT NULL,
  `luFax` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `wealthDistributions` WRITE;
/*!40000 ALTER TABLE `wealthDistributions` DISABLE KEYS */;

INSERT INTO `wealthDistributions` (`id`, `recordDate`, `cash`, `deposit`, `moneyFund`, `renRenDai`, `yiRenDai`, `paiPaiDai`, `bondFund`, `indexFund`, `commodityFund`, `debt`, `antFinance`, `luFax`, `created_at`, `updated_at`)
VALUES
	(1,'2014-12-07',180.00,2735.98,2261.06,0.00,0.00,0.00,0.00,0.00,0.00,0.00,22609.10,0.00,NULL,NULL),
	(2,'2014-12-29',32.60,2740.06,2185.40,0.00,0.00,0.00,0.00,0.00,0.00,0.00,24284.91,0.00,NULL,NULL),
	(3,'2015-01-19',56.60,2739.91,2570.84,0.00,0.00,0.00,0.00,0.00,0.00,0.00,25284.91,0.00,NULL,NULL),
	(4,'2015-02-01',232.20,2739.91,2554.86,0.00,0.00,0.00,0.00,0.00,0.00,0.00,25284.91,0.00,NULL,NULL),
	(5,'2015-02-07',132.20,2739.91,3254.87,0.00,0.00,0.00,0.00,0.00,0.00,0.00,25284.91,1000.00,NULL,NULL),
	(6,'2015-02-12',131.70,2373.91,2242.30,0.00,0.00,0.00,0.00,0.00,0.00,0.00,25284.91,1005.00,NULL,NULL),
	(7,'2015-02-16',122.70,2873.91,4023.10,1000.00,0.00,0.00,0.00,0.00,0.00,0.00,25284.91,1005.00,NULL,NULL),
	(8,'2015-02-21',118.70,2873.91,3044.03,1000.00,0.00,0.00,0.00,0.00,0.00,0.00,25284.91,2000.00,NULL,NULL),
	(9,'2015-03-04',104.40,2462.88,4523.91,2000.00,0.00,0.00,0.00,0.00,0.00,2000.00,25284.91,2050.00,NULL,NULL),
	(10,'2015-03-11',86.40,2452.88,5027.83,3001.00,0.00,0.00,0.00,0.00,0.00,2000.00,25284.91,2050.00,NULL,NULL),
	(11,'2015-04-10',83.90,2455.20,3822.79,5605.23,0.00,0.00,0.00,0.00,0.00,2000.00,25284.91,2050.00,NULL,NULL),
	(12,'2015-05-02',50.40,1055.20,2893.48,5638.51,0.00,0.00,0.00,0.00,0.00,2000.00,30284.91,2000.00,NULL,NULL),
	(13,'2015-05-18',280.10,1055.20,4300.01,5697.83,0.00,0.00,0.00,0.00,0.00,2000.00,30284.91,2000.00,NULL,NULL),
	(14,'2015-06-10',212.30,1055.20,247.40,10313.32,0.00,0.00,0.00,0.00,0.00,2000.00,30284.91,2000.00,NULL,NULL),
	(15,'2015-06-21',171.30,1056.50,2260.13,10697.98,0.00,0.00,0.00,0.00,0.00,2000.00,28284.91,2001.52,NULL,NULL),
	(16,'2015-07-03',160.10,1056.50,2020.25,17554.94,0.00,0.00,0.00,0.00,0.00,2000.00,26284.91,2000.00,NULL,NULL),
	(17,'2015-07-14',149.90,1056.50,1926.36,18948.71,0.00,0.00,0.00,0.00,0.00,2000.00,26284.91,2000.00,NULL,NULL),
	(18,'2015-07-20',133.70,1046.50,1859.10,26945.78,0.00,0.00,0.00,0.00,0.00,2000.00,18284.93,2000.00,NULL,NULL),
	(19,'2015-08-05',89.20,1045.50,2001.71,27334.66,0.00,0.00,0.00,0.00,0.00,2000.00,18284.93,2000.00,NULL,NULL),
	(20,'2015-08-13',84.60,1045.50,2037.87,28544.73,0.00,0.00,0.00,0.00,0.00,2000.00,18284.93,2000.00,NULL,NULL),
	(21,'2015-09-14',42.30,903.50,1874.61,29019.44,0.00,0.00,0.00,0.00,0.00,2000.00,18284.93,2000.00,NULL,NULL),
	(22,'2015-09-26',98.60,904.41,1328.05,30107.82,0.00,0.00,0.00,0.00,0.00,2000.00,18284.93,2000.00,NULL,NULL),
	(23,'2015-10-16',11.70,500.00,800.06,32122.66,0.00,0.00,0.00,0.00,0.00,2000.00,18284.93,3000.93,NULL,NULL),
	(24,'2015-11-05',36.40,500.00,796.78,34110.79,0.00,0.00,0.00,0.00,0.00,2000.00,18284.93,3003.52,NULL,NULL),
	(25,'2015-11-17',14.80,500.00,520.31,34309.07,0.00,0.00,0.00,0.00,0.00,2000.00,18284.93,3801.98,NULL,NULL),
	(26,'2015-12-08',82.10,500.00,229.68,35271.20,0.00,0.00,0.00,200.00,0.00,2000.00,18284.93,3254.23,NULL,NULL),
	(27,'2015-12-18',69.80,500.00,749.90,36603.55,0.00,0.00,0.00,408.20,0.00,2000.00,18284.93,3555.84,NULL,NULL),
	(28,'2016-01-07',11.30,500.00,99.87,36813.07,0.00,0.00,0.00,391.58,0.00,2236.00,18284.93,3242.33,NULL,NULL),
	(29,'2016-01-21',17.30,500.00,360.70,37048.99,0.00,0.00,0.00,784.71,0.00,2236.00,17284.92,4941.92,NULL,NULL),
	(30,'2016-01-27',171.20,500.00,566.36,38104.77,0.00,0.00,0.00,755.15,0.00,2236.00,17284.92,5744.10,NULL,NULL),
	(31,'2016-02-15',293.60,500.00,1305.09,38356.92,0.00,0.00,0.00,760.50,0.00,2236.00,17284.92,7554.39,NULL,NULL),
	(32,'2016-03-10',240.90,500.00,1648.07,38636.57,0.00,0.00,0.00,1057.62,0.00,2236.00,17284.92,2073.85,NULL,NULL),
	(33,'2016-03-22',142.20,0.00,436.95,42408.00,0.00,0.00,0.00,922.02,0.00,2236.00,17284.92,601.51,NULL,NULL),
	(34,'2016-04-01',110.20,500.00,989.21,42451.76,0.00,0.00,0.00,1433.65,0.00,2236.00,17284.92,6102.22,NULL,NULL),
	(35,'2016-04-13',20.20,500.00,752.21,42656.30,0.00,0.00,0.00,1463.79,0.00,2236.00,17284.92,6811.44,NULL,NULL),
	(36,'2016-05-01',21.80,368.39,748.62,42890.55,0.00,0.00,0.00,3401.26,0.00,2236.00,17284.92,11662.34,NULL,NULL),
	(37,'2016-05-12',25.00,500.00,1060.78,73270.14,0.00,0.00,0.00,3362.05,0.00,32236.00,17284.92,11677.89,NULL,NULL),
	(38,'2016-05-31',22.50,500.00,5118.13,73525.00,0.00,0.00,0.00,4161.35,0.00,32236.00,17284.92,7717.93,NULL,NULL),
	(39,'2016-06-14',32.60,500.00,456.34,82609.62,0.00,0.00,0.00,4400.05,0.00,29822.00,17284.92,2314.60,NULL,NULL),
	(40,'2016-06-30',27.60,500.00,3320.25,82814.15,0.00,0.00,0.00,6105.46,0.00,29822.00,17284.92,2318.96,NULL,NULL),
	(41,'2016-07-21',23.70,5.00,1149.42,83478.86,0.00,0.00,0.00,3217.75,0.00,27388.00,17284.92,2324.63,NULL,NULL),
	(42,'2016-07-29',25.70,500.00,7200.70,83576.32,0.00,0.00,0.00,6465.45,0.00,27388.00,17284.92,6441.78,NULL,NULL),
	(43,'2016-08-19',25.70,498.00,1714.47,84194.58,0.00,0.00,0.00,6617.10,0.00,24944.00,17284.92,6455.72,NULL,NULL),
	(44,'2016-08-31',43.30,500.00,8180.69,84347.85,0.00,0.00,0.00,8578.21,0.00,24944.00,17284.92,10257.36,NULL,NULL),
	(45,'2016-09-12',49.30,500.00,977.19,84756.29,0.00,0.00,0.00,8447.10,0.00,22485.00,17284.92,12071.57,NULL,NULL),
	(46,'2016-09-30',49.30,500.00,5847.96,85120.86,0.00,0.00,1000.00,13406.52,0.00,22485.00,17284.92,12094.99,NULL,NULL),
	(47,'2016-10-12',30.30,450.00,1134.55,85535.61,0.00,0.00,1003.19,12641.85,1000.00,20007.00,17284.92,12110.60,NULL,NULL),
	(48,'2016-10-31',15.30,500.00,12201.78,85897.03,0.00,0.00,1006.39,12369.41,1000.00,20007.00,14951.93,14835.82,NULL,NULL),
	(49,'2016-11-12',16.30,300.08,1047.89,86306.00,0.00,0.00,1998.40,17645.24,1000.00,17517.00,14951.93,14877.17,NULL,NULL),
	(50,'2016-12-01',16.30,4135.00,8938.61,86667.87,0.00,0.00,1974.47,11599.68,1875.21,13880.00,13951.93,14909.16,NULL,NULL),
	(51,'2016-12-12',16.30,2135.00,5490.17,86855.75,0.00,0.00,3047.95,15611.86,3146.04,13880.00,13951.93,14928.30,NULL,NULL),
	(52,'2016-12-30',12.30,1000.00,4276.96,87448.63,0.00,0.00,2988.09,14868.43,3104.11,13880.00,13951.93,34891.08,NULL,NULL),
	(53,'2017-01-09',88.30,2.37,2845.36,87580.08,0.00,0.00,4192.55,20307.88,4448.04,2556.00,13951.93,9075.00,NULL,NULL),
	(54,'2017-01-20',88.30,0.00,4116.54,96014.10,0.00,0.00,4195.03,19623.25,4491.05,2556.00,13951.93,8056.26,NULL,NULL),
	(55,'2017-01-26',2088.30,8554.38,4659.35,96124.73,0.00,0.00,4201.99,19877.05,4491.91,2556.00,13951.93,8061.68,NULL,NULL),
	(56,'2017-02-09',88.30,1000.00,972.53,96843.49,0.00,0.00,5411.25,25940.87,5616.22,2556.00,13951.93,8073.80,NULL,NULL),
	(57,'2017-02-28',91.30,1000.00,10724.23,98868.54,0.00,0.00,5416.82,26360.70,5736.04,2556.00,13951.93,8089.25,NULL,NULL),
	(58,'2017-03-12',52.30,1000.00,1453.89,99286.08,0.00,0.00,6675.72,31388.07,6723.98,2556.00,13951.93,8097.26,NULL,NULL),
	(59,'2017-03-31',52.30,1000.00,9937.66,104376.19,0.00,0.00,6693.57,31254.48,6896.45,2556.00,13951.93,8114.60,NULL,NULL),
	(60,'2017-04-10',52.30,1000.00,2072.88,104539.89,0.00,0.00,7922.96,36493.94,7985.90,2556.00,13951.93,8123.11,NULL,NULL),
	(61,'2017-04-28',82.00,1000.00,22960.68,142938.46,0.00,0.00,7876.73,35542.37,8020.83,2556.00,13951.93,8138.41,NULL,NULL),
	(62,'2017-05-08',52.00,500.00,11577.77,143133.57,0.00,0.00,9184.93,43079.59,8824.57,2556.00,12951.93,8147.15,NULL,NULL),
	(63,'2017-05-31',27.00,500.00,23589.23,144154.66,0.00,0.00,9132.00,43215.70,8980.45,2556.00,12951.93,8168.16,NULL,NULL),
	(64,'2017-06-09',27.00,500.00,11705.00,144331.49,0.00,0.00,10566.00,51915.29,9960.24,2556.00,12951.93,8176.45,NULL,NULL),
	(65,'2017-06-30',48.00,12596.00,11821.48,145349.88,0.00,0.00,10717.84,52760.10,9724.29,2556.00,12951.93,8195.74,NULL,NULL),
	(66,'2017-07-03',48.00,58195.18,11245.57,145421.82,0.00,0.00,10717.84,52718.57,9724.29,39380.00,12951.93,3.61,NULL,NULL),
	(67,'2017-07-08',48.00,50500.00,0.00,164017.76,0.00,0.00,11830.70,50481.12,11050.26,39380.00,12951.93,0.00,NULL,NULL),
	(68,'2017-07-31',27.50,50500.00,16468.99,159383.45,0.00,0.00,11752.86,50246.69,11286.62,39380.00,12951.93,0.00,NULL,NULL),
	(69,'2017-08-16',27.50,1000.00,16913.93,205159.12,0.00,0.00,13013.75,46056.63,12415.39,33356.00,12951.92,0.00,NULL,NULL),
	(70,'2017-08-31',27.50,1000.00,19392.57,217202.34,0.00,0.00,12991.97,47089.76,12559.30,33356.00,11108.33,0.00,NULL,NULL),
	(71,'2017-09-13',27.50,10.00,2029.09,224474.70,50000.00,4015.00,14275.92,49183.29,13635.83,75135.69,8951.92,0.00,NULL,NULL),
	(72,'2017-09-25',2.50,0.00,42.94,221156.11,50000.00,85200.00,14287.87,48181.63,13472.79,156207.00,7951.92,0.00,NULL,NULL),
	(73,'2017-09-30',2.50,0.00,14418.61,220733.07,50000.00,90200.00,14299.83,48844.65,13514.77,153709.29,5951.92,0.00,NULL,NULL),
	(74,'2017-10-12',2.50,0.00,0.00,221729.04,50000.00,96903.55,15511.78,52568.78,14397.82,155445.00,4951.92,0.00,NULL,NULL),
	(75,'2017-10-31',0.50,0.00,13107.27,221410.52,50624.24,96900.00,15434.03,51806.53,14330.17,153137.50,4951.92,0.00,NULL,NULL),
	(76,'2017-11-13',0.50,0.00,0.00,221819.99,50789.86,103000.00,16726.90,54830.84,15545.15,150340.48,3951.92,0.00,NULL,NULL),
	(77,'2017-11-30',0.50,0.00,16922.98,222554.74,51006.43,103000.00,16642.85,51807.37,15556.45,150487.04,0.00,0.00,NULL,NULL),
	(78,'2017-12-12',0.50,0.00,0.00,227576.80,51159.31,103000.00,18050.83,60294.05,17003.13,150181.60,0.00,0.00,NULL,NULL),
	(79,'2017-12-29',0.50,0.00,15722.02,224499.81,51375.89,103000.00,18005.21,58723.38,17333.12,150299.60,0.00,0.00,NULL,NULL),
	(80,'2018-01-14',0.50,0.00,0.00,230783.11,51579.72,103000.00,19439.09,67378.06,18645.73,150177.65,0.00,0.00,NULL,NULL),
	(81,'2018-01-19',0.50,0.00,0.00,531194.27,51643.42,103000.00,19471.79,66114.34,18495.87,450330.25,0.00,0.00,NULL,NULL),
	(82,'2018-02-01',0.00,0.00,11907.58,531739.51,51809.04,103000.00,19488.14,65794.61,18352.06,450661.79,0.00,0.00,NULL,NULL),
	(83,'2018-02-13',0.00,5766.42,7505.70,544574.86,51961.91,103000.00,19537.19,80775.48,18083.92,450643.52,0.00,0.00,NULL,NULL),
	(84,'2018-02-18',200.00,362.46,7510.43,545029.91,52025.61,103000.00,19537.19,81209.33,18291.58,445673.58,0.00,0.00,NULL,NULL),
	(85,'2018-02-28',200.00,0.00,20354.79,547230.21,52153.01,103000.00,19586.23,85078.15,18231.77,448492.10,0.00,0.00,NULL,NULL);

/*!40000 ALTER TABLE `wealthDistributions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table wealthDistributionTypes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `wealthDistributionTypes`;

CREATE TABLE `wealthDistributionTypes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `target` varchar(15) NOT NULL DEFAULT '',
  `type` varchar(15) NOT NULL DEFAULT '',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `wealthDistributionTypes` WRITE;
/*!40000 ALTER TABLE `wealthDistributionTypes` DISABLE KEYS */;

INSERT INTO `wealthDistributionTypes` (`id`, `target`, `type`, `created_at`, `updated_at`)
VALUES
	(1,'存款','银行',NULL,NULL),
	(2,'货币基金','公募基金',NULL,NULL),
	(3,'蚂蚁定期','P2P',NULL,NULL),
	(4,'陆金所','互联网理财',NULL,NULL),
	(5,'人人贷','P2P',NULL,NULL),
	(6,'债券基金','公募基金',NULL,NULL),
	(7,'指数基金','公募基金',NULL,NULL),
	(8,'商品基金','公募基金',NULL,NULL),
	(9,'现金','其他',NULL,NULL),
	(10,'宜人贷','P2P',NULL,NULL),
	(11,'拍拍贷','P2P',NULL,NULL);

/*!40000 ALTER TABLE `wealthDistributionTypes` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
