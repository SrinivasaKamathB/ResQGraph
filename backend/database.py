import sqlite3
import json
import os
from datetime import datetime
from typing import List, Dict, Any

DB_PATH = "resqgraph.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS reports (
        id TEXT PRIMARY KEY,
        text TEXT,
        language TEXT,
        timestamp TEXT,
        source TEXT,
        audio_url TEXT,
        extracted_data TEXT
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS incidents (
        id TEXT PRIMARY KEY,
        reports TEXT,
        lat REAL,
        lng REAL,
        merged_location TEXT,
        confidence_score REAL,
        risk_score REAL,
        status TEXT
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS dispatch_plans (
        id TEXT PRIMARY KEY,
        plan_data TEXT,
        timestamp TEXT
    )
    ''')
    
    conn.commit()
    conn.close()

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn
