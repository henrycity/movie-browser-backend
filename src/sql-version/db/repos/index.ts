import { UsersRepository } from './user';

// Database Interface Extensions:
interface IExtensions {
    users: UsersRepository;
}

export { IExtensions, UsersRepository };
