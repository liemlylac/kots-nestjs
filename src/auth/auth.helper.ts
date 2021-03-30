export function getSignatureFromJwt(jwt: string) {
  if (typeof jwt !== 'string') {
    throw new Error('JWT must be a string');
  }
  const tokenParts = jwt.split('.');
  if (tokenParts.length !== 3) {
    throw new Error('Invalid JWT format');
  }
  return tokenParts[2]; // verify signature
}
