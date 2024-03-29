# Key-Manager-UI

This project was bootstrapped with [Vite](https://vitejs.dev/).
This is an UI created to just handle the function of manage passwords.
This is still an exploratory WIP, so it may get some data updates soon.
This UI consumes a Java API (see [Key-Manager-Service](https://github.com/gal16v8d/key-manager-svc)).
UI can anyway go alive through a flag that enable mocking using [MSW](https://mswjs.io/).

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5174](http://localhost:5174) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### Docker

To build the docker image, inside project dir:

```bash
docker build -t gsdd-key-manager-ui .
```

Then run using something like:

```bash
docker run -p 5174:5174 -e VITE_API_URL=http://api.example.com -e VITE_APP_VERSION=0.0.1 -e VITE_ENABLE_MOCKS=true gsdd-key-manager-ui
```

## List of cool technologies in use here

- [Bulma](https://bulma.io/)
- [Msw](https://mswjs.io/)
- [PrimeReact](https://primereact.org/)
- [React](https://reactjs.org/)
- [React-i18next](https://react.i18next.com/)
- [React-Query](https://tanstack.com/query/v4/docs/react/adapters/react-query)
- [Recoil](https://recoiljs.org/)
- [Vite](https://vitejs.dev/)

## License

[MIT licensed](LICENSE).

## Stay in touch

- Author - [gal16v8d](https://github.com/gal16v8d)
