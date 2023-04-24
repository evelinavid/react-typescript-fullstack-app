import mysql from 'mysql2/promise';
import config from 'config';
import BcryptService from '../services/bcrypt-service';
import { UserData, UserUpdate } from '../controllers/auth/types';
import NotFoundError from '../errors/not-found-error';

const checkEmail = async (email: string): Promise<true> => {
  const connection = await mysql.createConnection(config.database);
  const preparedSQL = `
    select 1
    from users
    where email = ?
    `;
  const bindings = [email];
  const [rows] = await connection.query<mysql.RowDataPacket[]>(preparedSQL, bindings);
  connection.end();

  if (rows.length > 0) throw new Error(`Email ${email} is taken`);
  return true;
};

const createUser = async (userData: UserData): Promise<UserEntity> => {
  const connection = await mysql.createConnection(config.database);
  const preparedSQL = `
    insert into users (email, password, name, surname, phone) values
    (?, ?, ?, ?, ?); 

    select
    userId,
    email,
    password,
    name,
    surname,
    phone
    from users 
    where users.userId = last_insert_id();
    `;
  const bindings = [
    userData.email,
    BcryptService.encrypt(userData.password),
    userData.name,
    userData.surname,
    userData.phone,

  ];

  const [queryResult] = await connection.query<mysql.RowDataPacket[][]>(preparedSQL, bindings);
  const [user] = queryResult[queryResult.length - 1] as UserEntity[];

  connection.end();
  return user;
};

const updateUser = async (userData: UserUpdate, userId: number):Promise<UserEntity> => {
  const connection = await mysql.createConnection(config.database);
  const sql = `
  update users
set name= ?, 
surname=?,
phone=?,
email=?,
image=?
where users.userId = ?;

select 
userId,
email,
password,
name,
surname,
phone,
image
from users u
where u.userId = ?

  `;
  const bindings = [
    userData.name,
    userData.surname,
    userData.phone,
    userData.email,
    userData.image,
    userId,
    userId,
  ];
  const [queryResult] = await connection.query<mysql.RowDataPacket[]>(sql, bindings);
  const [user] = queryResult[queryResult.length - 1] as UserEntity[];
  connection.end();
  return user;
};

const getUserByEmail = async (email:string):Promise<UserEntity> => {
  const connection = await mysql.createConnection(config.database);
  const preparedSQL = `
  select
  userId,
  email,
  password,
  name,
  surname,
  phone,
  image
  from users 
  where email = ?;
  `;
  const bindings = [email];
  const [users] = await connection.query<mysql.RowDataPacket[]>(preparedSQL, bindings);
  connection.end();
  if (users.length === 0) throw new NotFoundError(`User with this ${email} was not found`);

  return users[0] as UserEntity;
};

const setUserLikes = async (userId:number, serviceId:number):Promise<void> => {
  const connection = await mysql.createConnection(config.database);
  const [queryResult] = await connection.query<any[]>('Select 1 from userLiked where userId = ? and serviceId = ?', [userId, serviceId]);
  if (queryResult.length > 0) {
    await connection.query('delete from  userLiked where userId = ? and serviceId = ?;', [userId, serviceId]);
  } else {
    const sql = `
  insert into userLiked (userId, serviceId) values
  (?, ?);`;
    const bindings = [
      userId,
      serviceId,
    ];
    await connection.query(sql, bindings);
  }
  connection.end();
};

const UserModel = {
  checkEmail,
  createUser,
  updateUser,
  getUserByEmail,
  setUserLikes,
};

export default UserModel;
