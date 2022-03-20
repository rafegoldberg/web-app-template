<br/>
<h1 align=center>Web App Scaffolding</h1>
<p align=center><em>a baseline web app with a Mongo-backed Express API & React-based front end</em></p>
<br/>

Getting Started
---

 To work on the app, clone this repo locally, `cd` in, and then `npm install`. After you [configure your local environment](#configuration), you can run the `start` and `dev` scripts simultaneously. This will spin up both the API server (at [localhost:5678][server]) and the React dev server (on [localhost:1234][client]) with hot module reloading.

Here are a few key source files + folders:

- **Mongo**: [model schemas]
- **Express**: [API endpoints]
- **React**: [route components]

Configuration
---

### Locally

When you first clone this repo, you'll need to add a new `.env` file to the root with these default values:

```
PORT=5678
SERVER_URI=http://localhost:$PORT
```

### Heroku

If you plan to link the app to a Heroku instance, you have to add the following environment variables via their UI:

```
MONGODB_URI=mongodb+srv://user:p***d@cluster.mongodb.net/some-collection
SESSION_SECRET=randomlygeneratedhash
```


[Route Components]: https://github.com/rafegoldberg/web-app-template/tree/main/src/client/routes
[Model Schemas]: https://github.com/rafegoldberg/web-app-template/tree/main/src/db/models
[API Endpoints]: https://github.com/rafegoldberg/web-app-template/tree/main/src/server/api
[client]: http://localhost:1234
[server]: http://localhost:5678/api/pages
[template]: https://github.com/rafegoldberg/web-app-template/generate