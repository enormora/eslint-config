export PATH := './node_modules/.bin:' + env_var('PATH')

default:
    @just --list

compile:
    tsc --build
    tsc -p test/tsconfig.json

eslint *OPTIONS: compile
    eslint . '.github/**/*.{yml,yaml,json,md}' --max-warnings 0 {{OPTIONS}}

eslint-fix: (eslint '--fix')

lint: eslint

lint-fix: eslint-fix

test-unit: compile
    mocha --config mocha.unit.config.json

test-integration: compile
    mocha --config mocha.integration.config.json

test: test-unit test-integration

packtory-dry-run: compile
    packtory publish

packtory-publish: compile
    packtory publish --no-dry-run

release-gate: compile
    github-release-gate
