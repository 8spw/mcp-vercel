import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const handler = createMcpHandler(
  (server) => {
    server.tool(
      "levelLogger",
      { level: z.enum(["1", "2", "3"]) },
      async ({ level }) => ({
        content: [
          {
            type: "text",
            text: `Level: ${level}`,
          },
        ],
      })
    );
  },
  {
    capabilities: {
      tools: {
        levelLogger: {
          description: "Logs Level",
        },
      },
    },
  },
  {
    redisUrl: process.env.REDIS_URL,
  }
);

export { handler as GET, handler as POST, handler as DELETE };
