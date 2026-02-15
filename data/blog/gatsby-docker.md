---
title: Gatsby via Docker
subtitle: Portable and clean
slug: gatsby-docker
date: 2024-10-02
img: "../images/blogs/math.jpg"
skills: ["Gatsby", "Docker", "NodeJS"]
category: "DevOps"
---

# Your gatsby website served by docker

You have a gatsby website but your dependencies are getting out of hands?
Gatsby as a docker container can be the solution and this short tutorial will show you how.

## Prepare your workspace

First, let's assume your gatsby website is currently inside folder on your machine.
For the sake of the example let's take a popular starter kit.

```
git clone https://github.com/gatsbyjs/gatsby-starter-default.git ~/home
cd ~/home
```

now your gatsby project is located in the ´~/home´ directory.

Let's wrap it with a container.

1. Create a ´Dockerfile´ with the following content

```
FROM node:20.16.0-slim

WORKDIR /app

RUN apt-get update && apt-get install -y git && apt-get clean

# Install Gatsby CLI globally
RUN npm install -g gatsby-cli && npm cache clean --force

# Install project dependencies
RUN yarn install
RUN yarn cache clean

# Copy remaining files
COPY . .

# Move setup script and make it executable
COPY setup.sh /usr/local/bin/setup.sh
RUN chmod +x /usr/local/bin/setup.sh

# Expose the Gatsby development server port
EXPOSE 8000

# Use CMD instead of ENTRYPOINT to allow easy overriding
CMD ["/usr/local/bin/setup.sh"]
```

2. Keep things nice and clean with a ´.dockerignore´ file with the following content

```
.cache/
node_modules/
public/
```

3. Create a file named ´setup.sh´ in the same folder with the content

```
#!/bin/bash

# Exit on error
set -e

# Ensure we are in the correct directory
cd /app

# Print available Gatsby CLI version to debug
echo "Using Gatsby version: $(gatsby --version)"

# Ensure Gatsby is installed locally
if ! yarn list --pattern "gatsby@" >/dev/null; then
    echo "Gatsby is missing in node_modules! Installing locally..."
    yarn add gatsby
fi

# Serve the Gatsby site
exec gatsby develop -H 0.0.0.0
```

## Build your docker container

Substitute ´image-name´ with a name of your choice.

```
docker build -t image-name .
```

## Run your container

Substitute ´image-name´ as done above.

```
docker run -it --rm -v $(pwd):/app -p 8000:8000 image-name
```

Now you should be able to navigate to ´localhost:8000´ and see it running correctly.
