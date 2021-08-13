// import GitHub from "github-api";
// // const { Octokit } = require("@octokit/rest");
// // const octokit = new Octokit({
// //   auth: "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",
// // });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<any>
// ) {
//   const { username } = req.query;

//   const gh = new GitHub({
//     token: "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",
//   });
//   const user = gh.getUser(username);
//   console.log(user);

//   // Add better error handling
//   user
//     .listRepos()
//     .then(({ data }) => {
//       console.log(reduceRepos(data));
//       res.status(200).json(JSON.stringify(sortRepos(reduceRepos(data))));
//     })
//     .catch(({ error }) => {
//       console.log(error);
//     });

//   user
//     .getProfile()
//     .then(({ data }) => {
//       console.log(data);
//       // res.status(200).json(JSON.stringify(sortRepos(reduceRepos(data))));
//     })
//     .catch(({ error }) => {
//       console.log(error);
//     });
// }

// function reduceRepos(repos) {
//   const ret = [] as Array<any>;
//   for (let i = 0; i < repos.length; i++) {
//     ret.push({
//       private: repos[i].private,
//       cloneUrl: repos[i].clone_url,
//       name: repos[i].name,
//       updatedAt: Date.parse(repos[i].updated_at),
//     });
//   }

//   return ret;
// }

// function sortRepos(repos) {
//   let ret = [];

//   ret = repos.sort((a, b) => {
//     return a.updated_at - b.updated_at;
//   });
//   return ret;
// }

import type { NextApiRequest, NextApiResponse } from "next";
const { Octokit } = require("@octokit/rest");

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { accessToken } = req.query;

    if (!accessToken) {
        res.status(400).send("Bad request: missing parameters: accessToken");
        return;
    }

    const octokit = new Octokit({
        auth: accessToken,
    });

    const resJson = await octokit.request("GET /user/orgs");

    if (resJson.status === 200) {
        res.status(200).json(JSON.stringify(resJson.data));
        return;
    } else {
        res.status(400).send("Failed to fetch user orgs");
        return;
    }
}
