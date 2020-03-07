const statusCodes = {
  ok: 200,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  internalServerError: 500,
  // 400 error status codes
  fieldError: 400100,
  duplicateError: 400111,
  limitReachedError: 400200,
}

export default statusCodes;