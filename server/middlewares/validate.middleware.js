const validate = (schema) => {
  return async (req, res, next) => {
    try {
      if (!req.body) req.body = {};
      req.body = await schema.parseAsync(req.body);

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validate;
