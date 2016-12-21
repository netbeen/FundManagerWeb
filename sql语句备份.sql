CREATE TABLE distribution(
   日期 text PRIMARY KEY NOT NULL,
   现金 real NOT NULL,
   活期存款 real NOT NULL,
   货币基金 real NOT NULL,
   招财宝 real NOT NULL,
   陆金所 real NOT NULL,
   人人贷 real NOT NULL,
   债券基金 real NOT NULL,
   指数基金 real NOT NULL
);

                                日期           现金   活期存款    货币基金  招财宝     陆金所    人人贷    债券基金 指数基金
insert into distribution values('2014-12-07', 180,   2735.98,  2261.06, 22609.10, 0,       0,       0,      0);
insert into distribution values('2014-12-29', 32.6,  2740.06,  2185.40, 24284.91, 0,       0,       0,      0);
insert into distribution values('2015-01-19', 56.6,  2739.91,  2570.84, 25284.91, 0,       0,       0,      0);
insert into distribution values('2015-02-01', 232.2, 2739.91,  2554.86, 25284.91, 0,       0,       0,      0);
insert into distribution values('2015-02-07', 132.2, 2739.91,  3254.87, 25284.91, 1000,    0,       0,      0);
insert into distribution values('2015-02-12', 131.7, 2373.91,  2242.30, 25284.91, 1005,    0,       0,      0);
insert into distribution values('2015-02-16', 122.7, 2873.91,  4023.10, 25284.91, 1005,    1000,    0,      0);
insert into distribution values('2015-02-21', 118.7, 2873.91,  3044.03, 25284.91, 2000,    1000,    0,      0);
insert into distribution values('2015-03-04', 104.4, 2462.88,  4523.91, 25284.91, 2050,    2000,    0,      0);
insert into distribution values('2015-03-11', 86.4,  2452.88,  5027.83, 25284.91, 2050,    3001,    0,      0);

insert into distribution values('2015-04-10', 83.9,  2455.20,  3822.79, 25284.91, 2050,    5605.23, 0,      0);
insert into distribution values('2015-05-02', 50.4,  1055.20,  2893.48, 30284.91, 2000,    5638.51, 0,      0);
insert into distribution values('2015-05-18', 280.1, 1055.20,  4300.01, 30284.91, 2000,    5697.83, 0,      0);
insert into distribution values('2015-06-10', 212.3, 1055.20,  247.40,  30284.91, 2000,    10313.32,0,      0);
insert into distribution values('2015-06-21', 171.3, 1056.50,  2260.13, 28284.91, 2001.52, 10697.98,0,      0);
insert into distribution values('2015-07-03', 160.1, 1056.50,  2020.25, 26284.91, 2000.00, 17554.94,0,      0);
insert into distribution values('2015-07-14', 149.9, 1056.50,  1926.36, 26284.91, 2000.00, 18948.71,0,      0);
insert into distribution values('2015-07-20', 133.7, 1046.50,  1859.10, 18284.93, 2000.00, 26945.78,0,      0);
insert into distribution values('2015-08-05', 89.2,  1045.50,  2001.71, 18284.93, 2000.00, 27334.66,0,      0);
insert into distribution values('2015-08-13', 84.6,  1045.50,  2037.87, 18284.93, 2000.00, 28544.73,0,      0);
insert into distribution values('2015-09-14', 42.3,  903.5,    1874.61, 18284.93, 2000.00, 29019.44,0,      0);

insert into distribution values('2015-09-26', 98.6,  904.41,   1328.05, 18284.93, 2000.00, 30107.82,0,      0);
insert into distribution values('2015-10-16', 11.7,  500,      800.06,  18284.93, 3000.93, 32122.66,0,      0);
insert into distribution values('2015-11-05', 36.4,  500,      796.78,  18284.93, 3003.52, 34110.79,0,      0);
insert into distribution values('2015-11-17', 14.8,  500,      520.31,  18284.93, 3801.98, 34309.07,0,      0);
insert into distribution values('2015-12-08', 82.1,  500,      229.68,  18284.93, 3254.23, 35271.20,0,      200);
insert into distribution values('2015-12-18', 69.8,  500,      749.90,  18284.93, 3555.84, 36603.55,0,      408.20);
insert into distribution values('2016-01-07', 11.3,  500,      99.87,   18284.93, 3242.33, 36813.07,0,      391.58);
insert into distribution values('2016-01-21', 17.3,  500,      360.70,  17284.92, 4941.92, 37048.99,0,      784.71);
insert into distribution values('2016-01-27', 171.2, 500,      566.36,  17284.92, 5744.10, 38104.77,0,      755.15);
insert into distribution values('2016-02-15', 293.6, 500,      1305.09, 17284.92, 7554.39, 38356.92,0,      760.50);
insert into distribution values('2016-03-10', 240.9, 500,      1648.07, 17284.92, 2073.85, 38636.57,0,      1057.62);
insert into distribution values('2016-03-22', 142.2, 0,        436.95,  17284.92, 601.51,  42408.00,0,      922.02);
insert into distribution values('2016-04-01', 110.2, 500,      989.21,  17284.92, 6102.22, 42451.76,0,      1433.65);
insert into distribution values('2016-04-13', 20.2,  500,      752.21,  17284.92, 6811.44, 42656.30,0,      1463.79);

insert into distribution values('2016-05-01', 21.8,  368.39,   748.62,  17284.92, 11662.34,42890.55,0,      3401.26);
insert into distribution values('2016-05-12', 25,    500.00,   1060.78, 17284.92, 11677.89,73270.14,0,      3362.05);
insert into distribution values('2016-05-31', 22.5,  500.00,   5118.13, 17284.92, 7717.93, 73525.00,0,      4161.35);
insert into distribution values('2016-06-14', 32.6,  500.00,   456.34,  17284.92, 2314.60, 82609.62,0,      4400.05);
insert into distribution values('2016-06-30', 27.6,  500.00,   3320.25, 17284.92, 2318.96, 82814.15,0,      6105.46);
insert into distribution values('2016-07-21', 23.7,  5.00,     1149.42, 17284.92, 2324.63, 83478.86,0,      3217.75);
insert into distribution values('2016-07-29', 25.7,  500.00,   7200.70, 17284.92, 6441.78, 83576.32,0,      6465.45);
insert into distribution values('2016-08-19', 25.7,  498.00,   1714.47, 17284.92, 6455.72, 84194.58,0,      6617.10);
insert into distribution values('2016-08-31', 43.3,  500.00,   8180.69, 17284.92, 10257.36,84347.85,0,      8578.21);
insert into distribution values('2016-09-12', 49.3,  500.00,   977.19,  17284.92, 12071.57,84756.29,0,      8447.10);
insert into distribution values('2016-09-30', 49.3,  500.00,   5847.96, 17284.92, 12094.99,85120.86,1000,   13406.52);


CREATE TABLE distribution_type(
   target text PRIMARY KEY NOT NULL,
   type text NOT NULL
);

insert into distribution_type values('现金','现金');
insert into distribution_type values('活期存款','存款');
insert into distribution_type values('货币基金','公募基金');
insert into distribution_type values('招财宝','P2P');
insert into distribution_type values('陆金所','互联网理财');
insert into distribution_type values('人人贷','P2P');
insert into distribution_type values('债券基金','公募基金');
insert into distribution_type values('指数基金','公募基金');
