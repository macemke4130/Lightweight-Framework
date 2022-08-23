import express from 'express';

const app = express();
app.use(express.static('./public'));

app.listen(process.env.PORT || 4000);

console.log(" -- Live at localhost:4000 --- ");