import { writeFileSync } from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

const targetPath = './src/environments/environment.ts';

const envFileContent = `
export const environment = {
  production: false,
  apiUrl: '${process.env['API_URL']}'
};
`;

writeFileSync(targetPath, envFileContent);
