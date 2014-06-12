rentfacts-api
===========
![](https://travis-ci.org/codeforamerica/rentfacts-api.svg)


## installation

```console
$ git clone git@github.com:codeforamerica/rentfacts-api.git && cd rentfacts-api
$ npm install
```
You'll also have to have some environment variables defined. You can get started by
copying `env.example`
```console
$ cp env.example env
```
In production, use whichever method you like best for managing environment variables,
e.g. Heroku `config:set`


## running

```console
$ source env
$ npm start
```

## environment variables

- `PORT` - the primary web port to bind to
- `DB_CONN_STR` - a mongodb [connection url](http://docs.mongodb.org/manual/reference/connection-string/)


## database

this app combines data from many sources. unfortunately, not all of these sources
are yet available publicly (although our longterm goal is to change that, making
them available as open data). Unfortunately, this makes running the app with live
data from outside of Code for America more difficult. Please contact us in a github
issue if you would like to get this project set up and running.


## framework

`rentfacts-api` is build using the
[mach framework](https://www.npmjs.org/package/mach)


## contributing

Pull Requests are welcome. Development is discussed in Github Issues and on IRC.
Test and deployment spam and other notifications are pushed into IRC at
`irc.freenode.net#cfacha`.

The primary client for this API is [rentfacts-app](https://github.com/codeforamerica/rentfacts-app).
Relevant discussion and background may also be located in that repo.

Please also see [`CONTRIBUTING.md`](https://github.com/codeforamerica/rentfacts-api/blob/master/CONTRIBUTING.md)
for community contribution guidelines.


## license

(c) MMXIV Code for America. ISC license.
