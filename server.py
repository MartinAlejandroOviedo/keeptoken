import http.server
import socketserver
import os
from http import HTTPStatus

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        
        # No-cache headers
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        
        super().end_headers()
    
    def do_OPTIONS(self):
        # Manejar preflight requests para CORS
        self.send_response(HTTPStatus.OK)
        self.end_headers()
    
def run_server(port=8000):
    # Cambiar al directorio actual
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", port), CORSRequestHandler) as httpd:
        print(f"Servidor corriendo en http://localhost:{port}")
        print("Presiona Ctrl+C para detener")
        httpd.serve_forever()

if __name__ == "__main__":
    run_server() 