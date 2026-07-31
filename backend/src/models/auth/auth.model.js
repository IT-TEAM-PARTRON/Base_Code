import db from "../../config/db.js";

export default class AuthUser {
  constructor({ID, USERID, PASSWORD, FULLNAME, ROLEID, DESCRIPTION})  {
    this.ID = ID;
    this.USERID = USERID;
    this.PASSWORD = PASSWORD;
    this.FULLNAME = FULLNAME;
    this.ROLEID = ROLEID;
    this.DESCRIPTION = DESCRIPTION;
  }
  static async findUserByEmail(email) {
    const [rows] = await db.query(
      'SELECT u.*, r.DESCRIPTION FROM USER u JOIN ROLE r ON u.ROLEID = r.ROLEID WHERE u.USERID = ?',
      [email],
    );
    if (!rows) return null;
    return new AuthUser(rows);
  }
}


