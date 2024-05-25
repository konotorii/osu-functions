import * as fs from 'fs'
import {readLongStr, readString, winTickToMs} from "./buffer";
import {beatmap_type, score_type} from "../types";

export interface types {
    (path: string): Promise<score_type[]>
}

/**
 *
 * @param path relative or absolute path to file
 * @returns {score_type} beatmap objects with scores
 */

export const name: types = async (path) => {
    try {
        const file = fs.readFileSync(path)

        let scores: score_type[] = [];

        const version = file.readInt32LE(0);
        const beatmapCount = file.readInt32LE(4);
        let offset = 8;
        for (let i = 0; i < beatmapCount; i++) {
            const md5 = readString(file, offset);
            // if (!beatmaps.includes({md5: md5.str})) beatmaps[i].scores = [];
            offset += md5.length;

            const scoreCount = file.readInt32LE((offset += 4) - 4);

            for (let j = 0; j < scoreCount; j++) {
                let score: score_type = {
                    mods: 0,
                    version: 0,
                    mode: 0,
                    c50: 0,
                    c100: 0,
                    c300: 0,
                    cGeki: 0,
                    cKatu: 0,
                    cMiss: 0,
                    maxCombo: 0,
                    perfectCombo: 0,
                    player: "",
                    replayScore: 0,
                    replayMd5: "",
                    beatmapMd5: "",
                    timestampMs: 0,
                    timestampWindows: "",
                    onlineScoreId: "",
                };

                score.mode = file[offset++];
                score.version = file.readInt32LE((offset += 4) - 4);

                const gets = ["beatmapMd5", "player", "replayMd5"];
                let count = 0
                for (let get in gets) {
                    const strobj = readString(file, offset);
                    // console.log(strobj)
                    if (count == 0) score.beatmapMd5 = strobj.str
                    else if (count == 1) score.player = strobj.str
                    else if (count == 2) score.replayMd5 = strobj.str
                    // score[gets[get]] = strobj.str;

                    count++
                    offset += strobj.length;
                }

                score.c300 = file.readUInt16LE((offset += 2) - 2);
                score.c100 = file.readUInt16LE((offset += 2) - 2);
                score.c50 = file.readUInt16LE((offset += 2) - 2);
                score.cGeki = file.readUInt16LE((offset += 2) - 2);
                score.cKatu = file.readUInt16LE((offset += 2) - 2);
                score.cMiss = file.readUInt16LE((offset += 2) - 2);
                score.replayScore = file.readInt32LE((offset += 4) - 4);
                score.maxCombo = file.readUInt16LE((offset += 2) - 2);
                score.perfectCombo = file[offset++];
                score.mods = file.readInt32LE((offset += 4) - 4);

                // Unknown
                offset += readString(file, offset).length;

                // Timestamp
                score.timestampWindows = readLongStr(file, (offset += 8) - 8);
                score.timestampMs = winTickToMs(score.timestampWindows);

                // Unknown
                offset += 4;

                // Online score id
                score.onlineScoreId = readLongStr(file, (offset += 8) - 8);

                // Add
                // console.log(beatmaps[i])
                // beatmaps[i].scores = []
                // beatmaps[i].scores.push(score);
                scores.push(score)
            }
        }

        return scores;
    } catch (err) {
        console.log(err)
        return [];
    }
}