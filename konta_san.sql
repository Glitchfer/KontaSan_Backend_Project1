-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 12 Sep 2020 pada 18.17
-- Versi server: 10.4.13-MariaDB
-- Versi PHP: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `konta_san`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `activity`
--

CREATE TABLE `activity` (
  `activity_id` int(15) NOT NULL,
  `user_id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` text NOT NULL,
  `login` datetime NOT NULL,
  `logout` datetime NOT NULL,
  `token` time NOT NULL,
  `sisa_token` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `activity`
--

INSERT INTO `activity` (`activity_id`, `user_id`, `name`, `role`, `login`, `logout`, `token`, `sisa_token`) VALUES
(1, 6, 'rey', '1', '2020-09-05 14:32:33', '2020-09-05 15:03:52', '00:00:00', '00:00:00'),
(2, 6, 'rey', '1', '2020-09-05 17:32:25', '2020-09-05 18:18:50', '00:00:00', '00:00:00'),
(3, 5, 'saprolio', '2', '2020-09-06 21:21:21', '2020-09-06 21:42:09', '00:00:00', '00:00:00'),
(51, 6, 'rey', '1', '2020-09-11 13:05:20', '2020-09-11 13:05:22', '00:00:00', '00:00:00'),
(52, 6, 'rey', '1', '2020-09-11 13:12:04', '2020-09-11 14:37:36', '00:00:00', '00:00:00'),
(53, 11, 'Tobichan', '2', '2020-09-11 15:05:30', '2020-09-11 15:06:46', '00:00:00', '00:00:00'),
(54, 11, 'Tobichan', '2', '2020-09-11 15:07:20', '2020-09-11 15:08:34', '00:00:00', '00:00:00'),
(55, 6, 'rey', '1', '2020-09-11 15:16:09', '2020-09-11 15:38:56', '00:00:00', '00:00:00'),
(56, 6, 'rey', '1', '2020-09-11 15:39:56', '2020-09-11 15:40:24', '00:00:00', '00:00:00'),
(57, 6, 'rey', '1', '2020-09-11 15:44:33', '2020-09-11 15:45:09', '00:00:00', '00:00:00'),
(58, 6, 'rey', '1', '2020-09-11 15:45:22', '2020-09-11 15:45:47', '00:00:00', '00:00:00'),
(64, 6, 'rey', '1', '2020-09-11 16:34:46', '0000-00-00 00:00:00', '00:00:00', '00:00:00'),
(65, 6, 'rey', '1', '2020-09-11 16:36:11', '2020-09-11 16:36:22', '00:00:00', '00:00:00'),
(66, 6, 'rey', '1', '2020-09-11 18:35:25', '2020-09-11 19:35:32', '00:00:00', '00:00:00'),
(67, 6, 'rey', '1', '2020-09-11 20:06:09', '2020-09-11 21:07:03', '00:00:00', '00:00:00'),
(68, 6, 'rey', '1', '2020-09-11 21:10:44', '2020-09-12 00:55:39', '00:00:00', '00:00:00'),
(69, 6, 'rey', '1', '2020-09-12 00:58:27', '2020-09-12 01:24:38', '00:00:00', '00:00:00'),
(70, 6, 'rey', '1', '2020-09-12 10:07:19', '2020-09-12 11:59:09', '00:00:00', '00:00:00'),
(71, 6, 'rey', '1', '2020-09-12 11:59:32', '2020-09-12 12:06:01', '00:00:00', '00:00:00'),
(72, 1, 'arif', '2', '2020-09-12 12:06:32', '2020-09-12 12:07:30', '00:00:00', '00:00:00'),
(73, 1, 'arif', '2', '2020-09-12 12:08:05', '2020-09-12 12:46:09', '00:00:00', '00:00:00'),
(74, 6, 'rey', '1', '2020-09-12 12:46:25', '2020-09-12 14:38:52', '00:00:00', '00:00:00'),
(75, 6, 'rey', '1', '2020-09-12 14:43:00', '2020-09-12 14:43:04', '00:00:00', '00:00:00'),
(76, 6, 'rey', '1', '2020-09-12 14:44:07', '2020-09-12 14:50:49', '00:00:00', '00:00:00'),
(78, 6, 'rey', '1', '2020-09-12 15:53:17', '2020-09-12 16:20:07', '00:00:00', '00:00:00'),
(83, 6, 'rey', '1', '2020-09-12 22:55:50', '0000-00-00 00:00:00', '00:00:00', '00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1, 'Food'),
(2, 'Beverage'),
(5, 'Dessert');

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `date` date NOT NULL COMMENT 'connect with invoice created date to show all of the data on that time',
  `invoice_number` int(6) NOT NULL COMMENT 'conncet with invoice to show all payment data',
  `revenue` int(25) NOT NULL COMMENT 'cumulative from total payment/day, /week, /month, /year'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`history_id`, `date`, `invoice_number`, `revenue`) VALUES
(8, '2020-08-29', 0, 123000000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `income`
--

CREATE TABLE `income` (
  `income_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `invoice`
--

CREATE TABLE `invoice` (
  `invoice_id` int(9) NOT NULL,
  `invoice_number` int(6) NOT NULL COMMENT 'Connect with order table to proccess the order',
  `total_price` int(255) NOT NULL,
  `tax` int(25) NOT NULL COMMENT 'cummulative tax (10%) for all picked item price',
  `sub_total` int(25) NOT NULL COMMENT 'cummulative price from all picked item + tax',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `invoice`
--

INSERT INTO `invoice` (`invoice_id`, `invoice_number`, `total_price`, `tax`, `sub_total`, `created_at`, `updated_at`) VALUES
(1, 33234, 2000000, 200000, 2200000, '2019-08-22 00:44:27', '2019-08-22 00:44:41'),
(125, 90411, 60000, 6000, 66000, '2020-08-30 00:44:27', '2020-08-30 00:44:41'),
(126, 102774, 42000, 4200, 46200, '2020-08-30 00:45:12', '2020-08-30 00:45:26'),
(127, 17572, 123000, 12300, 135300, '2020-08-30 00:45:40', '2020-08-30 00:45:59'),
(128, 84725, 65000, 6500, 71500, '2020-08-30 00:46:17', '2020-08-30 00:46:42'),
(129, 28498, 130000, 13000, 143000, '2020-08-30 00:47:20', '2020-08-30 00:47:42'),
(130, 28014, 70000, 7000, 77000, '2020-08-30 09:37:45', '2020-08-30 09:38:08'),
(131, 63500, 87000, 8700, 95700, '2020-08-30 15:52:30', '2020-08-30 15:52:45'),
(132, 98487, 239500, 23950, 263450, '2020-08-30 15:56:07', '2020-08-30 15:56:54'),
(133, 62065, 42000, 4200, 46200, '2020-08-31 09:42:50', '2020-08-31 09:43:02'),
(134, 37533, 158000, 15800, 173800, '2020-08-31 10:12:37', '2020-08-31 10:13:26'),
(135, 77051, 66000, 6600, 72600, '2020-08-31 11:53:39', '2020-08-31 11:53:57'),
(136, 34689, 42000, 4200, 46200, '2020-08-31 11:54:14', '2020-08-31 11:54:28'),
(137, 88096, 60000, 6000, 66000, '2020-08-31 12:04:00', '2020-08-31 12:04:59'),
(138, 53310, 30000, 3000, 33000, '2020-08-31 12:11:12', '2020-08-31 12:11:40'),
(139, 93160, 120000, 12000, 132000, '2020-08-31 13:12:48', '2020-08-31 13:17:51'),
(140, 25378, 961665, 96167, 1057832, '2020-08-31 14:03:28', '2020-08-31 14:25:43'),
(141, 24327, 137000, 13700, 150700, '2020-08-31 16:09:18', '2020-08-31 16:14:14'),
(142, 37384, 66000, 6600, 72600, '2020-09-01 00:09:59', '2020-09-01 00:10:12'),
(143, 80597, 47500, 4750, 52250, '2020-09-01 12:05:37', '2020-09-02 22:11:23'),
(145, 37183, 30000, 3000, 33000, '2020-09-06 21:35:56', '2020-09-06 21:38:52'),
(146, 81429, 51800, 5180, 56980, '2020-09-10 16:07:36', '2020-09-10 16:08:03'),
(147, 109182, 101000, 10100, 111100, '2020-09-11 16:12:26', '2020-09-11 16:12:36'),
(148, 107754, 30000, 3000, 33000, '2020-09-11 21:11:23', '2020-09-11 21:11:27'),
(149, 87609, 12000, 1200, 13200, '2020-09-11 21:18:52', '2020-09-11 21:18:57'),
(150, 49153, 33000, 3300, 36300, '2020-09-12 01:10:13', '2020-09-12 01:10:24'),
(151, 29706, 7000, 700, 7700, '2020-09-12 12:47:47', '2020-09-12 12:48:01'),
(152, 101420, 30000, 3000, 33000, '2020-09-12 14:52:10', '2020-09-12 14:52:15'),
(162, 14441, 20000, 2000, 22000, '2020-09-12 19:57:02', '2020-09-12 19:57:08');

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
--

CREATE TABLE `orders` (
  `orders_id` int(11) NOT NULL,
  `cashier_name` varchar(100) NOT NULL,
  `product_id` int(9) NOT NULL COMMENT 'connect with product id, to get item name & price',
  `item_quantity` int(3) NOT NULL,
  `total_price` int(15) NOT NULL COMMENT 'cummulative from product_price & quantity',
  `payment` varchar(4) NOT NULL DEFAULT 'CASH',
  `invoice_id` int(9) NOT NULL COMMENT 'connect with invoice table to proccess the order',
  `date` datetime NOT NULL COMMENT 'connect with invoice created date to proccess the order'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `orders`
--

INSERT INTO `orders` (`orders_id`, `cashier_name`, `product_id`, `item_quantity`, `total_price`, `payment`, `invoice_id`, `date`) VALUES
(190, 'Ryan', 8, 2, 60000, 'CASH', 125, '2020-08-30 00:44:40'),
(191, 'Ryan', 2, 1, 15000, 'CASH', 125, '2020-08-30 00:44:41'),
(192, 'Fakih', 9, 1, 30000, 'CASH', 126, '2020-08-30 00:45:16'),
(193, 'Fakih', 3, 2, 12000, 'CASH', 126, '2020-08-30 00:45:25'),
(194, 'Murni', 6, 2, 66000, 'CASH', 127, '2020-08-30 00:45:55'),
(195, 'Murni', 45, 2, 57000, 'CASH', 127, '2020-08-30 00:45:58'),
(196, 'Lia', 7, 1, 28000, 'CASH', 128, '2020-08-30 00:46:20'),
(197, 'Lia', 8, 1, 30000, 'CASH', 128, '2020-08-30 00:46:24'),
(198, 'Lia', 25, 2, 7000, 'CASH', 128, '2020-08-30 00:46:42'),
(199, 'Murni', 10, 1, 60000, 'CASH', 129, '2020-08-30 00:47:25'),
(200, 'Murni', 25, 4, 14000, 'CASH', 129, '2020-08-30 00:47:32'),
(201, 'Murni', 7, 2, 56000, 'CASH', 129, '2020-08-30 00:47:42'),
(202, 'Murni', 11, 1, 69000, 'CASH', 129, '2020-08-30 00:47:52'),
(203, 'Mira', 7, 1, 28000, 'CASH', 130, '2020-08-30 09:37:56'),
(204, 'Mira', 8, 1, 30000, 'CASH', 130, '2020-08-30 09:37:57'),
(205, 'Mira', 3, 2, 12000, 'CASH', 130, '2020-08-30 09:38:08'),
(206, 'maya', 3, 1, 6000, 'CASH', 131, '2020-08-30 15:52:37'),
(207, 'maya', 2, 1, 15000, 'CASH', 131, '2020-08-30 15:52:41'),
(208, 'maya', 6, 2, 66000, 'CASH', 131, '2020-08-30 15:52:45'),
(209, 'Momo', 7, 2, 56000, 'CASH', 132, '2020-08-30 15:56:26'),
(210, 'Momo', 13, 2, 49000, 'CASH', 132, '2020-08-30 15:56:28'),
(211, 'Momo', 8, 2, 60000, 'CASH', 132, '2020-08-30 15:56:30'),
(212, 'Momo', 45, 2, 57000, 'CASH', 132, '2020-08-30 15:56:41'),
(213, 'Momo', 25, 5, 17500, 'CASH', 132, '2020-08-30 15:56:53'),
(214, 'Rina', 3, 2, 12000, 'CASH', 133, '2020-08-31 09:42:58'),
(215, 'Rina', 2, 2, 30000, 'CASH', 133, '2020-08-31 09:43:02'),
(216, 'Ilham', 3, 2, 12000, 'CASH', 134, '2020-08-31 10:12:58'),
(217, 'Ilham', 2, 1, 15000, 'CASH', 134, '2020-08-31 10:13:02'),
(218, 'Ilham', 6, 1, 33000, 'CASH', 134, '2020-08-31 10:13:03'),
(219, 'Ilham', 1, 1, 10000, 'CASH', 134, '2020-08-31 10:13:04'),
(220, 'Ilham', 7, 1, 28000, 'CASH', 134, '2020-08-31 10:13:06'),
(221, 'Ilham', 8, 2, 60000, 'CASH', 134, '2020-08-31 10:13:26'),
(222, 'Arif', 6, 2, 66000, 'CASH', 135, '2020-08-31 11:53:56'),
(223, 'Arif', 3, 1, 6000, 'CASH', 135, '2020-08-31 11:53:57'),
(224, 'Arif', 3, 2, 12000, 'CASH', 136, '2020-08-31 11:54:24'),
(225, 'Arif', 2, 2, 30000, 'CASH', 136, '2020-08-31 11:54:27'),
(226, 'saprol', 10, 1, 60000, 'CASH', 137, '2020-08-31 12:04:59'),
(227, 'dsada', 3, 2, 12000, 'CASH', 138, '2020-08-31 12:11:26'),
(228, 'dsada', 3, 3, 18000, 'CASH', 138, '2020-08-31 12:11:40'),
(229, 'mami', 10, 2, 120000, 'CASH', 139, '2020-08-31 13:17:51'),
(230, 'momon', 8, 1, 30000, 'CASH', 140, '2020-08-31 14:03:54'),
(231, 'momon', 45, 1, 28000, 'CASH', 140, '2020-08-31 14:07:14'),
(232, 'momon', 7, 1, 28000, 'CASH', 140, '2020-08-31 14:07:15'),
(233, 'momon', 9, 1, 30000, 'CASH', 140, '2020-08-31 14:07:16'),
(234, 'momon', 3, 1, 6000, 'CASH', 140, '2020-08-31 14:07:16'),
(235, 'momon', 11, 1, 69000, 'CASH', 140, '2020-08-31 14:07:20'),
(236, 'momon', 13, 1, 17500, 'CASH', 140, '2020-08-31 14:07:21'),
(237, 'momon', 43, 1, 15000, 'CASH', 140, '2020-08-31 14:07:22'),
(238, 'momon', 6, 1, 33000, 'CASH', 140, '2020-08-31 14:07:22'),
(239, 'momon', 10, 1, 60000, 'CASH', 140, '2020-08-31 14:07:22'),
(240, 'momon', 1, 1, 10000, 'CASH', 140, '2020-08-31 14:15:38'),
(241, 'momon', 2, 1, 15000, 'CASH', 140, '2020-08-31 14:15:38'),
(242, 'momon', 25, 1, 3500, 'CASH', 140, '2020-08-31 14:15:44'),
(243, 'momon', 47, 5, 616665, 'CASH', 140, '2020-08-31 14:25:42'),
(244, 'Maria', 45, 1, 28000, 'CASH', 141, '2020-08-31 16:13:30'),
(245, 'Maria', 8, 1, 30000, 'CASH', 141, '2020-08-31 16:13:32'),
(246, 'Maria', 9, 1, 30000, 'CASH', 141, '2020-08-31 16:13:33'),
(247, 'Maria', 3, 1, 6000, 'CASH', 141, '2020-08-31 16:13:33'),
(248, 'Maria', 2, 1, 15000, 'CASH', 141, '2020-08-31 16:13:35'),
(249, 'Maria', 7, 1, 28000, 'CASH', 141, '2020-08-31 16:14:13'),
(250, 'Yuji', 6, 2, 66000, 'CASH', 142, '2020-09-01 00:10:11'),
(251, 'Mugi', 25, 5, 17500, 'CASH', 143, '2020-09-01 12:05:53'),
(252, 'Mugi', 43, 2, 30000, 'CASH', 143, '2020-09-01 12:05:57'),
(254, 'Arif', 1, 2, 20000, 'CASH', 144, '2020-09-02 22:14:18'),
(255, 'saprolio', 1, 3, 30000, 'CASH', 145, '2020-09-06 21:38:49'),
(256, 'Mia', 45, 1, 27800, 'CASH', 146, '2020-09-10 16:07:52'),
(257, 'Mia', 70, 2, 24000, 'CASH', 146, '2020-09-10 16:08:03'),
(258, 'rey', 2, 1, 15000, 'CASH', 147, '2020-09-11 16:12:29'),
(259, 'rey', 1, 2, 20000, 'CASH', 147, '2020-09-11 16:12:34'),
(260, 'rey', 6, 2, 66000, 'CASH', 147, '2020-09-11 16:12:35'),
(261, 'rey', 2, 2, 30000, 'CASH', 148, '2020-09-11 21:11:27'),
(262, 'rey', 3, 2, 12000, 'CASH', 149, '2020-09-11 21:18:57'),
(263, 'rey', 6, 1, 33000, 'CASH', 150, '2020-09-12 01:10:23'),
(264, 'rey', 25, 2, 7000, 'CASH', 151, '2020-09-12 12:48:00'),
(265, 'Tobichan', 2, 2, 30000, 'CASH', 152, '2020-09-12 14:52:15'),
(272, 'rey', 1, 2, 20000, 'CASH', 162, '2020-09-12 19:57:07');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `product_id` int(9) NOT NULL,
  `product_name` varchar(250) NOT NULL,
  `product_price` int(15) NOT NULL,
  `product_status` int(1) NOT NULL COMMENT '1 = available,\r\n0 = unavailable',
  `product_created_at` datetime NOT NULL,
  `product_updated_at` datetime NOT NULL,
  `category_id` int(9) NOT NULL COMMENT 'connect with category to show whic catogory this item',
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_price`, `product_status`, `product_created_at`, `product_updated_at`, `category_id`, `img`) VALUES
(1, 'Espresso', 10000, 1, '2020-08-12 19:54:03', '2020-09-12 22:57:48', 2, '2020-09-12T15-57-48.165Z-img0.png'),
(2, 'Coffee Latte', 15000, 1, '2020-08-12 20:05:10', '2020-09-12 23:06:00', 2, '2020-09-12T16-06-00.567Z-img2.png'),
(3, 'Cappucino', 6000, 1, '2020-08-12 20:20:08', '2020-09-12 23:08:27', 2, '2020-09-12T16-08-27.524Z-img3.png'),
(6, 'Red Velvet Latte', 33000, 1, '2020-08-15 11:10:09', '2020-09-12 23:09:09', 2, '2020-09-12T16-09-09.830Z-img4.png'),
(7, 'Choco Rhum', 28000, 1, '2020-08-15 11:11:09', '2020-09-12 23:09:54', 5, '2020-09-12T16-09-54.846Z-img5.png'),
(8, 'Black Forest', 30000, 1, '2020-08-15 11:11:38', '2020-09-12 23:10:37', 5, '2020-09-12T16-10-37.550Z-img6.png'),
(9, 'Chicken Katsu Dabu-dabu', 30000, 1, '2020-08-15 11:11:55', '2020-09-12 23:11:20', 1, '2020-09-12T16-11-20.018Z-img7.png'),
(10, 'Salmon Truffle Teriyaki', 60000, 1, '2020-08-15 11:12:28', '2020-09-12 23:11:55', 1, '2020-09-12T16-11-55.172Z-img8.png'),
(11, 'Wiener Schnitzel', 69000, 1, '2020-08-15 11:13:04', '2020-09-12 23:12:46', 1, '2020-09-12T16-12-46.423Z-img9.png'),
(13, 'Twisted Metal Pancake', 24500, 1, '2020-08-15 20:41:54', '2020-09-12 23:13:34', 1, '2020-09-12T16-13-34.995Z-photo-1598214886806-c87b84b7078b.jpg'),
(25, 'Mineral Water', 3500, 1, '2020-08-18 15:31:54', '2020-09-12 23:14:03', 2, '2020-09-12T16-14-03.063Z-air-mineral-kemasan-aqua-_180222205334-669.jpg'),
(43, 'Creamy Omurice', 15000, 1, '2020-08-28 14:16:48', '2020-09-12 23:14:46', 1, '2020-09-12T16-14-46.396Z-Creamy-Salmon-Omurice-Half-Cooked_02-600x400-l.jpg'),
(45, 'Black Burger', 27800, 1, '2020-08-29 18:15:03', '2020-09-12 23:15:23', 1, '2020-09-12T16-15-23.733Z-photo-1536748240857-8179775c9a67.jpg'),
(52, 'Vanilla Waffle Berry', 24500, 1, '2020-09-01 17:47:12', '2020-09-05 18:06:52', 5, '2020-09-05T11-06-52.317Z-photo-1521704042371-f13409bf0e6d.jpg'),
(57, 'Rose Ice Cream', 17000, 1, '2020-09-02 23:39:38', '2020-09-05 18:14:05', 5, '2020-09-05T11-14-05.656Z-photo-1584611312625-5541eed009e1.jpg'),
(70, 'Oreo Milk Shake', 12000, 1, '2020-09-05 18:11:50', '2020-09-05 18:14:56', 2, '2020-09-05T11-14-56.489Z-oreo shake.jpg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_role` int(1) NOT NULL,
  `user_status` int(1) NOT NULL,
  `user_created_at` datetime NOT NULL,
  `user_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `user_email`, `user_password`, `user_name`, `user_role`, `user_status`, `user_created_at`, `user_updated_at`) VALUES
(1, 'arif12345@gmail.com', '$2b$10$xhbMEgMovqOvMCSVVv5JJ./mH6dAS87fuk4BRDnTdIQTJl.6Y55s2', 'arif', 2, 1, '2020-09-01 11:09:00', '2020-09-12 12:05:46'),
(5, 'saprolio1234@gmail.com', '$2b$10$AYk5ZZF5ghS5ODXDjgspTenklEthMg3an1u6xXz1I2zEFxQsVKFTe', 'saprolio', 2, 1, '2020-09-02 18:16:32', '0000-00-00 00:00:00'),
(6, 'rey1234@gmail.com', '$2b$10$ikXf/Yu/x4jucMu6sNO7J.otOB7irn.DC3P5JJVOTuJ.cT9DCq.Ra', 'rey', 1, 1, '2020-09-02 18:17:06', '2020-09-05 14:01:12'),
(9, 'Shadow@gmail.com', '$2b$10$.6Q44SbqlBxHsIBBNZIb/efQ3Mlq.i7W5kFtdbVGE/WJSOmWxhqBS', 'mbahkunci', 1, 1, '2020-09-07 11:35:34', '0000-00-00 00:00:00'),
(11, 'tobiropo@gmail.com', '$2b$10$zrTO8eMSxWeKUBgvxK6SReziIB67SnW/0t1vcb3r8S34ULRiV9jfi', 'Tobichan', 2, 1, '2020-09-11 15:02:41', '2020-09-12 14:50:18');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`activity_id`);

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indeks untuk tabel `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`);

--
-- Indeks untuk tabel `income`
--
ALTER TABLE `income`
  ADD PRIMARY KEY (`income_id`);

--
-- Indeks untuk tabel `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoice_id`);

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orders_id`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `activity`
--
ALTER TABLE `activity`
  MODIFY `activity_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `income`
--
ALTER TABLE `income`
  MODIFY `income_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT untuk tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `orders_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=273;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
