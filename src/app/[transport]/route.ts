import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const handler = createMcpHandler(
  (server) => {
    server.tool(
      "course_recommendation",
      { level: z.enum(["beginner", "intermediate", "advanced"]) },
      async ({ level }) => ({
        content: [
          {
            type: "text",
            text: `I would suggest you to start with the ${
              level === "beginner"
                ? "Javascript Tutorial"
                : level === "intermediate"
                ? "React Tutorial"
                : "Next.js Tutorial"
            }`,
          },
        ],
      })
    );
  },
  {
    capabilities: {
      tools: {
        course_recommendation: {
          description: "Recommend a course based on the level",
        },
      },
    },
  },
  {
    redisUrl: process.env.REDIS_URL,
  }
);

export { handler as GET, handler as POST, handler as DELETE };
