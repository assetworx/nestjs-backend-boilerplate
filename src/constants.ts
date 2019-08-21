export const constants = {
  // JWT CONSTANTS
  secret: 'secretKey',
  jwtDefaultExpiration: '2 days',
  // SECURITY CONSTANTS
  rateLimitWindow: 15 * 60 * 1000, // 15 minutes
  rateLimitMaxReqPerWindow: 300,
  // OTHER CONSTANTS
  httpPort: 3000,
};
