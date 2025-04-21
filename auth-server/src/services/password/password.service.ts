import bcrypt from "bcryptjs";
import PasswordValidator from "password-validator";

export class PasswordService {
  static readonly schema = PasswordService.initialise();

  private static initialise() {
    const schema = new PasswordValidator();
    schema.is().min(8).is().max(100);
    return schema;
  }

  static readonly PASSWORD_BLACK_LIST = [
    "123456",
    "123456789",
    "qwerty",
    "password",
    "111111",
    "12345678",
    "abc123",
    "1234567",
    "password1",
    "12345",
  ];

  static validatePassword(password: string) {
    return (
      this.schema.validate(password) &&
      !this.PASSWORD_BLACK_LIST.includes(password)
    );
  }

  static async createHashedPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
