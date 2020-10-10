'use strict';

module.exports.save = async event => {
  return {
    statusCode: 200,
    body: event.body,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
};
