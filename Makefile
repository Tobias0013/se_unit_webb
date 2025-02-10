.PHONY: all $(MAKECMDGOALS)

default:
	@echo Hello o/. this is a makefile


# Install project dependencies.
install:
	@echo installing project dependencies
	@npm install

i: install

# Run project or parts of project.
client:
	@npx webpack-dev-server --mode development --open

server:
	@nodemon server/server.ts

start:
	@concurrently "make client" "make server"

# Build project or parts of project.
build-client:
	@npx webpack --mode production

build-server:
	@npx tsc

build:
	@concurrently "make build-client" "make build-server"

start-build:
	@start http://localhost:3000 && node dist-server/server.js

# Clean project or parts of project.
clean:
	@echo Clean up build folders
	@rm -r dist
	@rm -r dist-server

clean-node:
	@echo Clean up node_modules
	@rm -r node_modules

clean-all:
	concurrently "make clean-build" "make clean-node"

