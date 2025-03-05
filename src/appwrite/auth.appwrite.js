import { Client, Account, ID } from "appwrite";
import config from "../conf/config.js";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectID);

    this.account = new Account(this.client);
  }

  // Sign up or create user account
  async createAccount({ name, email, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method to directly login the user
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Error in creating the account", error);
      throw error;
    }
  }

  //   login the user
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Error in logging in the user", error);
      throw error;
    }
  }

  //   get current user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Error in getting the current user", error);
      // throw error;
    }
    return null;
  }

  //   logout the user
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Error in logging out", error);
    }
  }
}

const authService = new AuthService();

export default authService;
