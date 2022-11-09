import app from './app';
import AppDataSource from './data-source';
import 'dotenv/config';

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

  const PORT = process.env.PORT

  app.listen(PORT || 3000, () => {
    console.log(`Servidor executando na porta ${PORT}`);
  });
})();
