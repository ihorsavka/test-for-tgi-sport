# On Windows

```sh
npm install
node index.js
```

# On Mac OS

```sh
chmod +x dummy_job.sh
npm install
node index.js
```


### Post a Job
```
curl -X POST http://localhost:3000/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "jobName": "my-task-42",
    "arguments": ["arg1", "arg2"]
  }'
```


### Get list of a jobs
```
 curl http://localhost:3000/jobs
```


### Get stats
```
 curl http://localhost:3000/stats
```