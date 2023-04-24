export type ServiceViewModel = {
  id: number,
  title: string,
  description: string,
  price: number,
  workImage: string,
  liked: boolean
};

export type SingleServiceViewModel = {
  id: number,
  title: string,
  description: string,
  price: number,
  workImages: string[],
  phone: string
};

export type SingleServiceBody = Omit<SingleServiceViewModel, 'phone' | 'id'>;

export type UpdateServiceBody = {
  serviceId: number,
  title: string,
  description: string,
  price: number,
  workImages: string[],
};

export type UserServiceData = {
  id: string | number,
  title: string,
};

// export type ServiceDataBody = PartialRecursive
