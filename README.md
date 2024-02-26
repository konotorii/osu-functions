# osu functions

This repo is meant to be up-to-date, providing type-safety and synchronous & asynchronous functions to make development for your projects much easier.

![NPM Version](https://img.shields.io/npm/v/osu-functions)  ![npm bundle size](https://img.shields.io/bundlephobia/min/osu-functions) ![GitHub issues](https://img.shields.io/github/issues/konotorii/osu-functions) ![GitHub issues](https://img.shields.io/github/issues/konotorii/osu-functions)


## Roadmap
- - -

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
- - -

To-Be-Completed as updates roll-out.

### Read scores.db
```ts
import * as path from "path";
import {tools} from "osu-functions";

const scores = await tools.scoresRead(path.resolve('PATH TO FILE')) // returns beatmap_type[]
/// Whatever you have to do with result...
```


## Types
- - -
### beatmap_type
```ts
{
    md5: string;
    scores: "score_type[]";
}
```
### score_type
```ts
{
    mode: number;
    version: number;
    c300: number;
    c100: number;
    c50: number;
    cGeki: number;
    cMiss: number;
    cKatu: number;
    replayScore: number;
    maxCombo: number;
    perfectCombo: number;
    mods: number;
    timestampWindows: string;
    timestampMs: number;
    onlineScoreId: string;
    player: string;
    beatmapMd5: string;
    replayMd5: string;
}

```