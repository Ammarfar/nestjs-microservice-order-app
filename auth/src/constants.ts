export const appConstants = {
  APP_PORT: process.env.APP_PORT ?? 3000,

  JWT_SECRET: process.env.JWT_SECRET ?? 'jwt-secret',

  ORDER_APP_URL: process.env.ORDER_APP_URL ?? 'http://localhost:3001',
};
