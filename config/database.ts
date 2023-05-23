import { connect } from 'mongoose';
import config from './config';

connect(config.DB_CONNECT_STRING)
    .then(() => {
        console.log("MongoDB : Connected");
    }).catch((err: string) => {
        console.log(err);
    });