const app = require('./app');

const PORT = app.get('PORT');

app.listen(PORT, () => {
  console.log('Hello Condor Labs! 😄');
  console.log(`Listening on port ${PORT}`);
});
