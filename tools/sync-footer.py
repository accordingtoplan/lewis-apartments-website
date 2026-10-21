#!/usr/bin/env python3
"""Copy includes/footer.html into every page, so the footer (and its legal lines)
is in the HTML itself and does not depend on JavaScript.

Edit includes/footer.html only, then run:
    python3 tools/sync-footer.py
"""
import pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
footer = (ROOT / "includes" / "footer.html").read_text().strip()
block = re.compile(r'<div id="footer-include"[^>]*>.*?</div><!-- /footer-include -->|<div id="footer-include"></div>', re.S)
count = 0
for page in sorted(ROOT.rglob("*.html")):
    if "includes" in page.parts or ".git" in page.parts:
        continue
    text = page.read_text()
    if not block.search(text):
        continue
    new = block.sub(lambda m: f'<div id="footer-include" data-static="1">\n{footer}\n</div><!-- /footer-include -->', text, count=1)
    if new != text:
        page.write_text(new)
        count += 1
print(f"footer synced into {count} pages")
