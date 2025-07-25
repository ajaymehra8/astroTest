import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "payconfirm.html");
  const htmlContent = fs.readFileSync(filePath, "utf-8");

  return new NextResponse(htmlContent, {
    headers: { "Content-Type": "text/html" },
  });
}
