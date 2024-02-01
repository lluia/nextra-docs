import blc from "broken-link-checker";
import { setFailed } from "@actions/core";
import * as github from "@actions/github";

type TODO = any;
type Output = {
  errors: any[];
  links: any[];
  pages: any[];
  sites: any[];
};
type Comment = {
  id: number;
};
type FindBotComment = {
  octokit: TODO;
  owner: string;
  repo: string;
  prNumber: number;
};

const COMMENT_TAG = "## Broken Links";

async function findBotComment({
  octokit,
  owner,
  repo,
  prNumber,
}: FindBotComment): Promise<Comment | undefined> {
  try {
    const { data: comments } = await octokit.rest.issues.listComments({
      owner,
      repo,
      issue_number: prNumber,
    });

    return comments.find((c: TODO) => c.body?.includes(COMMENT_TAG));
  } catch (error) {
    setFailed("Error finding bot comment: " + error);
    return undefined;
  }
}

async function updateCheckStatus(commentUrl?: string): Promise<void> {
  const checkName = "Broken Link Checker";
  const summary =
    "This PR introduces broken links to the docs. Click details for a list.";
  const text = `[See the comment for details](${commentUrl})`;
  const { context, getOctokit } = github;
  const octokit = getOctokit(process.env.GITHUB_TOKEN!);
  const { owner, repo } = context.repo;
  const pullRequest = context.payload.pull_request;
  const sha = pullRequest?.head.sha;

  const checkParams = {
    owner,
    repo,
    name: checkName,
    head_sha: sha,
    status: "completed" as const,
    conclusion: "failure" as const,
    output: {
      title: checkName,
      summary: summary,
      text: text,
    },
  };

  try {
    await octokit.rest.checks.create(checkParams);
  } catch (error) {
    setFailed("Failed to create check: " + error);
  }
}

const postComment = async (outputMd: string) => {
  try {
    const { context, getOctokit } = github;
    const octokit = getOctokit(process.env.GITHUB_TOKEN!);
    const { owner, repo } = context.repo;
    const pullRequest = context.payload.pull_request;
    if (!pullRequest) {
      console.log("Skipping since this is not a pull request");
      process.exit(0);
    }
    const isFork = pullRequest.head.repo.fork;
    const prNumber = pullRequest.number;
    if (isFork) {
      setFailed(
        "The action could not create a Github comment because it is initiated from a forked repo. View the action logs for a list of broken links."
      );
      return "";
    }

    const botComment = await findBotComment({
      octokit,
      owner,
      repo,
      prNumber,
    });
    if (botComment) {
      const { data } = await octokit.rest.issues.updateComment({
        owner,
        repo,
        comment_id: botComment?.id,
        body: outputMd,
      });

      return data.html_url;
    } else {
      const { data } = await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: prNumber,
        body: outputMd,
      });
      return data.html_url;
    }
  } catch (error) {
    setFailed("Error updating comment: " + error);
    return "";
  }
};

const generateOutputMd = (output: Output): string => {
  let outputMd = `${COMMENT_TAG}`;
  const linksByPage = output.links.reduce((acc, link) => {
    if (!acc[link.base.resolved]) {
      acc[link.base.resolved] = [];
      acc[link.base.resolved].push(link);
    } else {
      acc[link.base.resolved].push(link);
    }
    return acc;
  }, {});
  Object.entries(linksByPage).forEach(([page, links]) => {
    const pageBasePath = new URL(page).pathname;
    outputMd += `

### \`${page}\`

|     | link | text | line |
|-----|------|------|----------|`;
    // @ts-expect-error
    links.forEach((link: TODO) => {
      outputMd += `
| [ ] | ${link.url.resolved} | ${link.html.text
        .trim()
        .replaceAll("\n", "")} | \`${pageBasePath}:${
        link.html.location.line
      }\` |`;
    });
  });

  if (output.errors.length) {
    outputMd += `
### Errors
`;
    output.errors.forEach((error) => {
      outputMd += `
${error}
`;
    });
  }
  return outputMd;
};

// Main function that triggers link validation across .mdx files
async function brokenLinkChecker(): Promise<void> {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN is required");
  }
  const siteUrl =
    process.env.VERCEL_PREVIEW_URL ?? "https://authjs-nextra-docs.vercel.app";
  const output: Output = {
    errors: [],
    links: [],
    pages: [],
    sites: [],
  };

  const options = {
    excludeExternalLinks: true,
    excludedKeywords: [],
  };

  const siteChecker = new blc.SiteChecker(options, {
    error: (error: TODO) => {
      output.errors.push(error);
    },
    link: (result: TODO) => {
      if (result.broken && result.brokenReason === "HTTP_404") {
        // console.log({ result, customData });
        output.links.push(result);
      }
    },
    end: async () => {
      // console.log({
      //   output,
      //   link0: output.links[0],
      //   link0Html: output.links[0].html,
      //   page0: output.pages[0],
      // });
      if (output.links.length) {
        const outputMd = generateOutputMd(output);
        // console.log(outputMd);
        const commentUrl = await postComment(outputMd);

        await updateCheckStatus(commentUrl);
        setFailed(`Found broken links`);
      }
    },
  });

  siteChecker.enqueue(siteUrl);
}

brokenLinkChecker();
