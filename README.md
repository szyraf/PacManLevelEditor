# PacManLevelEditor

School project 2023<br>
TS + HTML + CSS

live demo: [https://szyraf.github.io/PacManLevelEditor/](https://szyraf.github.io/PacManLevelEditor/)

## To run:

generate node_modules:<br>
`npm i`

ts -> js :<br>
`npm install -g typescript`<br>
`tsc ts/main.ts -w --outFile static/scripts/main.js --module amd`

run html file:<br>
`index.html`

or run server:<br>
`nodemon server.js`<br>
and open `localhost:3000`

## Screenshots

<img src="./screenshots/s1.png"/><br>
<img src="./screenshots/s2.png"/>

to deploy on github pages:<br>
`git subtree split --prefix static -b gh-pages`
`git push -f origin gh-pages:gh-pages`
`git branch -D gh-pages`
