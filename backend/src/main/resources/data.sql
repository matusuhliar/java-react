INSERT INTO `api_role` (`id`, `key`, `name`) VALUES
(1, 'ADMIN', 'Administrátor'),
(2, 'USER', 'Užívateľ');


INSERT INTO `api_user` (`id`, `email`, `name`, `password`) VALUES
(1, 'matus.uhliar@gmail.com', 'Matúš Uhliar', '$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6'),
(2, 'tuhliar@gmail.com', 'Tomáš Uhliar', '$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6');


INSERT INTO `api_user_to_api_role` (`role_id`, `user_id`) VALUES
(1, 1),
(2, 1);

