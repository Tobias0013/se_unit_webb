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
	@echo "  make clean         - Clean up project"
	@echo "  make clean-node    - Clean up node_modules"
	@echo "  make clean-docs    - Clean up docs"
	@echo "  make clean-build   - Clean up build folders"
	@echo "  make doc           - Generate automated documentation"
	@echo "  make doc-typedoc   - Generate typedoc documentation"
	@echo "  make doc-client     - Generate client documentation"


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
clean-node:
	@echo Clean up node_modules
	@rm -r -f node_modules

clean-docs:
	@echo Clean up docs
	@rm -r -f docs

clean-build:
	@echo Clean up build folders
	@rm -r -f dist
	@rm -r -f dist-server

clean:
	@make clean-build && make clean-node && make clean-docs

# Generate automated documentation.
doc: 
	@make doc-typedoc && make doc-client

doc-typedoc: 
	@npx typedoc

doc-client: 
	@mkdir -p ./docs/graphs-client && make doc-madge-client && make doc-dc-client && make doc-dc-external-client

doc-madge-client: 
	@npx madge --extensions ts,tsx --ts-config tsconfig.json  --image docs/graphs-client/madge-graph-client.png client

doc-dc-client: 
	@npx depcruise client --include-only '^client' --output-type dot | dot -T svg > docs/graphs-client/dc-graph-client.svg

doc-dc-external-client: 
	@npx depcruise client --output-type dot | dot -T svg > docs/graphs-client/dc-ext-graph-client.svg

