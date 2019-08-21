import User from '../model/user';
// import Session from '../model/session';
import jwt from 'jsonwebtoken';
import hash from 'bcrypt-nodejs';
import userSchema from '../controller/validation/userValidation';
// import sessionSchema from '../controller/validation/sessionValidation'
import dotenv from 'dotenv';

dotenv.config();

class userController {


  //SignUp
  static signUp(req, res) {
    const { email, firstname, lastname, password, address, status, bio, occupation, expertise } = req.body;
    const DuplicateUser = User.find(u => u.email === req.body.email);
    
    if (!DuplicateUser) {
      req.body.id = User.length + 1;
      const id = req.body.id;
      req.body.password = hash.hashSync(req.body.password);
      const hashPassword = req.body.password;
      const user = req.body;
      const newUser = userSchema.validate({
        userId: id, email: email, firstname: firstname, lastname: lastname, password: hashPassword, bio: bio, address: address, occupation: occupation, expertise: expertise, status: status
      });
      if (newUser.error) { return res.status(400).json({ status: 400, error: newUser.error.details[0].message }); }
      User.push(user);
      const token = jwt.sign({ id: user.id, email, firstname, lastname, address, status }, process.env.API_SERCRET_KEY);
      res.status(201).json(
        {
          status: 201,
          message: 'User created successfully',
          data: user,
          token: token
        });
      // console.log(token);

    } else {
      res.status(401).json({
        status: 401,
        error: "Email already exist"
      });
    }
  }

}

export default userController;