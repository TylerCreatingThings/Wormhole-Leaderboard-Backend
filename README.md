# Serverless Wormhole Leaderboard

## Endpoints

Additional details can be found in the handlers for each of the below endpoints in [`src/index.ts`](./src/index.ts)

## Files

(Optional) *`src/__tests__/index.spec.ts`*: Jest test suite

## Scripts

### Local server

We use the `serverless-offline` plugin to create a local dev server from your `serverless.yml`. By default this will run on http://localhost:3001.

```sh
yarn start
```

This command will build your assets prior to running. The server will _not_ restart automatically for changed assets.

### Tests

We include a basic jest test suite in `src/__tests_/index.spec.ts`.

```sh
yarn test
```

Feel free to add to these tests as you see fit.

### Build

A build command is included to transpile the typescript. The transpiled JavaScript is output to `dist`.

```sh
yarn build
```

_Note_: The `dist` directory will get blown away before every build.
