### Using docker-compose to build up docker images

1. Run the following command to build up your MERN stack images

```bash
docker-compose build
```

Wait for building an image...

```bash
mongo uses an image, skipping
mongo-express uses an image, skipping
Building express-server
Step 1/7 : FROM node:14-slim
 ---> 14090ac0e55e
...
```

2. Run the following command to check your MERN stack images

```bash
docker images
```
The output would be similar to the following.
```bash
REPOSITORY                          TAG       IMAGE ID       CREATED         SIZE
2mern_stack_sample_react-client     latest    7a3eb70a4ff7   2 minutes ago   487MB
2mern_stack_sample_express-server   latest    ed04ecfc7781   5 minutes ago   206MB
```

### Using docker-compose to run up containers

1. Run the following command to run up your MERN containers

```bash
docker-compose up
```

Wait for building an image...

```bash
Compiled successfully!
react-ui        | 
react-ui        | You can now view client in the browser.
react-ui        | 
react-ui        |   Local:            http://localhost:3000
react-ui        |   On Your Network:  http://172.22.0.5:3000
react-ui        | 
react-ui        | Note that the development build is not optimized.
react-ui        | To create a production build, use npm run build.
react-ui        | 
...
```

2. Open [http://localhost:3000](http://localhost:3000) and take a look around MERN Stack sample project.

3. Open [http://localhost:8081](http://localhost:8081) and take a look around MongoExpress.