CREATE TABLE cars (
    link TEXT PRIMARY KEY NOT NULL,
    year INTEGER,
    make TEXT,
    model TEXT,
    drivetrain TEXT,
    transmission TEXT,
    price NUMERIC
    
    CHECK (drivetrain in ('RWD', 'FWD', 'AWD', '4WD')),
    CHECK (transmission in ('Auto', 'Manual'))
);

INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/bmw/3-series/used/#vip=28914558', 1989, 'BMW', '325e', 'RWD', 'Auto', 5000
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/honda/prelude/used/#vip=31576173', 2001, 'Honda', 'Prelude', 'FWD', 'Manual', 6500
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/ford/f-350/used/#vip=28481794', 2022, 'Ford', 'F350', '4WD', 'Auto', 68979
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/mercedes-benz/190/used/#vip=30768626', 1987, 'Mercedes-Benz', '190e', 'RWD', 'Auto', 10900
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/toyota/camry/#vip=28923348', 2017, 'Toyota', 'Camry', 'FWD', 'Auto', 17800
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/datsun/z-series/#vip=31127924', 1974, 'Datsun', '260z', 'RWD', 'Manual', 80000
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/toyota/mr-2/#vip=28951935', 1991, 'Toyota', 'MR2', 'RWD', 'Auto', 25000
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/mazda/rx-8/used/#vip=31177633', 2009, 'Mazda', 'RX-8', 'RWD', 'Manual', 7300
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/lincoln/mark-series/used/#vip=31502527', 1978, 'Lincoln', 'Mark V', 'RWD', 'Auto', 6000
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/plymouth/scamp/#vip=28889269', 1971, 'Plymouth', 'Scamp', 'RWD', 'Auto', 28000
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/dodge/challenger/used/#vip=31563272', 2017, 'Dodge', 'Challenger SRT', 'RWD', 'Auto', 49900
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/dodge/ram-1500/used/#vip=31564375', 2000, 'Dodge', 'Ram 1500', 'RWD', 'Auto', 4350
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/minivan/used/#vip=31484044', 2000, 'Subaru', 'Sambar', 'RWD', 'Auto', 10750
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/subaru/impreza-wrx-sti/#vip=28895902', 2002, 'Subaru', 'Impreza WRX STi', 'AWD', 'Manual', 3500
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/tesla/model-3/#vip=28966825', 2019, 'Tesla', 'Model 3 Performance', 'AWD', 'Auto', 54000
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/sedan/used/#vip=31523473', 2022, 'McLaren', '720S Performance', 'RWD', 'Auto', 388888
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/volvo/940/#vip=31574232', 1992, 'Volvo', '940 Turbo', 'AWD', 'Auto', 2200
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/jaguar/used/#vip=31325051', 1984, 'Jaguar', 'XJS', 'RWD', 'Auto', 7400
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/lamborghini/urus/#vip=30816076', 2022, 'Lamborghini', 'Urus', 'AWD', 'Auto', 334800
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/porsche/911/#vip=30723459', 2023, 'Porsche', '811', 'RWD', 'Manual', 724975
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/bmw/m3/used/#vip=31536441', 2015, 'BMW', 'M3', 'RWD', 'Manual', 56000
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/bmw/5-series/used/#vip=31425303', 1989, 'BMW', '525i', 'RWD', 'Manual', 4100
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/bmw/z3/used/#vip=28305188', 1999, 'BMW', 'Z3', 'RWD', 'Manual', 14000
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/bmw/m3/used/#vip=30624424', 2001, 'BMW', 'M3', 'RWD', 'Manual', 35900
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/bmw/m2/#vip=30667235', 2015, 'BMW', 'M235i', 'RWD', 'Manual', 29907
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/mercedes-benz/c-class/#vip=28935282', 2018, 'Mercedes-Benz', 'AMG C63 S', 'RWD', 'Auto', 68000
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/infiniti/g35/used/#vip=31473211', 2009, 'Infiniti', 'G35', 'RWD', 'Manual', 20999
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/toyota/tacoma/#vip=28888055', 2021, 'Toyota', 'Tacoma', '4WD', 'Auto', 55000
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/genesis/g90/#vip=28581854', 2023, 'Genesis', 'G90', 'AWD', 'Auto', 115000
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/jeep/grand-cherokee/#vip=28581855', 2023, 'Jeep', 'Grand Cherokee', '4WD', 'Auto', 67180
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/jeep/wrangler/used/#vip=26074419', 2018, 'Jeep', 'Wrangler', '4WD', 'Auto', 47998
);
INSERT INTO cars (link, year, make, model, drivetrain, transmission, price) VALUES (
    'https://www.kijijiautos.ca/cars/gmc/sierra-3500/used/#vip=29867693', 2021, 'GMC', 'Sierra 3500HD SLT', '4WD', 'Auto', 99900
);
