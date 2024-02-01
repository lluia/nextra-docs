"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-expect-error
var broken_link_checker_1 = __importDefault(require("broken-link-checker"));
var core_1 = require("@actions/core");
var github = __importStar(require("@actions/github"));
var COMMENT_TAG = "## Broken Links";
function findBotComment(_a) {
    var octokit = _a.octokit, owner = _a.owner, repo = _a.repo, prNumber = _a.prNumber;
    return __awaiter(this, void 0, void 0, function () {
        var comments, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, octokit.rest.issues.listComments({
                            owner: owner,
                            repo: repo,
                            issue_number: prNumber,
                        })];
                case 1:
                    comments = (_b.sent()).data;
                    return [2 /*return*/, comments.find(function (c) { var _a; return (_a = c.body) === null || _a === void 0 ? void 0 : _a.includes(COMMENT_TAG); })];
                case 2:
                    error_1 = _b.sent();
                    (0, core_1.setFailed)("Error finding bot comment: " + error_1);
                    return [2 /*return*/, undefined];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function updateCheckStatus(commentUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var checkName, summary, text, context, getOctokit, octokit, _a, owner, repo, pullRequest, sha, checkParams, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    checkName = "Broken Link Checker";
                    summary = "This PR introduces broken links to the docs. Click details for a list.";
                    text = "[See the comment for details](".concat(commentUrl, ")");
                    context = github.context, getOctokit = github.getOctokit;
                    octokit = getOctokit(process.env.GITHUB_TOKEN);
                    _a = context.repo, owner = _a.owner, repo = _a.repo;
                    pullRequest = context.payload.pull_request;
                    sha = pullRequest === null || pullRequest === void 0 ? void 0 : pullRequest.head.sha;
                    checkParams = {
                        owner: owner,
                        repo: repo,
                        name: checkName,
                        head_sha: sha,
                        status: "completed",
                        conclusion: "failure",
                        output: {
                            title: checkName,
                            summary: summary,
                            text: text,
                        },
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, octokit.rest.checks.create(checkParams)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    (0, core_1.setFailed)("Failed to create check: " + error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var postComment = function (outputMd) { return __awaiter(void 0, void 0, void 0, function () {
    var context, getOctokit, octokit, _a, owner, repo, pullRequest, isFork, prNumber, botComment, data, data, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                context = github.context, getOctokit = github.getOctokit;
                octokit = getOctokit(process.env.GITHUB_TOKEN);
                _a = context.repo, owner = _a.owner, repo = _a.repo;
                pullRequest = context.payload.pull_request;
                if (!pullRequest) {
                    console.log("Skipping since this is not a pull request");
                    process.exit(0);
                }
                isFork = pullRequest.head.repo.fork;
                prNumber = pullRequest.number;
                if (isFork) {
                    (0, core_1.setFailed)("The action could not create a Github comment because it is initiated from a forked repo. View the action logs for a list of broken links.");
                    return [2 /*return*/, ""];
                }
                return [4 /*yield*/, findBotComment({
                        octokit: octokit,
                        owner: owner,
                        repo: repo,
                        prNumber: prNumber,
                    })];
            case 1:
                botComment = _b.sent();
                if (!botComment) return [3 /*break*/, 3];
                return [4 /*yield*/, octokit.rest.issues.updateComment({
                        owner: owner,
                        repo: repo,
                        comment_id: botComment === null || botComment === void 0 ? void 0 : botComment.id,
                        body: outputMd,
                    })];
            case 2:
                data = (_b.sent()).data;
                return [2 /*return*/, data.html_url];
            case 3: return [4 /*yield*/, octokit.rest.issues.createComment({
                    owner: owner,
                    repo: repo,
                    issue_number: prNumber,
                    body: outputMd,
                })];
            case 4:
                data = (_b.sent()).data;
                return [2 /*return*/, data.html_url];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_3 = _b.sent();
                (0, core_1.setFailed)("Error updating comment: " + error_3);
                return [2 /*return*/, ""];
            case 7: return [2 /*return*/];
        }
    });
}); };
var generateOutputMd = function (output) {
    var outputMd = "".concat(COMMENT_TAG);
    var linksByPage = output.links.reduce(function (acc, link) {
        if (!acc[link.base.resolved]) {
            acc[link.base.resolved] = [];
            acc[link.base.resolved].push(link);
        }
        else {
            acc[link.base.resolved].push(link);
        }
        return acc;
    }, {});
    Object.entries(linksByPage).forEach(function (_a) {
        var page = _a[0], links = _a[1];
        var pageBasePath = new URL(page).pathname;
        outputMd += "\n\n### `".concat(page, "`\n\n|     | link | text | line |\n|-----|------|------|----------|");
        // @ts-expect-error
        links.forEach(function (link) {
            outputMd += "\n| [ ] | ".concat(link.url.resolved, " | ").concat(link.html.text
                .trim()
                .replaceAll("\n", ""), " | `").concat(pageBasePath, ":").concat(link.html.location.line, "` |");
        });
    });
    if (output.errors.length) {
        outputMd += "\n### Errors\n";
        output.errors.forEach(function (error) {
            outputMd += "\n".concat(error, "\n");
        });
    }
    return outputMd;
};
// Main function that triggers link validation across .mdx files
function brokenLinkChecker() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var siteUrl, output, options, siteChecker;
        var _this = this;
        return __generator(this, function (_b) {
            siteUrl = (_a = process.env.VERCEL_PREVIEW_URL) !== null && _a !== void 0 ? _a : "https://authjs-nextra-docs.vercel.app";
            output = {
                errors: [],
                links: [],
                pages: [],
                sites: [],
            };
            options = {
                excludeExternalLinks: true,
                excludedKeywords: [],
            };
            siteChecker = new broken_link_checker_1.default.SiteChecker(options, {
                error: function (error) {
                    output.errors.push(error);
                },
                link: function (result) {
                    if (result.broken && result.brokenReason === "HTTP_404") {
                        // console.log({ result, customData });
                        output.links.push(result);
                    }
                },
                end: function () { return __awaiter(_this, void 0, void 0, function () {
                    var outputMd, commentUrl;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!output.links.length) return [3 /*break*/, 3];
                                outputMd = generateOutputMd(output);
                                return [4 /*yield*/, postComment(outputMd)];
                            case 1:
                                commentUrl = _a.sent();
                                return [4 /*yield*/, updateCheckStatus(commentUrl)];
                            case 2:
                                _a.sent();
                                (0, core_1.setFailed)("Found broken links");
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); },
            });
            siteChecker.enqueue(siteUrl);
            return [2 /*return*/];
        });
    });
}
brokenLinkChecker();
