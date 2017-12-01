CREATE TABLE organization 
  ( 
     id         BIGINT auto_increment NOT NULL PRIMARY KEY, 
     name       VARCHAR(500) NOT NULL, 
     status     VARCHAR(1) NOT NULL DEFAULT 'A', 
     created_at DATETIME NOT NULL, 
     created_by BIGINT NOT NULL, 
     updated_at DATETIME, 
     updated_by BIGINT 
  ); 

CREATE TABLE user 
  ( 
     id         BIGINT auto_increment NOT NULL PRIMARY KEY, 
     firstname  VARCHAR(500) NOT NULL, 
     lastname   VARCHAR(500), 
     doorno     VARCHAR(25), 
     street     VARCHAR(500), 
     area       VARCHAR(100), 
     city       VARCHAR(100), 
     state      VARCHAR(100), 
     country    VARCHAR(100), 
     phone      VARCHAR(100), 
     email      VARCHAR(100), 
     org_id     BIGINT, 
     status     VARCHAR(1) NOT NULL DEFAULT 'A', 
     created_at DATETIME NOT NULL, 
     created_by BIGINT NOT NULL, 
     updated_at DATETIME, 
     updated_by BIGINT 
  ); 

CREATE TABLE user_login 
  ( 
     id         BIGINT auto_increment NOT NULL PRIMARY KEY, 
     username   VARCHAR(500) NOT NULL, 
     password   VARCHAR(500) NOT NULL, 
     user_id    BIGINT NOT NULL, 
     last_login DATETIME, 
     status     VARCHAR(1) NOT NULL DEFAULT 'A', 
     created_at DATETIME NOT NULL, 
     created_by BIGINT NOT NULL, 
     updated_at DATETIME, 
     updated_by BIGINT 
  ); 

CREATE TABLE role 
  ( 
     id          BIGINT auto_increment NOT NULL PRIMARY KEY, 
     name        VARCHAR(500) NOT NULL, 
     description VARCHAR(500), 
     status      VARCHAR(1) NOT NULL DEFAULT 'A', 
     created_at  DATETIME NOT NULL, 
     created_by  BIGINT NOT NULL, 
     updated_at  DATETIME, 
     updated_by  BIGINT 
  ); 

CREATE TABLE permission 
  ( 
     id          BIGINT auto_increment NOT NULL PRIMARY KEY, 
     name        VARCHAR(500) NOT NULL, 
     description VARCHAR(500), 
     status      VARCHAR(1) NOT NULL DEFAULT 'A', 
     created_at  DATETIME NOT NULL, 
     created_by  BIGINT NOT NULL, 
     updated_at  DATETIME, 
     updated_by  BIGINT 
  ); 

CREATE TABLE role_permission 
  ( 
     id            BIGINT auto_increment NOT NULL PRIMARY KEY, 
     role_id       BIGINT NOT NULL, 
     permission_id BIGINT NOT NULL, 
     status        VARCHAR(1) NOT NULL DEFAULT 'A', 
     created_at    DATETIME NOT NULL, 
     created_by    BIGINT NOT NULL, 
     updated_at    DATETIME, 
     updated_by    BIGINT 
  ); 

CREATE TABLE config_master 
  ( 
     id         BIGINT auto_increment NOT NULL PRIMARY KEY, 
     module     VARCHAR(100) NOT NULL, 
     name       VARCHAR(100) NOT NULL, 
     value      VARCHAR(100), 
     status     VARCHAR(1) NOT NULL DEFAULT 'A', 
     created_at DATETIME NOT NULL, 
     created_by BIGINT NOT NULL, 
     updated_at DATETIME, 
     updated_by BIGINT 
  ); 

CREATE TABLE fundraising 
  ( 
     id           BIGINT auto_increment NOT NULL PRIMARY KEY, 
     name         VARCHAR(500) NOT NULL, 
     description  TEXT, 
     type         BIGINT NOT NULL, 
     is_recurring BIT, 
     start_date   DATETIME, 
     end_date     DATETIME, 
     user_id      BIGINT, 
     status       VARCHAR(1) NOT NULL DEFAULT 'A', 
     created_at   DATETIME NOT NULL, 
     created_by   BIGINT NOT NULL, 
     updated_at   DATETIME, 
     updated_by   BIGINT 
  ); 

CREATE TABLE user_pledges 
  ( 
     id             BIGINT auto_increment NOT NULL PRIMARY KEY, 
     user_id        BIGINT NOT NULL, 
     fundraising_id BIGINT NOT NULL, 
     status         VARCHAR(1) NOT NULL DEFAULT 'A', 
     created_at     DATETIME NOT NULL, 
     created_by     BIGINT NOT NULL, 
     updated_at     DATETIME, 
     updated_by     BIGINT 
  ); 

CREATE TABLE fundraising_transaction 
  ( 
     id             BIGINT auto_increment NOT NULL PRIMARY KEY, 
     type           BIGINT NOT NULL, 
     payer_id       BIGINT NOT NULL, 
     fundraising_id BIGINT NOT NULL, 
     collector_id   BIGINT NOT NULL, 
     amount         FLOAT NOT NULL, 
     mode           BIGINT NOT NULL, 
     date           DATETIME NOT NULL, 
     status         VARCHAR(1) NOT NULL DEFAULT 'A', 
     created_at     DATETIME NOT NULL, 
     created_by     BIGINT NOT NULL, 
     updated_at     DATETIME, 
     updated_by     BIGINT 
  ); 