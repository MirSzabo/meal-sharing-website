### :zap: Installing
To install run `npm install`

## 🎈 Usage <a name="usage"></a>
To run `npm run dev`

## ⛏️ Built Using <a name = "built_using"></a>
- [Mysql](https://www.npmjs.com/package/mysql) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

DB tables can be created like so:
```
CREATE TABLE `meal` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`title` varchar(255) NOT NULL,
	`description` text NULL DEFAULT NULL,
	`location` varchar(255) NOT NULL,
	`when` DATETIME NOT NULL,
	`max_reservations` int(10) unsigned NOT NULL,
	`price` DECIMAL(10, 2) NOT NULL,
	`created_date` DATETIME NOT NULL DEFAULT NOW(),
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `reservation` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`number_of_guests` int(10) unsigned NOT NULL,
	`meal_id` int(10) unsigned NOT NULL,
	`created_date` DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (`id`),
FOREIGN KEY (`meal_id`) REFERENCES `meal` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `review` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`title` varchar(255) NOT NULL,
	`description` text NULL DEFAULT NULL,
    `meal_id` int(10) unsigned NOT NULL,
    `name` varchar(255) DEFAULT NULL,
    `stars` int(10) unsigned NOT NULL,
	`created_date` DATETIME,
PRIMARY KEY (`id`),
FOREIGN KEY (`meal_id`) REFERENCES `meal` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```
