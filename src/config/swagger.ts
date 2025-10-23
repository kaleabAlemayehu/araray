import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Araray - Song API',
    version: '1.0.0',
    description: 'A RESTful API for managing a song library.',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
    },
  ],
  components: {
    schemas: {
      Song: {
        type: 'object',
        required: ['title', 'artist', 'album', 'genre', 'audioUrl'],
        properties: {
          id: {
            type: 'string',
            description: 'The auto-generated id of the song',
          },
          title: {
            type: 'string',
            description: 'The title of your song',
          },
          artist: {
            type: 'string',
            description: 'The song artist',
          },
          album: {
            type: 'string',
            description: 'The song album',
          },
          genre: {
            type: 'string',
            description: 'The song genre',
          },
          audioUrl: {
            type: 'string',
            description: 'The song audio url',
          },
        },
        example: {
          title: 'The new song',
          artist: 'The new artist',
          album: 'The new album',
          genre: 'The new genre',
          audioUrl: 'http://example.com/song.mp3',
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
