import { Request, Response } from "express";
import { getRepository, QueryFailedError } from "typeorm";
import * as Yup from "yup";
import User from "../models/User";
import userView from "../views/UserView";
import crypto from "../config/crypto";
import token from "../config/token";
import guid from '../config/guid';
import mail from "../config/mail";

interface UserDeleteResponse {
  affected: number;
}

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

interface tokenResponse {
  id: string,
}

export default {
  // REGISTER USER
  async create(req: Request, res: Response) {
    console.log("POST /users  at " + Date());
    try {
      const { name, email, password, description, photoUrl } = req.body;

      const data = {
        id: guid(),
        name,
        email,
        password: await crypto.hash(password),
        description,
        photoUrl,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      };

      const schema = Yup.object().shape({
        id: Yup.string().required(),
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        description: Yup.string().required(),
        photoUrl: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const usersRepository = getRepository(User);
      const user = usersRepository.create(data);

      const accessToken = token.sign({ id: user.id });
      const refreshToken = token.signRefreshToken({ id: user.id });

      //registrar login
      user.lastLogin = new Date(Date.now());
      
      await usersRepository.save(user);
      return res.status(201).json({
        // user: userView.render(user),
        id: user.id,
        accessToken,
        refreshToken
      });
    } catch (err) {
      if (err instanceof QueryFailedError) {
        return res.status(400).json({
          message: "Failed to create new user, please try again later",
        });
      }
      return res.status(400).json(err);
    }
  },

  // AUTHENTICATE USER
  async authenticate(req: Request, res: Response) {
    try {
      const usersRepository = getRepository(User);
      const { email, password } = req.body;

      const user = await usersRepository.findOneOrFail({
        where: { email: email },
      });

      console.log(`POST /auth by ${user.id} at ` + Date());

      if (user && user.id !== undefined) {
        const isValidPassword = await crypto.compare(password, user.password);

        if (!isValidPassword) {
          return res.status(401).json({
            message: `Failed to authenticate user ${email}`,
          });
        }

        const accessToken = token.sign({ id: user.id });
        const refreshToken = token.signRefreshToken({ id: user.id });

        //registrar login
        user.lastLogin = new Date(Date.now());

        usersRepository.save(user);

        return res.status(200).json({
          id: user.id,
          accessToken,
          refreshToken,
        });
      }

      return res.status(401).json({
        message: `Failed to authenticate user ${email}`,
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  // Refresh Token
  async refresh_token(req: Request, res: Response) {
    try {
      
      const { refreshToken } = req.body;
      if(!refreshToken) throw new Error("Bad Request");
      
      const user = await token.verifyRefreshToken(refreshToken) as tokenResponse;
      
      if(!user) throw new Error("Bad Request");
      const accessToken = token.sign({ id: user.id });
      const newRefreshToken = token.sign({ id: user.id });
      
      res.status(200).json({
        accessToken,
        refreshToken: newRefreshToken
      });

    } catch (error) {
      res.status(400).json({
        error: `Failed to refresh token: ${error}`
      });
    }
  },

  // Forgot Password 
  async forgot_password (req: Request, res: Response) {
    const { email } = req.body;
    if(!email) 
      res.status(400).json({
        error: "Bad Request"
      });
    
    if(!mail.validateEmail(email)) 
      res.status(400).json({
        error: "Email invalid"
      });
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOneOrFail({
      where: { email: email },
    });

    const resetToken = token.signResetToken({id: user.id});
    usersRepository.save(user);

    mail.sendResetToken(email, resetToken);
    res.status(200).json({
      msg: "Link has been sent to your email address"
    });
  },

  // UPDATE USER'S PASSWORD ( Require Authentication )
  async update_password(req: Request, res: Response) {},

  // UPDATE USER ( Require Authentication )
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { description, name } = req.body;
      const userId = req.userId;

      if (id !== userId) {
        return res.status(403).json({
          error: `Failed, Not Authorized`,
        });
      }

      console.log(`PUT /users/${id} at ` + Date());

      const usersRepository = getRepository(User);
      const user = await usersRepository.findOneOrFail(id);

      user.description = description;
      user.name = name;
      user.updatedAt = new Date(Date.now());

      await usersRepository.save(user);
      return res
        .status(200)
        .json({ message: "User has been successfuly updated" });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  // CHANGE USER'S PHOTO ( Require Authentication )
  async change_photo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { photoUrl } = req.body;
      const userId = req.userId;

      if (id !== userId) {
        return res.status(400).json({
          error: `Failed, Not Authorized`,
        });
      }

      console.log(`PUT /users/${id} at ` + Date());

      const usersRepository = getRepository(User);
      const user = await usersRepository.findOneOrFail(id);

      user.photoUrl = photoUrl;
      user.updatedAt = new Date(Date.now());

      await usersRepository.save(user);
      return res.status(200).json({ message: "Photo updated" });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  // DELETE USER ( Require Authentication )
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usersRepository = getRepository(User);
      const userId = req.userId;

      if (id !== userId) {
        return res.status(401).json({
          error: `Failed, Not Authorized`,
        });
      }

      console.log(`DELETE /users/${id} at ` + Date());

      const user = (await usersRepository.delete(id)) as UserDeleteResponse;

      if (user.affected <= 0) {
        return res.status(400).json({
          message: "User not found!",
        });
      }
      return res.status(200).json({
        message: user,
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  // SHOW USER
  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usersRepository = getRepository(User);

      console.log(`GET /users/${id} at ` + Date());

      const user = await usersRepository.findOneOrFail(id);
      return res.status(200).json(userView.render(user));
    } catch (err) {
      return res.status(400).json(err);
    }
  },
};
