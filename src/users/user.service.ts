import { TUser, users } from "../data";

export function findUserByEmailAndPassword(user: TUser) {
   const userFound = users.find(userCurrent => userCurrent && userCurrent.email === user.email && userCurrent.password === user.password) 
   return userFound;
}