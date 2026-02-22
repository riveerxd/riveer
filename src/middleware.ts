import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BOT_PATTERNS = [
    "bot",
    "crawler",
    "spider",
    "whatsapp",
    "facebook",
    "twitter",
    "linkedin",
    "slack",
    "discord",
    "telegram",
    "preview",
    "fetch",
    "curl",
    "wget",
    "googlebot",
    "bingbot",
    "yandex",
    "baidu",
    "duckduck",
    "seznambot",
    "ahrefsbot",
    "semrushbot",
];

function isBot(userAgent: string | null): boolean {
    if (!userAgent) return false;
    const ua = userAgent.toLowerCase();
    return BOT_PATTERNS.some((pattern) => ua.includes(pattern));
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only handle the root path
    if (pathname !== "/") {
        return NextResponse.next();
    }

    const userAgent = request.headers.get("user-agent");

    // Redirect bots/crawlers to /en for proper OG metadata
    if (isBot(userAgent)) {
        return NextResponse.redirect(new URL("/en", request.url), 307);
    }

    // Real users get the normal loader page
    return NextResponse.next();
}

export const config = {
    matcher: ["/"],
};
