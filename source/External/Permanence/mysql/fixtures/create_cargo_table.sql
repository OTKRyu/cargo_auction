CREATE TABLE CARGO (
  CARGO_ID INT PRIMARY KEY,
  NAME VARCHAR(255),
  TRANSPORT_DUE_DATE DATE,
  DESCRIPTION TEXT,
  OWNER_ID INT,
  TRUCKER_ID INT,
  STATUS VARCHAR(255),
  FOREIGN KEY(OWNER_ID) REFERENCES OWNER(OWNER_ID) ON DELETE CASCADE,
  FOREIGN KEY(TRUCKER_ID) REFERENCES TRUCKER(TRUCKER_ID) ON DELETE CASCADE
)