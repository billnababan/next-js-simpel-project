
// ini buat database lewat code sql//

CREATE DATABASE project_next_js;

use project_next_js;

//ini tablee yang dibuat//

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);