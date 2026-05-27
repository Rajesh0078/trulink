"use strict";

/**
 * Send a standardised success response.
 * @param {import('express').Response} res
 * @param {object} opts
 */
const sendSuccess = (
  res,
  { statusCode = 200, message = "Success", data = null, meta = null } = {},
) => {
  const body = { success: true, message };
  if (data !== null) body.data = data;
  if (meta !== null) body.meta = meta;
  return res.status(statusCode).json(body);
};

/**
 * Send a standardised error response.
 * @param {import('express').Response} res
 * @param {object} opts
 */
const sendError = (
  res,
  { statusCode = 500, message = "Internal Server Error", errors = null } = {},
) => {
  const body = { success: false, error: message };
  if (errors !== null) body.errors = errors;
  return res.status(statusCode).json(body);
};

/**
 * Send a 201 Created response.
 */
const sendCreated = (res, data, message = "Created successfully") =>
  sendSuccess(res, { statusCode: 201, message, data, success: true });

/**
 * Send a 204 No Content response.
 */
const sendNoContent = (res) => res.status(204).send();

module.exports = { sendSuccess, sendError, sendCreated, sendNoContent };
