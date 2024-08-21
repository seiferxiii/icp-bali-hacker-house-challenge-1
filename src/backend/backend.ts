import express from "express";
import { Server, ic, query } from "azle";
import { HttpResponse, HttpTransformArgs } from "azle/canisters/management";

export default Server(
  // Server section
  () => {
    const app = express();
    app.use(express.json());

    let messageboard = [
      {
        name: "Eliezer Rabadon",
        message: "Bali hacker house, LFG!",
        date_added: new Date(),
      },
    ];

    app.get("/board", (req, res) => {
      return res.json(messageboard);
    });

    app.post("/board/post", (req, res) => {
      const { name, message } = req.body;
      const entry = { name, message, date_added: new Date() };
      messageboard.push(entry);
      return res.json(messageboard);
    });

    // app.post("/price-oracle", async (req, res) => {
    //   ic.setOutgoingHttpOptions({
    //     maxResponseBytes: 20_000n,
    //     cycles: 500_000_000_000n,
    //     transformMethodName: "transform",
    //   });

    //   const date = "2024-04-01";

    //   const response = await fetch(
    //     `https://api.coindesk.com/v2/prices/${req.body.pair}/spot?date=${date}`
    //   );

    //   return res.json(response);
    // });

    app.use(express.static("/dist"));

    return app.listen();
  },
  // Candid section
  {
    transform: query([HttpTransformArgs], HttpResponse, (args) => {
      return {
        ...args.response,
        headers: [],
      };
    }),
  }
);
