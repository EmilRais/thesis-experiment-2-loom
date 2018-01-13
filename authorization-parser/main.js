import { RequestHandler } from "express";


export prepareOperation = (operation) => {
  return (req, res, next) => {
    res.locals.auth = JSON.parse(req.get('authorization'));
    next();
  };
};
