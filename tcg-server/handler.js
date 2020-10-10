'use strict';
const AWS = require('aws-sdk');

const s3 = new AWS.S3();
const parser = require("lambda-multipart-parser");

module.exports.save = async event => {
  console.log('Trying to upload file with headers: ', event.headers);
  const result = await parser.parse(event);
  const { content, filename, contentType } = result.files[0];
  console.log({
    Bucket: process.env.bucket,
    Key: filename,
    Body: content,
    ContentType: contentType
  });
  try {

    // Check if file needs to be blob/buffer
    await s3.putObject({
      Bucket: process.env.bucket,
      Key: filename,
      Body: content,
      ContentType: contentType
    }).promise();
    console.log('Finished')
  } catch(error) {
    console.log('Upload file failed with error: ', error)
    return {
      statusCode: 500,
      body: error,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    }
  }
  return {
    statusCode: 200,
    body: event.body,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
};
