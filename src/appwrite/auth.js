import conf from '../conf/conf'
import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl);
        this.client.setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login(email, password);
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("AuthService -> createAccount -> catch ", error);
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("AuthService -> login -> catch ", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("AuthService -> getCurrentUser -> catch ", error);
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSession();
        } catch (error) {
            console.log("AuthService -> logout -> catch ", error);
        }
    }
}

const authService = new AuthService()
export default authService