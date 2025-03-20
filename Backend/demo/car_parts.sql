-- Create the database
SET time_zone = '+00:00';

CREATE DATABASE IF NOT EXISTS car_parts;
USE car_parts;

-- Create the items table
DROP TABLE IF EXISTS `Items`;
CREATE TABLE `Items` (
  `itemID` int NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `category` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`itemID`)
);

-- Insert data into the items table
LOCK TABLES `Items` WRITE;
INSERT INTO `Items` VALUES 
(129,'petronas',1200,'lubricant'),
(132,'shell',1300,'lubricant'),
(157,'renault',9800,'engine'),
(234,'mahle',4400,'pistons'),
(256,'brembo',3200,'brakes'),
(257,'alcon',3350,'brakes'),
(354,'pirelli',3400,'tire'),
(355,'michelin',3600,'tire'),
(467,'mercedes',9900,'engine'),
(477,'ferrari',9700,'engine');
UNLOCK TABLES;

-- Create the stores table
DROP TABLE IF EXISTS `Stores`;
CREATE TABLE `Stores` (
  `location` varchar(20) DEFAULT NULL,
  `store_manager` varchar(20) DEFAULT NULL,
  `size` varchar(10) DEFAULT NULL
);

-- Insert data into the stores table
LOCK TABLES `Stores` WRITE;
INSERT INTO `Stores` VALUES 
('lazimpat','senna','large'),
('pulchowk','schumacher','medium'),
('ason','vettel','small'),
('tahachal','alonso','small'),
('durbarmarg','hamilton','large'),
('patan','raikonnen','large'),
('durbarmarg','fittipaldi','medium');
UNLOCK TABLES;