export default {
  env: 'dev',
  jwt: {
    jwtSecret: '54sad54as1d1asd',
    masterKey: 'sd3d121gvf2sd23a1sfs',
  },
  mongo: {
    url: 'mongodb://localhost:27017/bank',
  },
  user: {
    blockDuration: 3000000,
    validLoginAttempts: 3,
  },
};
