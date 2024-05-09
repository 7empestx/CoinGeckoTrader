# Use a Node.js 18 base image for the builder stage
FROM public.ecr.aws/lambda/nodejs:18 as builder

WORKDIR /usr/app

# Install dependencies first to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy TypeScript configuration and source files
COPY tsconfig.json ./
COPY src/ ./src/

# Adjust build command to change into the src directory
WORKDIR /usr/app/src

# Build your project
RUN npm run build

# Use a Node.js 18 base image for the production stage
FROM public.ecr.aws/lambda/nodejs:18

WORKDIR ${LAMBDA_TASK_ROOT}

# Copy the built JS files from the builder stage
COPY --from=builder /usr/app/dist/* ./

# Set the handler function
CMD ["index.handler"]
