export type TUser = {
    id: string;
    email: string;
    password: string;
}


export let users: TUser[] = [{
    id: '6c389710-55d8-455f-9e85-1f39c85bea18',
    email: 'abcd@jiji.com',
    password: 'abcd'
}]

export function updateUser(newUsers: TUser[]) {
    users = newUsers
    return users
}

export type TPayload = {id: string}

export const secret = /** JWT_SECRET dans le .env , package: dotenv*/;