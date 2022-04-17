<br/>
<h1 align=center>Web App Scaffolding</h1>
<p align=center><em>a baseline web app with a Mongo-backed Express API & React-based front end</em></p>
<br/>

Getting Started
---

To build on this app, clone the repo, `cd` in, run `npm install`, and [configure your local environment](#configuration).[^1] Next, run the `dev.server` and `dev.client` scripts simultaneously. This will spin up both the API (on [localhost:5678][server]) and React dev server (at [localhost:1234][client]) with hot module reloading.

Here are a few key source files + folders:

- **Mongo**: [Schema Models]
- **Express**: [API Endpoints]
- **React**: [Route Components]

Configuration
---

### Locally

After cloning this repo, you'll need to add a new `.env` file to the root with these default values:

```shell
PORT=5678
SERVER_URI=http://localhost:$PORT
```

### Heroku

If you plan to run your app on a Heroku box, you'll need to add the following environment variables via the dashboard:

```shell
MONGODB_URI=mongodb+srv://user:p***d@cluster.mongodb.net/some-collection
SESSION_SECRET=somerandomlygeneratedhash
```


[client]: http://localhost:1234
[server]: http://localhost:5678/api/pages

[Route Components]: https://github.com/rafegoldberg/web-app-template/tree/main/src/client/routes
[Schema Models]: https://github.com/rafegoldberg/web-app-template/tree/main/src/db/models
[API Endpoints]: https://github.com/rafegoldberg/web-app-template/tree/main/src/server/api

[m]: https://www.npmjs.com/package/m


[^1]: These guides assume you already have Mongo running on your local machine. You can use [**`m`**][m] to manage installation.