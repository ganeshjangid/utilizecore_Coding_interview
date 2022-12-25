-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2022 at 08:18 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `utilizecore`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_chat_groups`
--

CREATE TABLE `tbl_chat_groups` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT '',
  `owner` bigint(20) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_chat_groups`
--

INSERT INTO `tbl_chat_groups` (`id`, `name`, `owner`, `createdAt`, `updatedAt`) VALUES
(1, 'test1 group1', 1, '2022-12-22 13:36:26', '2022-12-22 13:36:26'),
(2, 'test2 group1', 1, '2022-12-22 13:36:30', '2022-12-22 13:36:30'),
(3, 'test 1 group2', 1, '2022-12-25 04:21:13', '2022-12-25 06:44:38'),
(4, 'test2 group1', 1, '2022-12-25 04:33:51', '2022-12-25 04:33:51'),
(5, 'test2 group1', 4, '2022-12-25 06:29:17', '2022-12-25 06:29:17'),
(6, 'test2 group1', 4, '2022-12-25 06:29:22', '2022-12-25 06:29:22'),
(7, 'test2 group1', 4, '2022-12-25 06:31:39', '2022-12-25 06:31:39'),
(8, 'test2 group1', 4, '2022-12-25 06:31:44', '2022-12-25 06:31:44'),
(9, 'test2 group1', 4, '2022-12-25 06:33:16', '2022-12-25 06:33:16'),
(10, 'test2 group1', 4, '2022-12-25 06:35:15', '2022-12-25 06:35:15'),
(11, 'test2 group1', 4, '2022-12-25 06:43:06', '2022-12-25 06:43:06'),
(12, 'test2 group1', 4, '2022-12-25 06:43:18', '2022-12-25 06:43:18'),
(13, 'test2 group1', 4, '2022-12-25 06:43:21', '2022-12-25 06:43:21'),
(14, 'test2 group1', 4, '2022-12-25 06:44:28', '2022-12-25 06:44:28');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_chat_members`
--

CREATE TABLE `tbl_chat_members` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT 0,
  `chat_group_id` bigint(20) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_chat_members`
--

INSERT INTO `tbl_chat_members` (`id`, `user_id`, `chat_group_id`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, '2022-12-22 13:37:29', '2022-12-22 13:37:29'),
(2, 1, 2, '2022-12-22 13:37:33', '2022-12-22 13:37:33'),
(3, 2, 1, '2022-12-22 13:56:35', '2022-12-22 13:56:35'),
(4, 2, 1, '2022-12-25 04:47:24', '2022-12-25 04:47:24');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_group_messages`
--

CREATE TABLE `tbl_group_messages` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT 0,
  `chat_group_id` bigint(20) DEFAULT 0,
  `message` text DEFAULT NULL,
  `sender_receiver` varchar(255) DEFAULT 'receive',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_group_messages`
--

INSERT INTO `tbl_group_messages` (`id`, `user_id`, `chat_group_id`, `message`, `sender_receiver`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 'Hello One', 'send', '2022-12-22 14:36:59', '2022-12-22 14:36:59'),
(2, 1, 1, 'Hello Two', 'send', '2022-12-22 14:58:57', '2022-12-22 14:58:57'),
(3, 1, 1, 'Hello Two', 'send', '2022-12-22 15:01:03', '2022-12-22 15:01:03'),
(4, 1, 1, 'Hello Two', 'send', '2022-12-22 15:01:04', '2022-12-22 15:01:04'),
(5, 1, 1, 'Hello Two', 'send', '2022-12-22 15:01:05', '2022-12-22 15:01:05'),
(6, 1, 1, 'Hello Two', 'send', '2022-12-22 15:01:06', '2022-12-22 15:01:06'),
(7, 1, 1, 'Hello Two', 'send', '2022-12-22 15:01:08', '2022-12-22 15:01:08'),
(8, 1, 1, 'Hello Three', 'send', '2022-12-22 15:01:54', '2022-12-22 15:01:54'),
(9, 1, 1, 'Hello Three', 'send', '2022-12-22 15:01:55', '2022-12-22 15:01:55'),
(10, 1, 1, 'Hello Three', 'send', '2022-12-22 15:01:56', '2022-12-22 15:01:56'),
(11, 1, 1, 'Hello Three', 'send', '2022-12-22 15:01:56', '2022-12-22 15:01:56'),
(12, 1, 1, 'Hello Three', 'send', '2022-12-22 15:01:59', '2022-12-22 15:01:59'),
(13, 1, 1, 'Hello Four', 'send', '2022-12-22 15:02:08', '2022-12-22 15:02:08'),
(14, 1, 1, 'Hello Four', 'send', '2022-12-22 15:02:08', '2022-12-22 15:02:08'),
(15, 1, 1, 'Hello Four', 'send', '2022-12-22 15:02:09', '2022-12-22 15:02:09'),
(16, 2, 1, 'Hello Four', 'send', '2019-12-05 16:18:20', '2022-12-22 16:18:20'),
(17, 2, 1, 'Hello Four', 'send', '2016-12-15 16:18:24', '2022-12-22 16:18:24'),
(18, 2, 1, 'Hello Four', 'send', '2022-12-22 16:18:25', '2022-12-22 16:18:25'),
(19, 2, 1, 'Hello Four', 'send', '2022-12-25 05:06:23', '2022-12-25 05:06:23');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` bigint(20) NOT NULL,
  `user_name` varchar(255) DEFAULT '',
  `email_id` varchar(255) DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `user_name`, `email_id`, `createdAt`, `updatedAt`) VALUES
(1, 'ganesh1', 'ganesh1@gmail.com', '2022-12-22 13:36:10', '2022-12-22 13:36:10'),
(2, 'ganesh2', 'ganesh2@gmail.com', '2022-12-22 13:56:15', '2022-12-22 13:56:15'),
(3, 'ganesh2', 'ganesh2@gmail.com', '2022-12-25 04:11:43', '2022-12-25 04:11:43'),
(4, 'ganesh2', 'ganesh2@gmail.com', '2022-12-25 05:52:41', '2022-12-25 05:52:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_chat_groups`
--
ALTER TABLE `tbl_chat_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner` (`owner`),
  ADD KEY `tbl_chat_groups` (`id`);

--
-- Indexes for table `tbl_chat_members`
--
ALTER TABLE `tbl_chat_members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chat_group_id` (`chat_group_id`),
  ADD KEY `tbl_chat_members` (`id`,`user_id`,`chat_group_id`);

--
-- Indexes for table `tbl_group_messages`
--
ALTER TABLE `tbl_group_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chat_group_id` (`chat_group_id`),
  ADD KEY `tbl_group_message` (`id`,`user_id`,`chat_group_id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tbl_users` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_chat_groups`
--
ALTER TABLE `tbl_chat_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tbl_chat_members`
--
ALTER TABLE `tbl_chat_members`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_group_messages`
--
ALTER TABLE `tbl_group_messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_chat_groups`
--
ALTER TABLE `tbl_chat_groups`
  ADD CONSTRAINT `tbl_chat_groups_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_chat_members`
--
ALTER TABLE `tbl_chat_members`
  ADD CONSTRAINT `tbl_chat_members_ibfk_1` FOREIGN KEY (`chat_group_id`) REFERENCES `tbl_chat_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_group_messages`
--
ALTER TABLE `tbl_group_messages`
  ADD CONSTRAINT `tbl_group_messages_ibfk_1` FOREIGN KEY (`chat_group_id`) REFERENCES `tbl_chat_members` (`chat_group_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
