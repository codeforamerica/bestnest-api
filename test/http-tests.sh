#! /bin/sh
curl http://localhost:9001/homes/23/data -X POST -H "content-type: application /json" -d '{"rel":"cats","value":"true"}'  -v