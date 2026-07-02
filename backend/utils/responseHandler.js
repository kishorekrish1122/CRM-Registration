const responseHandler = (
  res,
  statusCode,
  success,
  message,
  data = null
) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};

module.exports = responseHandler;