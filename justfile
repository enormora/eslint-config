export PATH := './node_modules/.bin:' + env_var('PATH')

default:
    @just --list

compile:
    tsc -p configs/tsconfig.sources.json
    tsc -p test/tsconfig.json

eslint *OPTIONS: compile
    eslint . '.github/**/*.{yml,yaml,json,md}' --max-warnings 0 {{OPTIONS}}

eslint-fix: (eslint '--fix')

lint: eslint

lint-fix: eslint-fix

test: compile
    mocha --config mocha.config.json

packtory-dry-run: compile
    packtory publish
