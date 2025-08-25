
DROP TABLE IF EXISTS `board_preferences`;
CREATE TABLE `board_preferences` (
  `ExpensesThemeColor` enum('Light','Dark','Green','Blue','Red','Purple','Teal','Orange','TealOrangeGrey','BlueWhiteYellow','DarkGreyPinkBlue') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Light',
  `DefaultCategories` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `PreferenceId` int NOT NULL AUTO_INCREMENT,
  `ExpenseBoardId` int NOT NULL,
  PRIMARY KEY (`PreferenceId`),
  KEY `fk_board_preferences_ExpenseBoardId` (`ExpenseBoardId`),
  CONSTRAINT `fk_board_preferences_ExpenseBoardId` FOREIGN KEY (`ExpenseBoardId`) REFERENCES `expenseboards` (`ExpenseBoardId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `boardmembers`
--

DROP TABLE IF EXISTS `boardmembers`;
CREATE TABLE `boardmembers` (
  `BoardMemberId` int NOT NULL AUTO_INCREMENT,
  `ExpenseBoardId` int NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`BoardMemberId`),
  UNIQUE KEY `ExpenseBoardId` (`ExpenseBoardId`,`UserId`),
  KEY `FK_BoardMember_User` (`UserId`),
  CONSTRAINT `FK_BoardMember_ExpenseBoard` FOREIGN KEY (`ExpenseBoardId`) REFERENCES `expenseboards` (`ExpenseBoardId`) ON DELETE CASCADE,
  CONSTRAINT `FK_BoardMember_User` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=281 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `expenseboards`
--

DROP TABLE IF EXISTS `expenseboards`;
CREATE TABLE `expenseboards` (
  `ExpenseBoardId` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `OwnerId` int NOT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ProfilePic` longtext,
  `Budget` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`ExpenseBoardId`),
  KEY `FK_ExpenseBoard_Owner` (`OwnerId`),
  CONSTRAINT `FK_ExpenseBoard_Owner` FOREIGN KEY (`OwnerId`) REFERENCES `users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;

CREATE TABLE `expenses` (
  `ExpenseId` int NOT NULL AUTO_INCREMENT,
  `ExpenseBoardId` int NOT NULL,
  `UserId` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `Date` date NOT NULL,
  `Description` text,
  `Category` varchar(255) NOT NULL,
  `IsVisible` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`ExpenseId`),
  KEY `FK_Expense_ExpenseBoard` (`ExpenseBoardId`),
  KEY `FK_Expense_User` (`UserId`),
  CONSTRAINT `FK_Expense_ExpenseBoard` FOREIGN KEY (`ExpenseBoardId`) REFERENCES `expenseboards` (`ExpenseBoardId`) ON DELETE CASCADE,
  CONSTRAINT `FK_Expense_User` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=412 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;

CREATE TABLE `reports` (
  `ReportId` int NOT NULL AUTO_INCREMENT,
  `ExpenseBoardId` int DEFAULT NULL,
  `UserId` int NOT NULL,
  `ReportName` varchar(255) NOT NULL,
  `Categories` text,
  `Months` text,
  `Years` text,
  `IncludeSummary` tinyint(1) DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ReportData` longtext,
  PRIMARY KEY (`ReportId`),
  KEY `FK_Report_ExpenseBoard` (`ExpenseBoardId`),
  KEY `FK_Report_User` (`UserId`),
  CONSTRAINT `FK_Report_ExpenseBoard` FOREIGN KEY (`ExpenseBoardId`) REFERENCES `expenseboards` (`ExpenseBoardId`) ON DELETE CASCADE,
  CONSTRAINT `FK_Report_User` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `Password` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `ProfilePic` longtext COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dump completed on 2025-08-24 17:25:15
