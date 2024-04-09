import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const config: {
  port: number;
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
} = {
  port: Number(process.env.PORT) || 3000,
  smtpHost: process.env.SMTP_HOST || '',
  smtpPort: Number(process.env.SMTP_PORT) || 0,
  smtpUsername: process.env.SMTP_USERNAME || '',
  smtpPassword: process.env.SMTP_PASSWORD || '',
}

export default config;