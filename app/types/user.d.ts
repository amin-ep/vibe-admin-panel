interface IUser {
  _id: string;
  imageUrl?: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: "admin" | "owner" | "user";
  password: string;
  active: boolean;
  verified: boolean;
  verificationCode?: string;
  verificationCodeExpiryDate?: Date | string;
  candidateEmail?: string;
  updateEmailVerificationCode?: string;
  updateEmailVerificationCodeExpiryDate?: Date | string;
  emailChangedAt?: Date;
  passwordRecoverId?: string;
  passwordChangedAt?: Date | string;
}

interface IGetMeResponse {
  status: string;
  data: {
    document: IUser;
  };
}
