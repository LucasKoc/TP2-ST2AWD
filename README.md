## TP2 - Interface Development and Design
20-Sept-2024 | SE Promo 2026 | KOCOGLU Lucas

### Exercise 1

When we launch the file `index-es6-modules.html`, the error reveled in the console is the following:
```bash
This HTML file directly loads JavaScript code from the 'src' folder.

The 'src' folder contains non-bundled and non-transpiled ES6 modules.
ES-modules are files able to import or export references (variables, functions, classes...). Before ES-modules exist, splitting your codebase in multiple files was a difficult job.
ES-modules are supported by most modern browsers (97.2% of users covered) at the time of writing.
The `type="module"` attribute is used on `script` tag requiring `src/index.js`. This only works when served from a HTTP server.
Please refer to this post to setup a local server and run the code

JS has been loaded succesfully

>>>bash
(x) GET http://localhost:3000/AAPL-rates-5y.json net::ERR_CONNECTION_REFUSED
(x) Uncaught (in promise) TypeError: Failed to fetch
      at myHttpGet (http.js:7:17)
      at apiGetRateHistory (api.js:63:30)
      at HTMLSelectElement.<anonymous> (index.js:20:29)
```
The error asks us to run the code on a local server. To do so, we need to install a local server.

1. `Back/server.js` is updated with the four routes, a listener. A middleware is used to log requests on the console.
2. Server is successfully launched with `node server.js` with the following output:
```bash
lucas@MacBook-Pro-Luxas Back % node serveur.js

Server listening at http://localhost:3000
GET /AAPL-rates-5y.json
GET /FB-rates-5y.json
GET /GOOG-rates-5y.json
GET /MSFT-rates-5y.json
```
3. The frontend app is launch by the command `npm run serve-es6` in a separate terminal. The output is the following:
```bash
lucas@MacBook-Pro-Luxas Front % npm run serve-es6

> basic-rate-graph@0.0.1 serve-es6
> http-server -a 127.0.0.1

Starting up http-server, serving ./

http-server settings: 
CORS: disabled
Cache: 3600 seconds
Connection Timeout: 120 seconds
Directory Listings: visible
AutoIndex: visible
Serve GZIP Files: false
Serve Brotli Files: false
Default File Extension: none

Available on:
  http://127.0.0.1:8080
Hit CTRL-C to stop the server
```

### Exercise 2
When opening the page from `http://127.0.0.1:8080`, the following error is displayed in the console:
```bash
Access to fetch at 'http://localhost:3000/AAPL-rates-5y.json' from origin 'http://127.0.0.1:8080' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'http://localhost:8080' that is not equal to the supplied origin. Have the server send the header with a valid value, or, if an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```
It's because we allowed the CORS policy in server-side to be accessed only from `http://localhost:8080` and not from `http://127.0.0.1:8080`. This issue can be resolved by multiple ways.
1. We can change the server-side code to allow the CORS policy from `http://127.0.0.1:8080` as well.
2. We can change the front-side code to allow the CORS policy from `http://localhost:3000` as well.

Here we will do the option 1.

#### 1. How many JS files were loaded ?
Answer: 4 files were loaded: `index.js`, `api.js`, `table.js`, `http.js`, located in the `Front/src` folder.

#### 2. How long does it take on average to load one ES6-module ?
Answer: The average time to load one ES6-module is 15ms.

#### 3 & 4. What is the total completion time to load all JS files ? Did the browser download JS files sequentially or in parallel ?
Answer: 

| File               | Size  | Time  |
|--------------------|-------|-------|
| index.js           | 1.4kB | 4ms   |
| api.js             | 3.4kB | 8ms   |
| table.js           | 2.6kB | 11ms  |
| http.js            | 1.2kB | 3ms   |
| --------           | ----- | ----- |
| AAPL-rates-5y.json | 525kB | 21ms  |
| FB-rates-5y.json   | 522kB | 10ms  |
| GOOG-rates-5y.json | 526kB | 9ms   |
| MSFT-rates-5y.json | 519kB | 11ms  |

> Running sequentially: `index.js` --> `api.js` & `table.js` --> `http.js`
>
> `api.js` and `table.js` are loaded in parallel (called by `index.js`)
>
> `http.js` is loaded after `api.js` and `table.js` are loaded (called by `api.js`)

_For screenshot, see `Ressources/Exercise 2.3`_

### Exercise 3
The performance penalty of serving ES6-modules as independent files to the browser is that the browser has to make multiple requests to the server to fetch each file. This can be a problem when the number of files is high, increasing the loading time.
For example, here we have 4 files to load, _index.js_ calling the whole content of  _table.js_ and _api.js_ (which is calling _http.js_). In this logic of importation of everything and not import only what we need for a specific action, the loading time is easily increased.
To reduce this latency, we could be aware of big importation, or we can also compress files to reduce their size.

