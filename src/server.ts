import App from './app';
import UsersDataRoute from '@routes/user-data.route';
import validateEnv from '@utils/validateEnv';
import IndexRoute from '@routes/index.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersDataRoute()]);

app.listen();
