
-- donation vs pledges by campaign between specific dates
select up.user_id,ud.firstname 'user_name', up.campaign_id, c.name 'campaign_name' ,up.amount 'pledged_amount', sum(d.amount) 'paid_amount' from  user_pledge up left outer  join 
(
select campaign_id,user_id,date,amount from donation where date > '2018-04-01'
) d  on up.campaign_id = d.campaign_id and  up.user_id = d.user_id
join user_details ud on up.user_id = ud.id
join campaign c on up.campaign_id = c.id
group by  up.user_id,up.campaign_id,up.amount



-- user pledges paid vs unpaid by year wise
select  up.period, up.user_id,ud.firstname 'user_name', up.campaign_id, c.name 'campaign_name' ,up.amount 'pledged_amount',sum(d.amount) from (
select  concat(year,'-',month) 'period' ,campaign_id,user_id,amount from dim_month_year, user_pledge )  up left outer  join 
(
select campaign_id,user_id,date,amount from donation where date > '2018-04-01'
) d  on up.campaign_id = d.campaign_id and  up.user_id = d.user_id and up.period = date_format(d.date,'%Y-%m')
join user_details ud on up.user_id = ud.id
join campaign c on up.campaign_id = c.id
where up.period > '2018-03' and up.period < '2019-03'
and up.campaign_id = 1
group by up.period, up.user_id, up.campaign_id , up.amount
order by up.period,up.campaign_id , up.user_id




-- table to manage dimension
CREATE TABLE `dim_month_year` (
  `month` varchar(2) DEFAULT NULL,
  `year` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `dim_month_year` (`month`, `year`)
VALUES
	('01', '2017'),
	('02', '2017'),
	('03', '2017'),
	('04', '2017'),
	('05', '2017'),
	('06', '2017'),
	('07', '2017'),
	('08', '2017'),
	('09', '2017'),
	('10', '2017'),
	('11', '2017'),
	('12', '2017'),
	('01', '2018'),
	('02', '2018'),
	('03', '2018'),
	('04', '2018'),
	('05', '2018'),
	('06', '2018'),
	('07', '2018'),
	('08', '2018'),
	('09', '2018'),
	('10', '2018'),
	('11', '2018'),
	('12', '2018');

	

