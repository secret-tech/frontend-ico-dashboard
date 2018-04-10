const KycStatus = Object.freeze({
  Verified: 'verified',
  Failed: 'failed',
  Pending: 'pending'
});

const kycIsVerified = (status) => status === KycStatus.Verified;

export { kycIsVerified, KycStatus };