import { NextResponse } from "next/server";

// Flip to false to bring the preview back online (or delete this file).
const OFFLINE = true;

const PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ora × Kadyo — Preview paused</title>
<style>
  *{margin:0;box-sizing:border-box}
  body{min-height:100dvh;display:flex;align-items:center;justify-content:center;
    background:#302a24;color:#f4efe7;font-family:ui-serif,Georgia,serif;text-align:center;padding:32px}
  .wrap{max-width:420px}
  .mark{font-size:56px;letter-spacing:2px;line-height:1}
  .rule{width:40px;height:2px;background:#cbb74c;margin:22px auto}
  h1{font-family:ui-sans-serif,system-ui,sans-serif;font-weight:600;font-size:17px;margin-bottom:10px}
  p{font-family:ui-sans-serif,system-ui,sans-serif;font-size:13px;line-height:1.6;color:#bcac92}
  .foot{margin-top:26px;font-family:ui-monospace,monospace;font-size:10px;letter-spacing:2px;color:#7a6a56;text-transform:uppercase}
</style>
</head>
<body>
  <div class="wrap">
    <div class="mark">ORA</div>
    <div class="rule"></div>
    <h1>This preview is currently paused</h1>
    <p>The Ora Tulum command center preview is temporarily offline. Please reach out to reactivate access.</p>
    <div class="foot">Kadyo Studio</div>
  </div>
</body>
</html>`;

export function middleware() {
  if (!OFFLINE) return NextResponse.next();
  return new NextResponse(PAGE, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "retry-after": "3600",
      "cache-control": "no-store",
    },
  });
}

export const config = {
  matcher: "/((?!_next/static|_next/image).*)",
};
