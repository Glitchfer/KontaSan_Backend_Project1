-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 01 Sep 2020 pada 04.02
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
(142, 37384, 66000, 6600, 72600, '2020-09-01 00:09:59', '2020-09-01 00:10:12');

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
(250, 'Yuji', 6, 2, 66000, 'CASH', 142, '2020-09-01 00:10:11');

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
(1, 'Espresso', 10000, 1, '2020-08-12 19:54:03', '2020-08-23 10:01:39', 2, 'https://i2.wp.com/gettravelinspired.com/wp-content/uploads/2020/02/jeremy-ricketts-6ZnhM-xBpos-unsplash-1.jpg?fit=1440%2C960&ssl=1'),
(2, 'Coffee Latte', 15000, 1, '2020-08-12 20:05:10', '2020-08-15 11:15:45', 2, 'https://images.unsplash.com/photo-1595244333063-a394c9cdd63f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80'),
(3, 'Cappucino', 6000, 1, '2020-08-12 20:20:08', '2020-08-15 11:16:11', 2, 'https://images.unsplash.com/photo-1578193658007-9e4381948aa1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),
(6, 'Red Velvet Latte', 33000, 1, '2020-08-15 11:10:09', '0000-00-00 00:00:00', 2, 'https://images.unsplash.com/photo-1461010083959-8a5727311252?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1011&q=80'),
(7, 'Choco Rhum', 28000, 1, '2020-08-15 11:11:09', '0000-00-00 00:00:00', 5, 'https://images.unsplash.com/photo-1595941973526-36f24f42aa71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80'),
(8, 'Black Forest', 30000, 1, '2020-08-15 11:11:38', '0000-00-00 00:00:00', 5, 'https://images.unsplash.com/photo-1564844536308-75c540dbf14e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80'),
(9, 'Chicken Katsu Dabu-dabu', 30000, 1, '2020-08-15 11:11:55', '0000-00-00 00:00:00', 1, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80'),
(10, 'Salmon Truffle Teriyaki', 60000, 1, '2020-08-15 11:12:28', '0000-00-00 00:00:00', 1, 'https://images.unsplash.com/photo-1560717845-968823efbee1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'),
(11, 'Wiener Schnitzel', 69000, 1, '2020-08-15 11:13:04', '0000-00-00 00:00:00', 1, 'https://images.unsplash.com/photo-1560611588-163f295eb145?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),
(13, 'Twister Metal Pancake', 24500, 1, '2020-08-15 20:41:54', '2020-08-31 21:31:33', 1, 'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80'),
(25, 'Mineral Water', 3500, 1, '2020-08-18 15:31:54', '2020-08-30 16:39:59', 2, 'https://static.republika.co.id/uploads/images/inpicture_slide/air-mineral-kemasan-aqua-_180222205334-669.jpg'),
(43, 'Omlete', 15000, 1, '2020-08-28 14:16:48', '2020-08-30 16:43:28', 1, 'https://img.qraved.co/v2/journal/wp-content/uploads/2015/03/Creamy-Salmon-Omurice-Half-Cooked_02-600x400-l.jpg'),
(45, 'Black burger', 27800, 1, '2020-08-29 18:15:03', '2020-08-31 21:21:01', 1, 'https://images.unsplash.com/photo-1536748240857-8179775c9a67?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80');

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  MODIFY `invoice_id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT untuk tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `orders_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=251;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
