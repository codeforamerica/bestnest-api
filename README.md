rentfax-api
===========
![](https://travis-ci.org/codeforamerica/rentfacts-api.svg)

## installation
```
$ git clone git@github.com:codeforamerica/rentfax-api.git && cd rentfax-api
$ npm install
```
You'll also have to have some environment variables defined. You can get started by copying `env.example`
```
$ cp env.example env
```
In production, use whichever method you like best for managing environment variables, e.g. Heroku `config:set`

## running
```
$ source env
$ npm start
```

## environment variables
- `PORT` - the primary web port to bind to
- `DB_CONN_STR` - a mongodb [connection url](http://docs.mongodb.org/manual/reference/connection-string/)


## framework
`rentfax-api` is build using the [mach framework](https://www.npmjs.org/package/mach)


## license
(c) MMXIV Code for America. MIT license