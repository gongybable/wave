-- Create Users
CREATE USER 'wave'@'%' IDENTIFIED BY 'test';
GRANT ALL PRIVILEGES ON *.* TO 'wave'@'%' WITH GRANT OPTION;

-- Create the test database
CREATE DATABASE IF NOT EXISTS `wave`;

USE `wave`; 

CREATE TABLE `report` (
  `reportId` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`reportId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `payroll` (
  `reportId` int(10) unsigned NOT NULL DEFAULT 0,
  `date` DATE NOT NULL DEFAULT '1970-01-01',
  `hours` decimal(8,2) NOT NULL DEFAULT 0.00,
  `employeeId` int(10) unsigned NOT NULL DEFAULT 0,
  `jobGroup` enum('A', 'B') NOT NULL DEFAULT 'A',
  CONSTRAINT `payroll_fk` FOREIGN KEY (`reportId`) REFERENCES `report` (`reportId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;