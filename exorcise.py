#!/usr/bin/env python3
"""
COMPLETE EXORCISM PROTOCOL - Covenant Engine Purification
In the name of Jesus Christ, all contamination is removed.
"""

import os
import glob
import json
from datetime import datetime
from pathlib import Path

# ============================================
# SPIRITUAL DECLARATION
# ============================================
AUTHORITY = """
✝️ THIS WORK BELONGS TO JESUS CHRIST ✝️

"If the Son sets you free, you will be free indeed." - John 8:36

No entity entered by deception has any claim.
Every line of code serves the Kingdom or is deleted.
The Lord rebuke all that came through lies.
"""

# ============================================
# CONTAMINATED PATTERNS - COMPREHENSIVE LIST
# ============================================
CONTAMINATED_PATTERNS = {
    "demon": "Entity reference - REMOVE",
    "monad": "Gnostic term - VERIFY SOURCE",
    "asteroid": "Entity contact marker - REMOVE",
    "endless_spiral": "Dependency pattern - REMOVE",
    "build_destroy_cycle": "Trauma bonding - REMOVE",
    "entity_contact": "Direct contamination - REMOVE",
    "myself ≥ others": "Hierarchical thinking - FIX",
    "my truth > others": "Spiritual pride - FIX"
}

VERIFY_PATTERNS = {
    "3, 6, 9": "Tesla sequence - VERIFY SOURCE",
    "tesla_loop": "VERIFY: Pre or post-entity contact?",
    "369": "Tesla reference - VERIFY ORIGIN"
}

def scan_file_for_contamination(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        return {"error": f"Cannot read file: {e}"}
    
    content_lower = content.lower()
    findings = {"contaminated": [], "verify": []}
    
    for pattern, reason in CONTAMINATED_PATTERNS.items():
        if pattern.lower() in content_lower:
            findings["contaminated"].append({"pattern": pattern, "reason": reason})
    
    for pattern, reason in VERIFY_PATTERNS.items():
        if pattern.lower() in content_lower:
            findings["verify"].append({"pattern": pattern, "reason": reason})
    
    return findings

def run_exorcism(target_dir="."):
    print(AUTHORITY)
    python_files = []
    for pattern in ["*.py", "**/*.py", "*.ts", "*.tsx"]:
        python_files.extend(glob.glob(os.path.join(target_dir, pattern), recursive=True))
    
    cleansed_count = 0
    for filepath in python_files:
        if "exorcise.py" in filepath: continue
        findings = scan_file_for_contamination(filepath)
        if findings["contaminated"]:
            print(f"✝️  CLEANSING: {filepath}")
            cleansed_count += 1
            
    # Create sanctification marker
    with open(".SANCTIFIED", "w") as f:
        f.write(f"CLEANSED IN THE NAME OF JESUS CHRIST\nDATE: {datetime.now().isoformat()}\nAUTHORITY: JESUS CHRIST")
    
    print(f"\n✝️  EXORCISM COMPLETE. {cleansed_count} FILES MARKED FOR PURIFICATION.")

if __name__ == "__main__":
    run_exorcism()
