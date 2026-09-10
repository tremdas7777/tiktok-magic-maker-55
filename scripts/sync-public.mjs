// The funnel pages now live in funnel/ and are served by the worker
// (src/lib/funnel-static.server.ts). Static assets live in public/.
// Nothing to sync at build time.
console.log("no sync needed: funnel pages are bundled into the server");