### Exercise 4
Package already installed previously.
Here's the project structure:
```bash
./
├── Back
│   ├── Data
│   │   ├── AAPL-rates-5y.json
│   │   ├── FB-rates-5y.json
│   │   ├── GOOG-rates-5y.json
│   │   └── MSFT-rates-5y.json
│   ├── node_modules
│   │   └── [...]
│   ├── package-lock.json
│   ├── package.json
│   └── serveur.js
├── Front
│   ├── node_modules
│   │   └── [...]
│   ├── index-bundled.html
│   ├── index-es6-modules.html
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── api.js
│   │   ├── chart.js
│   │   ├── http.js
│   │   ├── index.js
│   │   └── table.js
│   └── webpack.config.js
├── README.md
└── TP2.pdf
```

### Exercise 5 - Using npm, find all vulnerable packages and associated version.

There is multiple command to track outdated packages, with example in our lab:
1. `npm outdated` to list outdated packages
```js
Package              Current   Wanted  Latest  Location                          Depended by
babel-loader           8.4.1    8.4.1   9.2.1  node_modules/babel-loader         Front
chart.js               2.9.4    2.9.4   4.4.4  node_modules/chart.js             Front
http-server           13.1.0   13.1.0  14.1.1  node_modules/http-server          Front
regenerator-runtime  0.13.11  0.13.11  0.14.1  node_modules/regenerator-runtime  Front
standard              16.0.4   16.0.4  17.1.2  node_modules/standard             Front
webpack-cli           4.10.0   4.10.0   5.1.4  node_modules/webpack-cli          Front
```
It's described by:
- **Current** is the version of the package that is currently installed in the project.
- **Wanted** is the version of the package that is specified in the `package.json` file.
- **Latest** is the latest version of the package that is available.

To update all packages, we can use the command `npm update`.
2. `npm audit` to audit the packages
```js
found 0 vulnerabilities
```
If there's 0 vulnerabilities found, it means that none of the packages used in the project have known vulnerabilities.

### Exercise 6

Primary purpose of webpack is to bundle JavaScript modules into one or more files.
Without bundling, browsers would make individual HTTP requests for every module, and importing ES6-modules could include large chunks of unused code.
Webpack bundle all modules into a single or smaller sets of files. Its also does code splitting to load parts of the application on demand.

### Exercise 7

After running the command `npm run build`, the output is the following:
```bash
lucas@MacBook-Pro-Luxas Front % npm run build 

> basic-rate-graph@0.0.1 build
> webpack

asset index.js 12.5 KiB [emitted] (name: main)
runtime modules 670 bytes 3 modules
cacheable modules 7.18 KiB
  ./src/index.js 1.07 KiB [built] [code generated]
  ./src/api.js 3.05 KiB [built] [code generated]
  ./src/table.js 2.22 KiB [built] [code generated]
  ./src/http.js 858 bytes [built] [code generated]
webpack 5.94.0 compiled successfully in 54 ms
```

This permits to bundle all the modules into a single file, reducing the number of requests to the server and the loading time.
The file is available in the `Front/dist` folder.

### Exercise 8

| File               | Size   | Time |
|--------------------|--------|------|
| index.js           | 13.2kB | 3ms  |

We can observe that the size of the file is bigger than the sum of the sizes of the individual files. This is because webpack includes a runtime and some additional code to manage the modules.

On the other hand, the loading time is faster than the sum of all files. This is because the browser only needs to make one request to the server to fetch the bundle, instead of multiple requests for each individual file.

### Exercise 9

First, we update the file `Front/webpack.config.js` to accept `(env, argv)` entry and change the `mode` property:
```js
mode: argv.mode === 'production' ? 'production' : 'development',
```
Then, we run the command `npm run build -- --mode=production` or `npm run build -- --mode=development` to build the project in production/development mode.

Result of execution:
```bash
lucas@MacBook-Pro-Luxas Front % npm run build -- --mode development

> basic-rate-graph@0.0.1 build
> webpack --mode development

asset index.js 12.5 KiB [compared for emit] (name: main)
runtime modules 670 bytes 3 modules
cacheable modules 7.18 KiB
  ./src/index.js 1.07 KiB [built] [code generated]
  ./src/api.js 3.05 KiB [built] [code generated]
  ./src/table.js 2.22 KiB [built] [code generated]
  ./src/http.js 858 bytes [built] [code generated]
webpack 5.94.0 compiled successfully in 49 ms


lucas@MacBook-Pro-Luxas Front % npm run build -- --mode production 

> basic-rate-graph@0.0.1 build
> webpack --mode production

asset index.js 1.77 KiB [emitted] [minimized] (name: main)
orphan modules 6.11 KiB [orphan] 3 modules
./src/index.js + 3 modules 7.18 KiB [built] [code generated]
webpack 5.94.0 compiled successfully in 132 ms
```

We can see that in production mode, the execution time of compilation is longer than in development mode. This is because webpack is doing more work in production mode, such as minifying the code and removing dead code.

### Exercise 10

