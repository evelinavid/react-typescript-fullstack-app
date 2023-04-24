type UserViewModel = {
  userId:number,
  email:string,
  name:string,
  surname:string,
  phone:string,
  companyName?: string,
  image:string | null,
  role:'ADMIN' | 'USER'

};
