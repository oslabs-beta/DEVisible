const mockDependencies = {
  '@mui/icons-material': '^5.10.6',
  '@prisma/client': '^4.4.0',
  'chart.js': '^3.9.1',
  axios: '^0.27.2',
  dotenv: '^16.0.3',
  react: '^18.2.0',
  'react-chartjs-2': '^4.3.1',
};

const mockDependencies2 = {
  '@emotion/react': '^11.10.4',
  '@emotion/styled': '^11.10.4',
  '@mui/material': '^5.10.7',
  '@types/babel__core': '^7.1.19',
  '@types/express': '^4.17.14',
  '@types/node': '^18.7.23',
  '@types/react': '^18.0.17',
  '@types/react-dom': '^18.0.6',
  '@typescript-eslint/eslint-plugin': '^5.38.1',
  '@typescript-eslint/parser': '^5.38.1',
};

const mockData = {
  id: 1,
  username: 'jDoe',
  APIToken: 'devisbile2017abc',
  repos: [
    {
      id: 1,
      userId: 1,
      name: 'loginPage',
      builds: [
        {
          id: 1,
          repoId: 1,
          createdAt: '2022-01-08Z04:05:06',
          buildTime: 500,
          buildSize: 472,
          deps: JSON.stringify(mockDependencies),
        },
        {
          id: 2,
          repoId: 1,
          createdAt: '2022-03-08Z03:05:06',
          buildTime: 1000,
          buildSize: 1109,
          deps: JSON.stringify(mockDependencies),
        },
        {
          id: 3,
          repoId: 1,
          createdAt: '2022-03-08Z07:03:06',
          buildTime: 1100,
          buildSize: 1273,
          deps: JSON.stringify(mockDependencies2),
        },
      ],
    },
    {
      id: 2,
      userId: 1,
      name: 'dashboard',
      builds: [
        {
          id: 4,
          repoId: 2,
          createdAt: '2022-01-08Z10:05:06',
          buildTime: 1000,
          buildSize: 1010,
          deps: JSON.stringify(mockDependencies),
        },
        {
          id: 5,
          repoId: 2,
          createdAt: '2022-01-08Z11:05:06',
          buildTime: 1100,
          buildSize: 1113,
          deps: JSON.stringify(mockDependencies),
        },
        {
          id: 6,
          repoId: 2,
          createdAt: '2022-08-08Z01:03:06',
          buildTime: 4000,
          buildSize: 2183,
          deps: JSON.stringify(mockDependencies),
        },
      ],
    },
    {
      id: 3,
      userId: 1,
      name: 'socialFeed',
      builds: [
        {
          id: 7,
          repoId: 3,
          createdAt: '2022-01-08Z04:05:06',
          buildTime: 250,
          buildSize: 178,
          deps: JSON.stringify(mockDependencies),
        },
        {
          id: 8,
          repoId: 3,
          createdAt: '2022-03-08Z03:05:06',
          buildTime: 100,
          buildSize: 97,
          deps: JSON.stringify(mockDependencies),
        },
        {
          id: 9,
          repoId: 3,
          createdAt: '2022-03-08Z07:03:06',
          buildTime: 1000,
          buildSize: 900,
          deps: JSON.stringify(mockDependencies),
        },
        {
          id: 10,
          repoId: 3,
          createdAt: '2022-03-10Z12:05:06',
          buildTime: 100,
          buildSize: 100,
          deps: JSON.stringify(mockDependencies),
        },
        {
          id: 11,
          repoId: 3,
          createdAt: '2022-03-12Z15:05:06',
          buildTime: 900,
          buildSize: 750,
          deps: JSON.stringify(mockDependencies),
        },
        {
          id: 12,
          repoId: 3,
          createdAt: '2022-03-13Z07:03:06',
          buildTime: 2000,
          buildSize: 1000,
          deps: JSON.stringify(mockDependencies2),
        },
      ],
    },
    {
      id: 4,
      userId: 1,
      name: 'userSettings',
      builds: [
        {
          id: 13,
          repoId: 4,
          createdAt: '2022-02-08Z09:45:06',
          buildTime: 687,
          buildSize: 1200,
          deps: JSON.stringify(mockDependencies),
        },
      ],
    },
  ],
};

export default mockData;
