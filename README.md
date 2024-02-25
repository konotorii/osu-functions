# osu functions

This repo is meant to be up-to-date, providing type-safety and synchronous & asynchronous functions to make development for your projects much easier.

![NPM Version](https://img.shields.io/npm/v/osu-functions)  ![npm bundle size](https://img.shields.io/bundlephobia/min/osu-functions) ![GitHub issues](https://img.shields.io/github/issues/konotorii/osu-functions) ![GitHub issues](https://img.shields.io/github/issues/konotorii/osu-functions)


## Roadmap

- Write scores.db
- Read collections.db
- Write collections.db
- Read osu!.db
- Write osu!.db
- Read .osr
- Write .osr
- Read .osu
- Write .osu


## Features

To-Be-Completed as updates roll-out.

### Read scores.db
```ts
import * as path from "path";

const read = await scoresRead(path.resolve('PATH TO FILE'))
/// Whatever you have to do with result...
```