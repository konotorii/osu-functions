export type gamemode = 'osu' | 'fruits' | 'mania' | 'taiko';

export type score_type = {
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

export type beatmap_type = {
    md5: string;
    scores?: score_type[];
}