interface Result {
  data: {
    search: {
      searchHits: {
        id: string;
        preview: string;
        title: string;
        url: string;
      }[];
    };
  };
  errors?: {
    message: string;
  }[];
}

export async function POST(request: Request): Promise<Response | void> {
  try {
    const config = {
      apiKey: process.env.INKEEP_API_KEY,
      orgId: process.env.INKEEP_ORG_ID,
      integrationId: process.env.INKEEP_INTEGRATION_ID,
    };
    assertConfig(config);

    const query: unknown = await request.json();
    assertQuery(query);

    const response = await fetch("https://api.inkeep.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        query: `query {
          search(
            searchInput: {
              searchQuery: "${query.query}",
              organizationId: "${config.orgId}",
              integrationId: "${config.integrationId}",
              filters: {},
              searchMode: AUTO
            }
          ) {
            searchHits {
              id
              preview
              title
              url
            }
          }
        }`,
      }),
    });

    const result: Result = await response.json();

    if (result.errors) {
      // eslint-disable-next-line no-console
      console.error(result.errors);
      throw new Error("Something went wrong, contact us.");
    }

    // TODO: Format response

    return new Response("TODO");
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}

interface APIConfig extends Record<string, string> {
  apiKey: string;
  orgId: string;
  integrationId: string;
}

function assertConfig(
  config: Record<string, string | undefined>
): asserts config is APIConfig {
  if (!config.apiKey) throw new TypeError("Missing apiKey");
  if (!config.orgId) throw new TypeError("Missing orgId");
  if (!config.integrationId) throw new TypeError("Missing integrationId");
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

interface Query {
  query: string;
}

function assertQuery(value: unknown): asserts value is Query {
  if (!isObject(value)) throw new TypeError("Body must be an object");
  if (!("query" in value)) throw new TypeError("Missing query in body");
  if (typeof value.query !== "string")
    throw new TypeError("Query must be a string");
}
