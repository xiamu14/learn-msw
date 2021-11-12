import { setupWorker, rest } from "msw";
import { db } from "./db";

function guard(isIntercept: boolean, handler: any) {
  if (isIntercept) {
    return handler;
  }
  return null;
}

function compose(...args: any) {
  let handlers = [];
  if (args && Array.isArray(args) && args.length > 0) {
    handlers = args.filter((it) => it !== null);
  }
  return handlers;
}

function init() {
  const handlers = compose(
    guard(
      true,
      rest.get("/user/:userId", (req, res, ctx) => {
        const students = new Array(6).fill(0).map((i) => {
          return db.student.create();
        });

        return res(
          ctx.delay(2000),
          ctx.json({
            error: 0,
            msg: "",
            data: students,
          })
        );
      })
    )
  );
  if (handlers.length > 0) {
    const worker = setupWorker(
      // Provide request handlers
      ...handlers
    );

    // Start the Mock Service Worker
    worker.start();
  }
}

init();
