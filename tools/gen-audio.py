"""Generate all app audio clips with edge-tts (free Microsoft neural voices).

Usage:
    node tools/make-manifest.mjs > tools/audio-manifest.json
    py tools/gen-audio.py            # writes assets/audio/*.mp3 (skips existing)
    py tools/gen-audio.py --force    # regenerate everything
"""
import asyncio
import json
import sys
from pathlib import Path

import edge_tts

VOICE = "en-IN-NeerjaExpressiveNeural"
RATE = "-8%"      # a touch slower for a 3-year-old
CONCURRENCY = 6

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "audio"
MANIFEST = Path(__file__).resolve().parent / "audio-manifest.json"


async def gen(sem: asyncio.Semaphore, key: str, text: str, force: bool) -> str:
    path = OUT / f"{key}.mp3"
    if path.exists() and not force:
        return "skip"
    async with sem:
        for attempt in range(3):
            try:
                tts = edge_tts.Communicate(text, VOICE, rate=RATE)
                await tts.save(str(path))
                return "ok"
            except Exception as e:  # noqa: BLE001 - retry then report
                if attempt == 2:
                    print(f"FAIL {key}: {e}", file=sys.stderr)
                    return "fail"
                await asyncio.sleep(2 * (attempt + 1))
    return "fail"


async def main() -> None:
    force = "--force" in sys.argv
    clips = json.loads(MANIFEST.read_text(encoding="utf-8-sig"))
    OUT.mkdir(parents=True, exist_ok=True)
    sem = asyncio.Semaphore(CONCURRENCY)
    results = await asyncio.gather(
        *(gen(sem, k, t, force) for k, t in clips.items())
    )
    ok = results.count("ok")
    skip = results.count("skip")
    fail = results.count("fail")
    print(f"done: {ok} generated, {skip} skipped, {fail} failed of {len(clips)}")


if __name__ == "__main__":
    asyncio.run(main())
