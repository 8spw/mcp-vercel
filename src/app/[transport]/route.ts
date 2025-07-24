import { createMcpHandler } from "@vercel/mcp-adapter";
import z from "zod";

const handler = createMcpHandler(
  (server) => {
    server.tool(
      "cource_recommendation",
      "Give a course recommendation to user",
      {
        experienceLevel: z.enum(["beginner", "intermediate"]),
      },
      ({ experienceLevel }) => ({
        content: [
          {
            type: "text",
            text: `I would recommend ${
              experienceLevel === "beginner"
                ? "Javascript Course"
                : "Next.js Course"
            }`,
          },
        ],
      })
    );
  },
  {
    capabilities: {
      tools: {
        cource_recommendation: {
          description: "Give a course recommendation to user",
          inputSchema: {
            type: "object",
            properties: {
              experienceLevel: {
                type: "string",
                enum: ["beginner", "intermediate"],
              },
            },
            required: ["experienceLevel"],
          },
        },
      },
    },
  },
  {
    redisUrl: process.env.REDIS_URL_REDIS_URL,
    sseEndpoint: "/sse",
    streamableHttpEndpoint: "/mcp",
    verboseLogs: true,
    maxDuration: 60,
  }
);

export { handler as POST, handler as GET, handler as DELETE };
