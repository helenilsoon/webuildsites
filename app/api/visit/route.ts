import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UAParser } from "ua-parser-js";


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { path } = body;

    if (!path) {
      return NextResponse.json(
        { error: "Path is required" },
        { status: 400 });
    }
    const ip =
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip") ??
      "unknown";

    //user Agent 

    const userAgent = request.headers.get("user-agent") ||"unknown";
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    const device = result.device.type || "desktop"; 
    const browser = result.browser.name || "unknown";
    const os = result.os.name || "unknown";
    const referer = request.headers.get("referer") || "direct";
    const country = request.headers.get("x-vercel-ip-country") || "unknown";
    const city = request.headers.get("x-vercel-ip-city") || "unknown";
    await prisma.visit.create({
      data: {
        ip,
        path,
        device,
        browser,
        os,
        referer,
        country,
        city,
      },
    })
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao registra visita", error);
    return NextResponse.json(
      { erro: "Erro interno" },
      { status: 500 }
    );
  }

}
