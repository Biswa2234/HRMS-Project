
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "HRMS Backend API",
      version: "1.0.0",
      description: "API documentation for the HRMS application",
    },

    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:5000",
        description: "Local development server",
      },
    ],

    components: {
      // JWT authentication configuration
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      // Add reusable response schemas here
      schemas: {
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Something went wrong",
            },
          },
        },
      },
    },
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
