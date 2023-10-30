CREATE TABLE IF NOT EXISTS user (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  firstName varchar(50) NOT NULL,
  lastName varchar(50) NOT NULL,
  email varchar(50) NOT NULL,
  phoneNumber varchar(15),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

CREATE TABLE IF NOT EXISTS room (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  roomName varchar(50) NOT NULL,
  roomNumber varchar(50) NOT NULL,
  capacity int,
  category ENUM('lecture-hall', 'lab', 'computer-lab', 'study-hall', 'office-space', 'library')
);

CREATE TABLE IF NOT EXISTS userRole (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userRole ENUM('administrative', 'privileged', 'regular', 'guest'),
  userId INT,
  FOREIGN KEY (userId) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS reservation (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  reservationName VARCHAR(50) DEFAULT 'untitled reservation',
  startReservationTime DATETIME NOT NULL,
  endReservationTime DATETIME NOT NULL,
  reservationCreationDate TIMESTAMP NOT NULL DEFAULT NOW(),
  roomId INT,
  FOREIGN KEY (roomId) REFERENCES room(id)
);

CREATE TABLE IF NOT EXISTS unavailableUserPeriod (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  creationDate TIMESTAMP NOT NULL DEFAULT NOW(),
  userId INT,
  FOREIGN KEY (userId) REFERENCES user(id),
  startTime DATETIME NOT NULL,
  endTime DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS unavailableRoomPeriod (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  creationDate TIMESTAMP NOT NULL DEFAULT NOW(),
  roomId INT,
  FOREIGN KEY (roomId) REFERENCES room(id),
  startTime DATETIME NOT NULL,
  endTime DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS invitation (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  creationDate TIMESTAMP NOT NULL DEFAULT NOW(),
  userInvitee INT NOT NULL,
  userInvited INT NOT NULL,
  reservationId INT NOT NULL,
  FOREIGN KEY (userInvitee) REFERENCES user(id),
  FOREIGN KEY (userInvited) REFERENCES user(id),
  FOREIGN KEY (reservationId) REFERENCES reservation(id)
);

CREATE TABLE IF NOT EXISTS notes (
  id integer PRIMARY KEY AUTO_INCREMENT,
  creationDate TIMESTAMP NOT NULL DEFAULT NOW(),
  title VARCHAR(255) NOT NULL,
  contents TEXT NOT NULL,
  noteAuthor INT,
  FOREIGN KEY (noteAuthor) REFERENCES user(id)
);