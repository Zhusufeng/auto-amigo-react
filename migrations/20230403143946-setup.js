"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  // Create table USER
  db.runSql(`
    CREATE TABLE USER (
      id int NOT NULL AUTO_INCREMENT,
      email varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
      password varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
      updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  `);

  // Create table GAS_LOG
  db.runSql(`
    CREATE TABLE GAS_LOG (
      id int NOT NULL AUTO_INCREMENT,
      userId int DEFAULT NULL,
      previousMileage int NOT NULL,
      currentMileage int NOT NULL,
      gallons float NOT NULL,
      pricePerGallon float NOT NULL,
      updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY userId (userId),
      CONSTRAINT GAS_LOG_userId__USER_id FOREIGN KEY (userId) REFERENCES USER (id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  `);
};

exports.down = function (db) {
  // Drop table GAS_LOG
  db.runSql(`
    DROP TABLE GAS_LOG
  `);

  // Drop table USER
  db.runSql(`
    DROP TABLE USER
  `);
};

exports._meta = {
  version: 1,
};
