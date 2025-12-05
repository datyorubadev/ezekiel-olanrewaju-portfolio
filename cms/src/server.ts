import 'dotenv/config';
import express from 'express';
import payload from 'payload';
import config from './payload.config.js';

const app = express();

const start = async () => {
  // Initialize Payload
  await payload.init({
    config,
  });

  // Add your own express routes here

  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
};

start();
