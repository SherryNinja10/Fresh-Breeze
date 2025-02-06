CREATE TABLE customer (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    passcode VARCHAR(200)
);

CREATE TABLE barber (
    barber_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    passcode VARCHAR(200)
);

CREATE TABLE appointment (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    barber_id INT,
    details VARCHAR(200) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    decision enum('pending', 'approved', 'rejected') NOT NULL,
    viewed BOOLEAN NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (barber_id) REFERENCES barber(barber_id)
);

INSERT INTO customer(first_name, last_name, email, passcode) VALUE 
	("Jeff", "Lion", "jeffy@gmail.com", "test1"),
    ("Bob", "Fish", "bobby@gmail.com", "test2"),
    ("John", "Doe", "JohnDoe@gmail.com", "test3");