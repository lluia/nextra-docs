interface Query {
  query: string;
}

export async function POST(request: Request): Promise<Response | void> {
  try {
    const body: unknown = await request.json();
    assertBody(body);

    // TODO: Retrieve answer
    // and format for sending back to the CLI

    return new Response(body.query);
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}

function assertBody(body: unknown): asserts body is Query {
  if (!body) throw new TypeError("Missing body");
  if (typeof body !== "object") throw new TypeError("Body must be an object");
  if (!("query" in body)) throw new TypeError("Missing query in body");
  if (typeof body.query !== "string")
    throw new TypeError("Query must be a string");
}
