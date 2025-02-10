.PHONY: all $(MAKECMDGOALS)

default:
	@echo "Hello o/. this is a makefile ^_^."
	@echo ""
	@${MAKE} help -s

help:
	@echo "Available commands:"
	@echo "  make install        - Install project dependencies"
	@echo "  make i              - Alias for install"
	@echo "  make client         - Run project client"
	@echo "  make start          - Start the project"
	@echo "  make build-client   - Build project client"
	@echo "  make build          - Build the project"
	@echo "  make start-build    - Start the built project"
	@echo "  make clean          - Clean up build folders"
	@echo "  make clean-node     - Clean up node_modules"
	@echo "  make clean-all      - Clean up build folders and node_modules"

# Install project dependencies.
install:
	@echo installing project dependencies
	@npm install

i: install

# Run project or parts of project.
client:
	@npx webpack-dev-server --mode development --open

start:
	@concurrently "make client"

# Build project or parts of project.
build-client:
	@npx webpack --mode production

build:
	@concurrently "make build-client"

start-build:
	@start http://localhost:3000 && node dist-server/server.js

# Clean project or parts of project.
clean:
	@echo Clean up build folders
	@rm -r dist

clean-node:
	@echo Clean up node_modules
	@rm -r node_modules

clean-all:
	concurrently "make clean-build" "make clean-node"

