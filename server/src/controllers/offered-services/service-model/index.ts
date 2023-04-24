import config from 'config';
import mysql from 'mysql2/promise';
import {
  SingleServiceBody, ServiceViewModel, UpdateServiceBody, UserServiceData, SingleServiceViewModel,
} from '../types';
import SQL from './sql';
import ServiceNotFound from '../service-not-found';

const getServicesCards = async (userId: number): Promise<ServiceViewModel[]> => {
  const connection = await mysql.createConnection(config.database);
  const sql = `${SQL.SELECT_ALL}`;
  const [queryResult] = await connection.query(sql, [userId]);
  connection.end();
  return queryResult as ServiceViewModel[];
};

const getSingleService = async (id: string | number): Promise<SingleServiceViewModel> => {
  const connection = await mysql.createConnection(config.database);
  const sql = `
  ${SQL.SELECT_SINGLE}
  where s.serviceId = ?
  ${SQL.GROUP_BY_SERVICEID}
  `;
  const bindings = [id];
  const [services] = await connection.query<mysql.RowDataPacket[]>(sql, bindings);
  if (services.length === 0) throw new ServiceNotFound(id);
  connection.end();
  return services[0] as SingleServiceViewModel;
};

const createService = async (
  serviceData: SingleServiceBody,
  userId: number,
): Promise<SingleServiceViewModel> => {
  const connection = await mysql.createConnection(config.database);

  const sql = `
  insert into services (title, description, price, userId) values
(?, ?, ?, ?);

set @created_service_id = last_insert_id();


insert into workimages (src, serviceId) values
${serviceData.workImages.map(() => '(?, @created_service_id)').join(',\n')};
  
${SQL.SELECT_SINGLE}
where s.serviceId = @created_service_id
${SQL.GROUP_BY_SERVICEID};
`;
  const bindings = [
    serviceData.title,
    serviceData.description,
    serviceData.price,
    userId,
    ...serviceData.workImages,
  ];
  const [queryResult] = await connection.query<mysql.RowDataPacket[]>(sql, bindings);
  const [service] = queryResult[queryResult.length - 1] as SingleServiceViewModel[];
  connection.end();
  return service;
};
const getUserServices = async (userId: number): Promise<UserServiceData[]> => {
  const connection = await mysql.createConnection(config.database);
  const sql = `
  select 
  s.title,
  s.createdAt,
  s.serviceId as id
  from services s
  where s.userId = ?
  `;
  const bindings = [
    userId,
  ];
  const [queryResult] = await connection.query(sql, bindings);
  connection.end();
  return queryResult as UserServiceData[];
};

const updateService = async (
  serviceData: UpdateServiceBody,
): Promise<SingleServiceViewModel> => {
  const connection = await mysql.createConnection(config.database);
  const sql = `
update services
set title = ?,
description = ?,
price = ?
where services.serviceId = ?;

delete from workImages
where workImages.serviceId = ?;

insert into workImages (src, serviceId) values
${serviceData.workImages.map(() => '(?, ?)').join(',\n')};

${SQL.SELECT_SINGLE}
where s.serviceId = ?
${SQL.GROUP_BY_SERVICEID}
`;
  const bindings = [
    serviceData.title,
    serviceData.description,
    serviceData.price,
    serviceData.serviceId,
    serviceData.serviceId,
    ...serviceData.workImages.reduce((prevArr, workImage) => [
      ...prevArr, workImage, String(serviceData.serviceId),
    ], [] as string[]),
    serviceData.serviceId,
    serviceData.serviceId,

  ];
  const [queryResult] = await connection.query<mysql.RowDataPacket[][]>(sql, bindings);
  const [service] = queryResult[queryResult.length - 1] as SingleServiceViewModel[];
  connection.end();
  return service;
};

const deleteService = async (serviceId: number) => {
  const connection = await mysql.createConnection(config.database);
  const sql = `
  delete from workimages
where workImages.serviceId = ?;

delete from userliked
where userliked.serviceId = ?;

delete from services 
where services.serviceId = ?;`;

  const bindings = [
    serviceId,
    serviceId,
    serviceId,
  ];

  await connection.query<mysql.RowDataPacket[][]>(sql, bindings);
  connection.end();
};

const ServiceModel = {
  getServicesCards,
  getSingleService,
  createService,
  getUserServices,
  updateService,
  deleteService,
};

export default ServiceModel;
