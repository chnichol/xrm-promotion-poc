import { Service } from './serviceBuilder';

export default interface Auth extends Service<'Auth', Auth> {

}

export class AuthHandler implements Auth {
    public readonly name = 'Auth';
    
    public init = () => new AuthHandler();
}