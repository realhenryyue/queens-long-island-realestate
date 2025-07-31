import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.51d5797246c143d0858b2ad97bb86680',
  appName: 'queens-long-island-realestate',
  webDir: 'dist',
  server: {
    url: 'https://51d57972-46c1-43d0-858b-2ad97bb86680.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Share: {
      enable: true
    }
  }
};

export default config;