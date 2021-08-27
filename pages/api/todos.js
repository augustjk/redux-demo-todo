import fsPromise from 'fs/promises';

const handler = async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // artificial delay
  switch (req.method) {
    case 'GET': {
      const result = await fsPromise.readFile('./db/todos.json');
      res.json(JSON.parse(result));
      break;
    }
    case 'POST': {
      await fsPromise.writeFile('./db/todos.json', JSON.stringify(req.body.todos));
      const result = await fsPromise.readFile('./db/todos.json');
      res.json(JSON.parse(result));
      break;
    }
    default: {
      res.status(405).send('Method Not Allowed');
    }
  }
};

export default handler;
