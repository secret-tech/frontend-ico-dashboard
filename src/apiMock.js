import { setTimeout } from 'timers';

const getMock = (path) => {
  switch (path) {
    case '/user/me':
      return {
        ethAddress: '0xdb369b56BA7b07cF287f611Fbf0DAA4A8a4C2751',
        email: 'existing@test.com',
        name: 'ICO investor',
        kycStatus: 'verified',
        defaultVerificationMethod: 'email'
      };

    case '/dashboard':
      return {
        ethBalance: '1.0001',
        jcrTokensSold: '5000',
        jcrTokenBalance: '500.00012345678912345',
        jcrTokenPrice: {
          ETH: '0.005',
          USD: '1'
        },
        raised: {
          ETH: '2000',
          USD: '1000000',
          BTC: '100'
        },
        daysLeft: 10
      };

    case '/dashboard/investTxFee':
      return {
        gasPrice: '47',
        gas: '130000',
        expectedTxFee: '0.00611'
      };

    case '/dashboard/transactions':
      return [
        {
          id: '5a003866ee3a9d0ad93aeba3',
          transactionHash: '0xe423dd7d40b039e4e30ad7b5520f5905c6ec8c11122c94e3858c70e7983b5d7e',
          timestamp: 1509963894,
          blockNumber: 2016136,
          from: '0xBd0cb067A75C23EFB290B4e223059Af8E4AF4fd8',
          to: '0x446cd17EE68bD5A567d43b696543615a94b01760',
          ethAmount: '0',
          jcrAmount: '1',
          status: 'confirmed',
          type: 'jcr_transfer',
          direction: 'out'
        },
        {
          id: '5a004158b8442c0e1400fc4f',
          transactionHash: '0xcdf4a9dc086bcb3308475ced42b772879fd052822693aee509f81493412d460f',
          timestamp: 1509966175,
          blockNumber: 2016339,
          from: '0xBd0cb067A75C23EFB290B4e223059Af8E4AF4fd8',
          to: '0x446cd17EE68bD5A567d43b696543615a94b01760',
          ethAmount: '0',
          jcrAmount: '1',
          status: 'confirmed',
          type: 'jcr_transfer',
          direction: 'out'
        },
        {
          id: '5a004dee3663160140d19291',
          transactionHash: '0xe5d5ed39bf9eb64d3e56bf4a9d89b7f2bb026fc02c0d149027757936a1e7b6c7',
          timestamp: 1509969394,
          blockNumber: 2016578,
          from: '0xBd0cb067A75C23EFB290B4e223059Af8E4AF4fd8',
          to: '0x446cd17EE68bD5A567d43b696543615a94b01760',
          ethAmount: '2',
          status: 'confirmed',
          type: 'eth_transfer',
          direction: 'out'
        },
        {
          id: '5a004e003663160140d19292',
          transactionHash: '0x057c0846b7b7fa54c10544c595ec2e476c830220f0ea1fbb52215a3a44deade1',
          timestamp: 1509969394,
          blockNumber: 2016578,
          from: '0xBd0cb067A75C23EFB290B4e223059Af8E4AF4fd8',
          to: '0x446cd17EE68bD5A567d43b696543615a94b01760',
          ethAmount: '2',
          status: 'confirmed',
          type: 'eth_transfer',
          direction: 'out'
        },
        {
          id: '5a00669ab21e84067aac8bf6',
          transactionHash: '0xb87ef88fe75724ed067413de7c48f4c745cfafa709f42884308663cb53a8e2a0',
          timestamp: 1509975754,
          from: '0x54c0B824d575c60F3B80ba1ea3A0cCb5EE3F56eA',
          to: '0xBd0cb067A75C23EFB290B4e223059Af8E4AF4fd8',
          ethAmount: '5',
          status: 'pending',
          type: 'eth_transfer',
          direction: 'in'
        }
      ];

    case '/kyc/init':
      return {
        timestamp: '2017-11-09T06:47:31.467Z',
        authorizationToken: 'c87447f8-fa43-4f98-a933-3c88be4e86ea',
        clientRedirectUrl: 'https://lon.netverify.com/widget/jumio-verify/2.0/form?authorizationToken=c87447f8-fa43-4f98-a933-3c88be4e86ea',
        jumioIdScanReference: '7b58a08e-19cf-4d28-a828-4bb577c6f69a'
      };

    case '/dashboard/referral':
      return {
        data: 'dGVzdEB0ZXN0LmNvbQ',
        referralCount: 5,
        users: [
          {
            date: 1508241475,
            name: 'Investor 1',
            walletAddress: '0x54c0B824d575c60F3B80ba1ea3A0cCb5EE3F56eA',
            tokens: '105'
          },
          {
            date: 1508241475,
            name: 'Investor 2',
            walletAddress: '0x54c0B824d575c60F3B80ba1ea3A0cCb5EE3F56eB',
            tokens: '1.01'
          }
        ]
      };

    default:
      console.log('!!! UNCATCHED GET PATH', path);
      return {};
  }
};

