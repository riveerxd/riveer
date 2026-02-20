import path from "node:path";
import fs from "node:fs/promises";
import { projects } from "../src/data/projects";
import puppeteer from "puppeteer-core";

const OUTPUT_DIR = path.resolve(process.cwd(), "public", "project-screenshots");
const VIEWPORT = { width: 1920, height: 1080 };
const DEFAULT_WAIT_MS = 12000;
const NAVIGATION_TIMEOUT_MS = 60000;
const NETWORK_IDLE_TIMEOUT_MS = 15000;
const WEBP_QUALITY = 80;
const CHROME_PATH = process.env.CHROME_PATH || "/usr/bin/google-chrome-stable";
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function ensureOutputDir() {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
}

function parseArgs() {
    const args = new Map<string, string>();
    for (const raw of process.argv.slice(2)) {
        const [key, value] = raw.split("=");
        if (key && value) {
            args.set(key.replace(/^--/, ""), value);
        }
    }
    return {
        url: args.get("url"),
        id: args.get("id"),
    };
}

async function captureProjectScreenshots() {
    await ensureOutputDir();

    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        defaultViewport: VIEWPORT,
    });
    const page = await browser.newPage();

    const { url, id } = parseArgs();
    const targets = url
        ? [
              {
                  id: "custom",
                  title: url,
                  url,
                  image: `/project-screenshots/custom.webp`,
              },
          ]
        : id
          ? projects.filter((project) => project.id === id)
          : projects;

    if (targets.length === 0) {
        console.error("No matching project found. Use --id=<projectId> or --url=<url>.");
        await browser.close();
        process.exitCode = 1;
        return;
    }

    for (const project of targets) {
        const filePath = path.join(OUTPUT_DIR, `${project.id}.webp`);
        const extraWait = project.waitFor ?? DEFAULT_WAIT_MS;

        try {
            console.log(`Capturing ${project.title} -> ${filePath}`);
            await page.goto(project.url, {
                waitUntil: "domcontentloaded",
                timeout: NAVIGATION_TIMEOUT_MS,
            });

            await page
                .waitForNetworkIdle({
                    idleTime: 1000,
                    timeout: NETWORK_IDLE_TIMEOUT_MS,
                })
                .catch(() => {
                    // Some sites never go fully idle; continue with extra wait instead.
                });

            if (extraWait > 0) {
                await sleep(extraWait);
            }

            await page.setViewport(VIEWPORT);
            await page.screenshot({
                path: filePath,
                type: "webp",
                quality: WEBP_QUALITY,
            });
        } catch (error) {
            console.error(`Failed to capture ${project.title}:`, error);
        }
    }

    await browser.close();
}

captureProjectScreenshots().catch((error) => {
    console.error("Screenshot capture failed:", error);
    process.exitCode = 1;
});
