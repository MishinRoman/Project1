import { TOKEN_KEY } from "./constants";

export const authorization = async (user) => {
  await fetch("http://localhost:5098/api/login/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((response) => response.body)
    .then((rb) => {
      const reader = rb.getReader();

      return new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                console.log("done", done);
                controller.close();
                return;
              }
              controller.enqueue(value);
              console.log(done, value);
              push();
            });
          }

          push();
        },
      });
    })
    .then((stream) =>
      new Response(stream, { headers: { "Content-Type": "text/html" } }).text()
    )
    .then((result) => {
      console.log(result);

      if (result != null && result.split(".")[0] === TOKEN_KEY) {
        localStorage.setItem(TOKEN_KEY, result);
      }
    });
};
