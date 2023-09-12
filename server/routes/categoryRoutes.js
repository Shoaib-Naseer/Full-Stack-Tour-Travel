// routes/categoryRoutes.js
const categoryController = require('../controllers/categoryController');

const Category = {
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
  required: ['name'],
};

const getCategories = {
  schema: {
    response: {
      200: {
        type: 'array',
        categories: Category,
      },
    },
  },
  handler: categoryController.getAllCategories,
};

const createCategory = {
  schema: {
    body: Category,
    response: {
      201: Category,
    },
  },
  handler: categoryController.createCategory,
};

const updateCategory = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' }, 
      },
    },
    body: Category,
    response: {
      200: Category, 
    },
  },
  handler: categoryController.updateCategory,
};

const getCategory = {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' }, 
        },
      },
      response: {
        200: Category, 
      },
    },
    handler: categoryController.getCategory,
  };

function categoryRoutes(fastify, options, done) {
  fastify.get('/categories', getCategories);
  fastify.post('/categories', createCategory);
  fastify.get('/categories/:id', getCategory);
  fastify.put('/categories/:id', updateCategory);

  done();
}

module.exports = categoryRoutes;
