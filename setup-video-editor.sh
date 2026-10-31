#!/bin/bash
# Claude video editor toolchain (VenomsTech.AI guide), pinned to versions tested together.
# ffmpeg, Python 3 and Node.js already come with the image.
set -euo pipefail

# Python Playwright must match the image's Chromium, which belongs to the Node Playwright.
PW=$(cd /tmp && node -e "console.log(require('playwright/package.json').version)" 2>/dev/null || echo 1.63.0)

# av 19 breaks faster-whisper 1.2.1 (av.open no longer takes metadata_errors).
pip install --root-user-action=ignore -q \
  numpy==2.5.3 scipy==1.18.1 soundfile==0.14.0 pillow==12.3.0 opencv-python==5.0.0.93 \
  faster-whisper==1.2.1 av==18.1.0 "playwright==$PW"

# CPU-only builds: no GPU here, and the default wheels pull in several GB of CUDA.
pip install --root-user-action=ignore -q torch==2.15.0 torchaudio==2.11.1 \
  --index-url https://download.pytorch.org/whl/cpu

# Cache HyperFrames so the first npx call is instant.
(cd /tmp && npx -y hyperframes@0.8.223 --version >/dev/null)

# Optional: pre-download models (otherwise they download on first use).
# Adds about a minute to every session start, mostly the 1.18 GB alignment model.
# python3 -c "from faster_whisper import WhisperModel; WhisperModel('small', device='cpu', compute_type='int8')"
# python3 -c "import torchaudio; torchaudio.pipelines.MMS_FA.get_model()"

python3 -c "import numpy, scipy, soundfile, PIL, cv2, faster_whisper, torch, torchaudio, playwright"
echo "video editor toolchain ready"
