import Fastify from "fastify";
import swagger from "@fastify/swagger";

export async function buildApp() {
  const app = Fastify();

  await app.register(swagger, {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "Backend Health API",
        version: "0.1.0",
      },
    },
  });

  app.get(
    "/health",
    {
      schema: {
        security: [],
        response: {
          200: {
            description: "El servicio puede responder a la consulta.",
            type: "object",
            required: ["status"],
            properties: {
              status: { type: "string", const: "ok" },
            },
            additionalProperties: false,
          },
        },
      },
    },
    async () => ({ status: "ok" }),
  );

  return app;
}