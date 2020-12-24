# Keep the Makefile POSIX-compliant.
#
# See https://pubs.opengroup.org/onlinepubs/9699919799/utilities/make.html.
.POSIX:

CHANNEL = development
CLIENT_DIR = client
COMMIT = $$(git rev-parse --short HEAD)
DIST_DIR = dist
GO = go
# TODO(a.garipov): Add more default proxies using pipes after update to
# Go 1.15.
#
# GOPROXY = https://goproxy.io|https://goproxy.cn
GOPROXY = https://goproxy.cn,https://goproxy.io,direct
GPG_KEY_PASSPHRASE = not-a-real-password
NPM = npm
NPM_FLAGS = --prefix $(CLIENT_DIR)
VERBOSE = 0
VERSION = v0.0.0

ENV = env\
	COMMIT='$(COMMIT)'\
	CHANNEL='$(CHANNEL)'\
	GPG_KEY_PASSPHRASE='$(GPG_KEY_PASSPHRASE)'\
	DIST_DIR='$(DIST_DIR)'\
	GO='$(GO)'\
	GOPROXY='$(GOPROXY)'\
	PATH="$$PWD/bin:$$PATH"\
	VERBOSE='$(VERBOSE)'\
	VERSION='$(VERSION)'\

# Keep the line above blank.

# Keep this target first, so that a naked make would trigger a build.
build: js-build go-gen go-build

ci: deps test

deps: js-deps go-deps
lint: js-lint go-lint
test: js-test go-test

# Here and below, keep $(SHELL) in quotes, because on Windows this will
# expand to something like "C:/Program Files/Git/usr/bin/sh.exe".
build-docker: ; $(ENV) "$(SHELL)" ./scripts/build-docker.sh

build-release: deps go-gen
	$(ENV) "$(SHELL)" ./scripts/build-release.sh

clean: ; $(ENV) "$(SHELL)" ./scripts/clean.sh
init:  ; git config core.hooksPath ./.githooks

js-build: ; $(NPM) $(NPM_FLAGS) run build-prod
js-deps:  ; $(NPM) $(NPM_FLAGS) ci
js-lint:  ; $(NPM) $(NPM_FLAGS) run lint
js-test:  ; $(NPM) $(NPM_FLAGS) run test

go-build: ; $(ENV) "$(SHELL)" ./scripts/go-build.sh
go-deps:  ; $(ENV) "$(SHELL)" ./scripts/go-deps.sh
go-gen:   ; $(ENV) $(GO) generate ./...
go-lint:  ; $(ENV) "$(SHELL)" ./scripts/go-lint.sh
go-test:  ; $(ENV) "$(SHELL)" ./scripts/go-test.sh
go-tools: ; $(ENV) "$(SHELL)" ./scripts/go-tools.sh

# TODO(a.garipov): Remove the legacy targets once the build
# infrastructure stops using them.
dependencies:
	@ echo "use make deps instead"
	@ $(MAKE) deps
docker-multi-arch:
	@ echo "use make build-docker instead"
	@ $(MAKE) build-docker
go-install-tools:
	@ echo "use make go-tools instead"
	@ $(MAKE) go-tools
release:
	@ echo "use make build-release instead"
	@ $(MAKE) build-release
