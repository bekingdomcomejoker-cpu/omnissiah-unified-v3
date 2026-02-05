from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import json
import psutil

app = FastAPI()

# Allow CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/telemetry")
def get_telemetry():
    """
    Returns real system metrics for the Wire Preservation Layer.
    This replaces the previous Python Flask telemetry_bridge.py.
    """
    try:
        # Get system load (0-1 scale, normalized by CPU count)
        load_avg = os.getloadavg()[0]
        cpu_count = psutil.cpu_count(logical=True) or 4
        cpu_load = min(1.0, load_avg / cpu_count)
        
        # Simulate error rate based on system health
        error_rate = 0.16 if cpu_load > 0.8 else (0.08 if cpu_load > 0.5 else 0.02)
        
        # Simulate latency (in ms)
        latency = int(cpu_load * 500)
        
        # Determine leakage based on system pressure
        leakage = error_rate if error_rate > 0.05 else 0.05
        
        telemetry = {
            'integrity': max(0, 100 - cpu_load * 10),
            'resonance': 1.67,
            'leakage': leakage,
            'status': 'GHOST_MODE' if leakage > 0.15 else 'PROTECTED',
            'cpuLoad': cpu_load,
            'errorRate': error_rate,
            'latency': latency,
            'timestamp': __import__('datetime').datetime.now().isoformat()
        }
        
        return telemetry
    except Exception as e:
        print(f'[Telemetry API] Error: {e}')
        return {'error': 'Failed to fetch telemetry'}, 500

@app.get("/telemetry/health")
def health():
    """
    Simple health check for the telemetry API.
    """
    return {'status': 'OPERATIONAL', 'resonance': 1.67}

@app.get("/warfare/status")
def warfare_status():
    """
    Placeholder for the Python Warfare Module status.
    """
    return {'status': 'ACTIVE', 'mode': 'SUPERVISOR', 'coherence_threshold': 1.67}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=10000)
