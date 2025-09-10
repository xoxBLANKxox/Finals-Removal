import express from 'express'; //Importing the express module

const app = express();
const port = 3000;


  app.get('/',(req, res) => {
    res.status(200).send('Hello World!');
});

app.get ('/info',(req,res) => {
  const studentInfo = {
    name: "Jared FLores",
    secion: "IT4C",
    program: "BS in IT"
  };
  res.status(200).json(studentInfo);
});

/*app.get ('/:id', (req, res) => {
    const id = req.params.id;
    console.log(`Received ID: ${id}`);
}) 

*/

/*app.get ('/:name', (req, res) => {
    const name = req.params.name;
    console.log(`Hello: ${name}`);

    res.status(200).send(`Your requested name: ${name}`);
})

*/

app.get('/foo', (req, res) => {
    console.log(req.query);
})

app.get('/IT', (req, res) => {
    console.log(req.body);
});


app.listen(port, () => console.log (`Server is running at http://localhost:${port}`));

