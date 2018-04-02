import { Image } from "./image";

export class User {
    public Id: number;
    public Name: string;
    public Login: string;
    public Email: string;
    public PhotoUser: string;
    public Password: string;
    public PhotoUserName: string;
   // public ConfirmPassword: string;
    public ConfirmPassword: string;
    public Images: Image [];
  
  }
