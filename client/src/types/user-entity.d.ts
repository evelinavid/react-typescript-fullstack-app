type UserEntity = {
    id:number,
    email:string,
    password:string,
    name:string,
    surname:string,
    phone:string,
    companyName?: string,
    role:'ADMIN' | 'USER'
  };
  