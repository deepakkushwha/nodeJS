import DBConnection from './config/db.js';
import app from './app.js';

DBConnection()

app.listen(3000,()=>{
    console.log('Server runing');
})