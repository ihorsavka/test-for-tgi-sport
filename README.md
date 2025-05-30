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


### Post a JOb
```
curl -X POST http://localhost:3000/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "jobName": "my-task-42",
    "arguments": ["arg1", "arg2"]
  }'
```