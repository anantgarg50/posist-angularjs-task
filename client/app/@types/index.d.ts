interface Headquarter {
  _id?: string,
  name?: string,
  location?: string,
  branches?: Branch[]
}

interface Branch {
  _id?: string,
  name?: string,
  location?: string,
  headquarter?: Headquarter,
  cars?: Car[],
  bookings?: Booking[]
}

interface Car {
  _id?: string,
  operatedBy?: Branch,
  drivenBy?: Driver,
  manufacturer?: string,
  model?: string,
  seatingCapacity?: number,
  ratePerKilometer?: number,
  hourlyRate?: number,
  carRegNumber?: string,
  bookings?: Booking[],
  currentlyBooked?: boolean
}

interface Driver {
  _id?: string,
  name?: string,
  age?: number,
  permanentAddress?: string,
  assignedCar?: Car,
  bookings?: Booking[]
}

interface Booking {
  _id?: string,
  customerName?: string,
  carBooked?: Car,
  pickupAddress?: string,
  startTime?: string,
  branch?: any,
  ratePerKilometer?: number,
  driverDetails?: Driver,
  hourlyRate?: number,
  endTime?: string,
  kmsTravelled?: number,
  billedAmount?: number
}

interface UserRegData {
  name: string,
  email: string,
  password: string
}

interface UserLoginData {
  email: string,
  password: string
}

interface User {
  _id?: string,
  name?: string,
  email?: string,
  role?: UserRoles
}

declare enum UserRoles {
  admin = 1,
  user = 2
}