import path from "node:path";
import fs from "node:fs/promises";
import React from "react";
import { ImageResponse } from "next/og";
import { getDictionary } from "../src/i18n/dictionaries";
import { defaultLocale } from "../src/i18n/config";
import type { Locale } from "../src/i18n/config";

const DEFAULT_LOCALE: Locale = defaultLocale;
const DOMAIN = "riveer.cz";
const OUTPUT_PATH = path.resolve(process.cwd(), "public", "og-image.webp");
const DEFAULT_EXPORT_OUTPUT_PATH = path.resolve(process.cwd(), "out", "og-image.webp");
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const colors = {
  bg: "#050505",
  cyan: "#22d3ee",
  cyanDark: "#06b6d4",
  cyanSoft: "#67e8f9",
  purple: "#a855f7",
  purpleSoft: "#c4b5fd",
  cyanGlow: "rgba(6, 182, 212, 0.5)",
  purpleGlow: "rgba(168, 85, 247, 0.4)",
  muted: "rgba(207, 250, 254, 0.6)",
  white: "#ffffff",
};

type ArgMap = Map<string, string>;

function parseArgs(): ArgMap {
  const args = new Map<string, string>();

  for (const raw of process.argv.slice(2)) {
    const [key, value] = raw.split("=");
    if (key && value) {
      args.set(key.replace(/^--/, ""), value);
    }
  }

  return args;
}

function getLocale(args: ArgMap): Locale {
  const locale = args.get("locale");
  return locale === "cs" ? "cs" : DEFAULT_LOCALE;
}

function getOutputPath(args: ArgMap): string {
  return args.get("out") ? path.resolve(process.cwd(), args.get("out")!) : OUTPUT_PATH;
}

function buildHeroCopy(locale: Locale) {
  const dictionary = getDictionary(locale);
  return {
    roleTag: `${dictionary.ui.currentRolePrefix}${dictionary.personal.role}`,
    headlineLine1: dictionary.headings.heroLine1,
    headlineLine2: dictionary.headings.heroLine2,
    description: dictionary.metadata.ogDescription,
    footerLabel: dictionary.sections.openForOpportunities,
  };
}

function withExportMirror(sourcePath: string, shouldMirror: boolean) {
  if (!shouldMirror || sourcePath !== OUTPUT_PATH) {
    return Promise.resolve();
  }

  return fs
    .access(path.dirname(DEFAULT_EXPORT_OUTPUT_PATH))
    .then(() => fs.copyFile(sourcePath, DEFAULT_EXPORT_OUTPUT_PATH))
    .catch(() => undefined);
}

function createImage(locale: Locale) {
  const copy = buildHeroCopy(locale);

  return new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          width: OG_WIDTH,
          height: OG_HEIGHT,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 64px",
          position: "relative",
          overflow: "hidden",
          background: colors.bg,
          color: colors.white,
          fontFamily: "Inter, system-ui, sans-serif",
        },
      },
      [
        // Top section - Logo
        React.createElement(
          "div",
          {
            key: "logo",
            style: {
              display: "flex",
              alignItems: "center",
              gap: 14,
              zIndex: 10,
            },
          },
          [
            React.createElement("div", {
              key: "logo-dot",
              style: {
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: colors.cyan,
                boxShadow: `0 0 24px ${colors.cyanGlow}`,
              },
            }),
            React.createElement(
              "span",
              {
                key: "logo-text",
                style: {
                  fontSize: 36,
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  color: colors.white,
                  textTransform: "uppercase",
                  display: "flex",
                },
              },
              [
                "RIVER",
                React.createElement(
                  "span",
                  { key: "logo-slash", style: { color: colors.purple } },
                  "//"
                ),
                "CORE",
              ]
            ),
          ]
        ),
        // Center section - Hero content
        React.createElement(
          "div",
          {
            key: "hero",
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 20,
              zIndex: 10,
            },
          },
          [
            // Role badge
            React.createElement(
              "div",
              {
                key: "role-badge",
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 20px",
                  borderRadius: 9999,
                  border: `1px solid rgba(168, 85, 247, 0.4)`,
                  background: "rgba(168, 85, 247, 0.12)",
                  alignSelf: "flex-start",
                },
              },
              React.createElement(
                "span",
                {
                  key: "role-text",
                  style: {
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    color: colors.purpleSoft,
                    textTransform: "uppercase",
                  },
                },
                copy.roleTag
              )
            ),
            // Headline
            React.createElement(
              "div",
              {
                key: "headline",
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                },
              },
              [
                React.createElement(
                  "span",
                  {
                    key: "line1",
                    style: {
                      fontSize: 82,
                      fontWeight: 900,
                      letterSpacing: "-0.04em",
                      lineHeight: 1.0,
                      color: colors.white,
                      textTransform: "uppercase",
                    },
                  },
                  copy.headlineLine1
                ),
                React.createElement(
                  "span",
                  {
                    key: "line2",
                    style: {
                      fontSize: 82,
                      fontWeight: 900,
                      letterSpacing: "-0.04em",
                      lineHeight: 1.0,
                      textTransform: "uppercase",
                      backgroundImage: `linear-gradient(135deg, ${colors.cyanSoft} 0%, ${colors.cyanDark} 50%, ${colors.purple} 100%)`,
                      backgroundClip: "text",
                      color: "transparent",
                    },
                  },
                  copy.headlineLine2
                ),
              ]
            ),
            // Description
            React.createElement(
              "p",
              {
                key: "description",
                style: {
                  fontSize: 22,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: colors.muted,
                  maxWidth: 750,
                  margin: 0,
                },
              },
              copy.description
            ),
          ]
        ),
        // Bottom section - Footer
        React.createElement(
          "div",
          {
            key: "footer",
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: 20,
              zIndex: 10,
            },
          },
          [
            // Status indicator
            React.createElement(
              "div",
              {
                key: "status",
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                },
              },
              [
                React.createElement("div", {
                  key: "status-dot",
                  style: {
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: colors.cyan,
                    boxShadow: `0 0 12px ${colors.cyanGlow}`,
                  },
                }),
                React.createElement(
                  "span",
                  {
                    key: "status-text",
                    style: {
                      fontSize: 14,
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      color: colors.cyanSoft,
                      textTransform: "uppercase",
                    },
                  },
                  copy.footerLabel
                ),
              ]
            ),
            // Domain
            React.createElement(
              "span",
              {
                key: "domain",
                style: {
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  color: "rgba(255, 255, 255, 0.6)",
                },
              },
              DOMAIN
            ),
          ]
        ),
      ]
    ),
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
    }
  );
}

async function main() {
  const args = parseArgs();
  const locale = getLocale(args);
  const outputPath = getOutputPath(args);
  const shouldMirror = args.get("mirrorToExport") !== "false";

  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const response = createImage(locale);
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(outputPath, buffer);
  await withExportMirror(outputPath, shouldMirror);

  console.log(`Saved Open Graph image to ${outputPath} (locale=${locale})`);
}

main().catch((error) => {
  console.error("Failed to generate OG image:", error);
  process.exitCode = 1;
});
