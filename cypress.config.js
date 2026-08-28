const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    video: true,
    screenshotOnRunFailure: true,
    
    setupNodeEvents(on, config) {
      // Interceptamos el momento justo antes de que Cypress abra el navegador
      on('before:browser:launch', (browser = {}, launchOptions) => {
        
        // Si el navegador está basado en Chromium (Chrome, Edge, Electron)
        if (browser.family === 'chromium' || browser.name === 'electron') {
          
          // 1. Apaga la aceleración por hardware (Evita el error de GPU ReadPixels)
          launchOptions.args.push('--disable-gpu');
          
          // 2. Apaga el rasterizador por software
          launchOptions.args.push('--disable-software-rasterizer');
          
          // 3. Usa el disco en lugar de la RAM para archivos temporales 
          // (Evita bloqueos de memoria compartida en contenedores/Linux)
          launchOptions.args.push('--disable-dev-shm-usage');
        }

        return launchOptions;
      });
    },
  },
});