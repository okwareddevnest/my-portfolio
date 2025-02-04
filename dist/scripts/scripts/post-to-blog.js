#!/usr/bin/env node
"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var child_process_1 = require("child_process");
var util_1 = require("util");
var promises_1 = __importDefault(require("fs/promises"));
var path_1 = __importDefault(require("path"));
var uuid_1 = require("uuid");
var puppeteer_1 = __importDefault(require("puppeteer"));
var readline_1 = __importDefault(require("readline"));
var execAsync = (0, util_1.promisify)(child_process_1.exec);
// Create readline interface for prompts
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
var question = function (query) {
    return new Promise(function (resolve) {
        rl.question(query, function (answer) {
            resolve(answer);
        });
    });
};
// Loading spinner animation
var Spinner = /** @class */ (function () {
    function Spinner(text) {
        this.frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
        this.interval = null;
        this.currentFrame = 0;
        this.text = text;
    }
    Spinner.prototype.start = function () {
        var _this = this;
        this.interval = setInterval(function () {
            process.stdout.write("\r".concat(_this.frames[_this.currentFrame], " ").concat(_this.text));
            _this.currentFrame = (_this.currentFrame + 1) % _this.frames.length;
        }, 80);
    };
    Spinner.prototype.stop = function () {
        if (this.interval) {
            clearInterval(this.interval);
            process.stdout.write('\r');
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
        }
    };
    return Spinner;
}());
function extractLinkedInPost(url, spinner) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, data, title, preview, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, puppeteer_1.default.launch({ headless: true })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto(url)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            var _a, _b;
                            var article = document.querySelector('article');
                            var content = ((_a = article === null || article === void 0 ? void 0 : article.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
                            var image = ((_b = article === null || article === void 0 ? void 0 : article.querySelector('img')) === null || _b === void 0 ? void 0 : _b.getAttribute('src')) || '';
                            var hashtags = Array.from((article === null || article === void 0 ? void 0 : article.querySelectorAll('[href*="hashtag"]')) || [])
                                .map(function (tag) { return tag.innerText.replace('#', ''); });
                            return {
                                content: content,
                                image: image,
                                hashtags: hashtags,
                            };
                        })];
                case 4:
                    data = _a.sent();
                    return [4 /*yield*/, browser.close()];
                case 5:
                    _a.sent();
                    title = data.content.split('\n')[0];
                    preview = data.content.substring(0, 200) + '...';
                    return [2 /*return*/, {
                            content: data.content,
                            title: title,
                            preview: data.image || '',
                            tags: data.hashtags.length > 0 ? data.hashtags : ['LinkedIn', 'Professional'],
                        }];
                case 6:
                    error_1 = _a.sent();
                    spinner.stop();
                    console.error('\n❌ Error extracting LinkedIn post:', error_1);
                    throw error_1;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function extractTwitterPost(url, spinner) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, puppeteer_1.default.launch({ headless: true })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto(url)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            var _a;
                            var tweet = document.querySelector('[data-testid="tweet"]');
                            var content = ((_a = tweet === null || tweet === void 0 ? void 0 : tweet.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
                            var imageElement = tweet === null || tweet === void 0 ? void 0 : tweet.querySelector('img[src*="media"]');
                            var image = (imageElement === null || imageElement === void 0 ? void 0 : imageElement.getAttribute('src')) || '';
                            var hashtags = Array.from((tweet === null || tweet === void 0 ? void 0 : tweet.querySelectorAll('[href*="hashtag"]')) || [])
                                .map(function (tag) { return tag.innerText.replace('#', ''); });
                            return {
                                content: content,
                                image: image,
                                hashtags: hashtags,
                            };
                        })];
                case 4:
                    data = _a.sent();
                    return [4 /*yield*/, browser.close()];
                case 5:
                    _a.sent();
                    return [2 /*return*/, {
                            content: data.content,
                            title: data.content.split('\n')[0],
                            preview: data.image || '',
                            tags: data.hashtags.length > 0 ? data.hashtags : ['Twitter', 'Social'],
                        }];
                case 6:
                    error_2 = _a.sent();
                    spinner.stop();
                    console.error('\n❌ Error extracting Twitter post:', error_2);
                    throw error_2;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function createBlogPost(url, spinner) {
    return __awaiter(this, void 0, void 0, function () {
        var isLinkedIn, isTwitter, postData, _a, blog;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    isLinkedIn = url.includes('linkedin.com');
                    isTwitter = url.includes('twitter.com') || url.includes('x.com');
                    if (!isLinkedIn && !isTwitter) {
                        throw new Error('Unsupported social media platform. Please use LinkedIn or Twitter/X URLs.');
                    }
                    if (!isLinkedIn) return [3 /*break*/, 2];
                    return [4 /*yield*/, extractLinkedInPost(url, spinner)];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, extractTwitterPost(url, spinner)];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    postData = _a;
                    blog = {
                        id: (0, uuid_1.v4)(),
                        title: postData.title,
                        content: postData.content,
                        publishedAt: new Date().toISOString(),
                        author: {
                            name: "Dedan Okware",
                            image: "/profile.png",
                            role: "Software Engineer"
                        },
                        tags: postData.tags,
                        readTime: "".concat(Math.ceil(postData.content.split(' ').length / 200), " min read"),
                        thumbnail: postData.preview,
                        source: {
                            type: isLinkedIn ? 'linkedin' : 'twitter',
                            url: url,
                            preview: postData.preview
                        }
                    };
                    return [2 /*return*/, blog];
            }
        });
    });
}
function updateBlogStore(blog, spinner) {
    return __awaiter(this, void 0, void 0, function () {
        var storePath, blogs, content, _a, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    storePath = path_1.default.join(process.cwd(), 'store', 'blogs.json');
                    blogs = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, promises_1.default.readFile(storePath, 'utf-8')];
                case 2:
                    content = _b.sent();
                    blogs = JSON.parse(content);
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 4:
                    blogs.push(blog);
                    return [4 /*yield*/, promises_1.default.writeFile(storePath, JSON.stringify(blogs, null, 2))];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 6:
                    error_3 = _b.sent();
                    spinner.stop();
                    console.error('\n❌ Error updating blog store:', error_3);
                    throw error_3;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function deployToVercel(spinner) {
    return __awaiter(this, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    // Add changes to git
                    return [4 /*yield*/, execAsync('git add .')];
                case 1:
                    // Add changes to git
                    _a.sent();
                    return [4 /*yield*/, execAsync('git commit -m "Add new blog post"')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, execAsync('git push origin main')];
                case 3:
                    _a.sent();
                    // Deploy to Vercel
                    return [4 /*yield*/, execAsync('vercel --prod')];
                case 4:
                    // Deploy to Vercel
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    error_4 = _a.sent();
                    spinner.stop();
                    console.error('\n❌ Error deploying to Vercel:', error_4);
                    throw error_4;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var url, confirm_1, fetchSpinner, blog, storeSpinner, deploySpinner, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('\n🌟 Welcome to the Blog Post Automation Workflow!\n');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, 8, 9]);
                    return [4 /*yield*/, question('📎 Please paste your LinkedIn or Twitter/X post URL: ')];
                case 2:
                    url = _a.sent();
                    if (!url) {
                        console.error('\n❌ No URL provided. Please try again.');
                        process.exit(1);
                    }
                    // Confirm with user
                    console.log('\n📝 Post Details:');
                    console.log("URL: ".concat(url));
                    console.log("Platform: ".concat(url.includes('linkedin.com') ? 'LinkedIn' : 'Twitter/X'));
                    return [4 /*yield*/, question('\n✨ Would you like to proceed? (y/n): ')];
                case 3:
                    confirm_1 = _a.sent();
                    if (confirm_1.toLowerCase() !== 'y') {
                        console.log('\n🚫 Operation cancelled by user.');
                        process.exit(0);
                    }
                    // Start the process with loading indicators
                    console.log('\n🚀 Starting the automation process...\n');
                    fetchSpinner = new Spinner('Fetching post data...');
                    fetchSpinner.start();
                    return [4 /*yield*/, createBlogPost(url, fetchSpinner)];
                case 4:
                    blog = _a.sent();
                    fetchSpinner.stop();
                    console.log('✅ Post data fetched successfully!\n');
                    storeSpinner = new Spinner('Updating blog store...');
                    storeSpinner.start();
                    return [4 /*yield*/, updateBlogStore(blog, storeSpinner)];
                case 5:
                    _a.sent();
                    storeSpinner.stop();
                    console.log('✅ Blog store updated successfully!\n');
                    deploySpinner = new Spinner('Deploying to Vercel...');
                    deploySpinner.start();
                    return [4 /*yield*/, deployToVercel(deploySpinner)];
                case 6:
                    _a.sent();
                    deploySpinner.stop();
                    console.log('✅ Deployed to Vercel successfully!\n');
                    console.log('🎉 Success! Your post has been added to your portfolio.');
                    console.log("\uD83D\uDD17 View it at: https://my-portfolio-crypt.vercel.app/blogs\n");
                    return [3 /*break*/, 9];
                case 7:
                    error_5 = _a.sent();
                    console.error('\n❌ Error:', error_5);
                    process.exit(1);
                    return [3 /*break*/, 9];
                case 8:
                    rl.close();
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
}
main();
