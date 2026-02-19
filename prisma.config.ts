import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    url: 'file:./basedatos/dev.db', // Asegúrate de que la ruta sea correcta
  },
});