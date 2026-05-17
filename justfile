export PATH := './node_modules/.bin:' + env_var('PATH')

default:
    @just --list

eslint *OPTIONS:
    eslint . '.github/**/*.{yml,yaml,json,md}' --max-warnings 0 {{OPTIONS}}

eslint-fix: (eslint '--fix')

lint: eslint

lint-fix: eslint-fix

test:
    ava

packtory-dry-run:
    packtory publish
