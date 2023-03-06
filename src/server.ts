import App from '@app';
import UsersDataRoute from '@routes/user-data.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new UsersDataRoute()]);

app.listen();
