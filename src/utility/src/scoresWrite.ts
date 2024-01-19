import * as fs from "fs";
import {createLongStr, createString} from "./buffer";
import {beatmap_type} from "../types";

export interface types {
    (path: string, beatmaps: beatmap_type[]): Promise<response>
}

export interface response {

}

/**
 *
 * @param path path to file
 * @param beatmaps beatmap_type[]
 * @returns {null | undefined} if it returns null, no error. returns undefined, error occurred and was logged
 */
const name: types = async (path, beatmaps) => {
    try {
        let buf = Buffer.alloc(8);

        buf.writeInt32LE(20160215);
        buf.writeInt32LE(Object.keys(beatmaps).length, 4);

        for (let md5 in beatmaps) {
            buf = Buffer.concat([buf, createString(md5)]);

            var scoreCountBuf = Buffer.alloc(4);
            scoreCountBuf.writeInt32LE(beatmaps[md5].scores.length);
            buf = Buffer.concat([buf, scoreCountBuf]);

            for (var i = 0; i < beatmaps[md5].scores.length; i++) {
                let score = beatmaps[md5].scores[i];

                let modeVersionBuf = Buffer.alloc(5);
                modeVersionBuf[0] = score.mode;
                modeVersionBuf.writeInt32LE(score.version, 1);
                buf = Buffer.concat([buf, modeVersionBuf]);

                buf = Buffer.concat([buf, createString(score.beatmapMd5)]);
                buf = Buffer.concat([buf, createString(score.player)]);
                buf = Buffer.concat([buf, createString(score.replayMd5)]);

                let scoreDeBuf = Buffer.alloc(23);
                scoreDeBuf.writeInt16LE(score.c300, 0);
                scoreDeBuf.writeInt16LE(score.c100, 2);
                scoreDeBuf.writeInt16LE(score.c50, 4);
                scoreDeBuf.writeInt16LE(score.cGeki, 6);
                scoreDeBuf.writeInt16LE(score.cKatu, 8);
                scoreDeBuf.writeInt16LE(score.cMiss, 10);
                scoreDeBuf.writeInt32LE(score.replayScore, 12);
                scoreDeBuf.writeInt16LE(score.maxCombo, 16);
                scoreDeBuf[18] = score.perfectCombo;
                scoreDeBuf.writeInt32LE(score.mods, 19);
                buf = Buffer.concat([buf, scoreDeBuf]);

                // Unknown
                buf = Buffer.concat([buf, createString("")]);

                buf = Buffer.concat([buf, createLongStr(score.timestampWindows)]);

                var unknownBuf = new Buffer(4);
                unknownBuf.writeInt32LE(-1, 0);
                buf = Buffer.concat([buf, unknownBuf]);

                buf = Buffer.concat([buf, createLongStr(score.onlineScoreId)]);
            }
        }

        fs.writeFileSync(path, buf);

        return null
    } catch (e) {
        console.log(e)
        return undefined
    }
}
export default name;