const postMock = (path, body) => {
  switch (path) {
    case '/dashboard/invest/initiate':
      console.log('!!! POST PAYMENT. BODY:', body);
      return {
        verification: {
          verificationId: 'a4d642d6-8c96-4435-94b8-9a2bbd501552',
          consumer: 'test@gmail.com',
          expiredOn: 1509387586,
          status: 200,
          method: 'email'
        }
      };

    case '/user/resetPassword/initiate':
      console.log('!!! POST RESET PASSWORD. BODY:', body);
      return {
        verification: {
          verificationId: '8f9ba03c-e903-459c-adb9-7594865a03a4',
          consumer: 'test@test.com',
          expiredOn: 1508268673,
          status: 200,
          method: 'email'
        }
      };

    case '/user/login/initiate':
      console.log('!!! POST LOGIN INITIATE. BODY:', body);
      return {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhhNDA1OTk0LTA5NDMtNGZhMC05MmZhLTI5NTllNjhjMGU1YSIsImxvZ2luIjoicGV0ci5wZXRyb3YudGVzdC4xQHlhbmRleC5ydSIsImRldmljZUlkIjoiZGV2aWNlIiwianRpIjoiOGE0MDU5OTQtMDk0My00ZmEwLTkyZmEtMjk1OWU2OGMwZTVhZGV2aWNlMTUyMzI4NTU1NDc3OCIsImlhdCI6MTUyMzI4NTU1NDc3OCwic3ViIjoiZDZmYjAzYzYtNzE1MS00N2YzLTk2MjAtYWI4M2RmMjc5Nzk0IiwiYXVkIjoiamluY29yLmNvbSIsImV4cCI6MTUyMzI4NjE1OTU3OH0.81oAm_SIg1M3gRCyYQB_SFQVSIm6JXGablI_GZQj6Wo',
        isVerified: false,
        verification: {
          verificationId: '7fa96769-7bcc-4705-b544-02a83707cfc8',
          consumer: 'test@test.com',
          expiredOn: 1507720153,
          status: 200,
          method: 'email'
        }
      };

    case '/user/login/verify':
      console.log('!!! POST LOGIN VERIFY. BODY:', body);
      return {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhhNDA1OTk0LTA5NDMtNGZhMC05MmZhLTI5NTllNjhjMGU1YSIsImxvZ2luIjoicGV0ci5wZXRyb3YudGVzdC4xQHlhbmRleC5ydSIsImRldmljZUlkIjoiZGV2aWNlIiwianRpIjoiOGE0MDU5OTQtMDk0My00ZmEwLTkyZmEtMjk1OWU2OGMwZTVhZGV2aWNlMTUyMzI4NTU1NDc3OCIsImlhdCI6MTUyMzI4NTU1NDc3OCwic3ViIjoiZDZmYjAzYzYtNzE1MS00N2YzLTk2MjAtYWI4M2RmMjc5Nzk0IiwiYXVkIjoiamluY29yLmNvbSIsImV4cCI6MTUyMzI4NjE1OTU3OH0.81oAm_SIg1M3gRCyYQB_SFQVSIm6JXGablI_GZQj6Wo',
        isVerified: true,
        verification: {
          verificationId: '7fa96769-7bcc-4705-b544-02a83707cfc8',
          consumer: 'test@test.com',
          expiredOn: 1507720153,
          status: 200,
          method: 'email'
        }
      };

    case '/user':
      console.log('!!! POST USER. BODY:', body);
      return {
        id: 'fb10d98f-2a5e-430d-bf2a-c76b42259b74',
        email: 'ortgma@gmail.com',
        name: 'ICO investor',
        agreeTos: true,
        verification: {
          id: '3ed09e0a-72e1-417b-a05c-f0f08a5e1ffa',
          method: 'email'
        },
        isVerified: false,
        defaultVerificationMethod: 'email',
        referralCode: 'b3J0Z21hQGdtYWlsLmNvbQ',
        referral: 'test@test.com',
        source: {
          utm: 'utm',
          gtm: 'gtm'
        }
      };

    case '/user/activate':
      console.log('!!! POST USER ACTIVATE. BODY:', body);
      return {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhhNDA1OTk0LTA5NDMtNGZhMC05MmZhLTI5NTllNjhjMGU1YSIsImxvZ2luIjoicGV0ci5wZXRyb3YudGVzdC4xQHlhbmRleC5ydSIsImRldmljZUlkIjoiZGV2aWNlIiwianRpIjoiOGE0MDU5OTQtMDk0My00ZmEwLTkyZmEtMjk1OWU2OGMwZTVhZGV2aWNlMTUyMzI4NTU1NDc3OCIsImlhdCI6MTUyMzI4NTU1NDc3OCwic3ViIjoiZDZmYjAzYzYtNzE1MS00N2YzLTk2MjAtYWI4M2RmMjc5Nzk0IiwiYXVkIjoiamluY29yLmNvbSIsImV4cCI6MTUyMzI4NjE1OTU3OH0.81oAm_SIg1M3gRCyYQB_SFQVSIm6JXGablI_GZQj6Wo',
        wallets: [
          {
            ticker: 'ETH',
            address: '0xdb369b56BA7b07cF287f611Fbf0DAA4A8a4C2751',
            balance: '0',
            mnemonic: 'skull rain doctor wine stand pigeon roof half laundry tank hero behave',
            privateKey: '0xda2b3f0590d9f0a8e310203e1c7136693d0954420a82ab2cbcfa88eca07b4b31'
          }
        ]
      };

    default:
      console.log('!!! UNCATCHED POST PATH', path);
      return {};
  }
};

const putMock = (path, body) => {
  switch (path) {
    case '/contracts/me/':
      console.log('!!! PUT ME. BODY:', body);
      return {
      };

    default: return {};
  }
};

export const get = (path) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMock(path));
    }, 1000);
  });

export const post = (path, body) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(postMock(path, body));
    }, 1000);
  });

export const put = (path, body) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(putMock(path, body));
    }, 1000);
  });
