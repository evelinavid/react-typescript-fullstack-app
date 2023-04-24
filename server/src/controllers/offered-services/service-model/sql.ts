const SELECT_ALL = `    select
s.serviceId,
s.title,
s.description,
s.price,
wi.src,
sl.likeCount
from services s
left join workImages wi
on s.serviceId = wi.serviceId
left join (
select
se.serviceId,
count(u.userId) as likeCount
from userLiked ul
left join users u
on ul.userId = u.userId
left join services se
on se.serviceId = ul.serviceId
where ul.userId = ?
group by se.serviceId
) as sl
on s.serviceId = sl.serviceId
WHERE wi.workImagesId IN (
    SELECT min(workImages.workImagesId) as workImagesId
    FROM workImages
    GROUP BY workImages.serviceId
) OR wi.src IS NULL
order by s.serviceId`;

const SELECT_SINGLE = `
select
s.serviceId,
s.title,
s.description,
s.price,
u.phone,
u.name,
s.userId,
json_arrayagg(wi.src) as images
from services s
left join workImages wi
on s.serviceId = wi.serviceId
left join users u
on u.userId = s.userId
`;

const GROUP_BY_SERVICEID = 'group by s.serviceId';

const SQL = {
  SELECT_ALL,
  SELECT_SINGLE,
  GROUP_BY_SERVICEID,
} as const;
export default SQL;
