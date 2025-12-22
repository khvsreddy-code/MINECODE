import http.server
import socketserver
import os

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Serve static files if they exist
        path = self.translate_path(self.path)
        if os.path.exists(path) and os.path.isfile(path):
            super().do_GET()
        else:
            # Fallback to dashboard.html for SPA routing
            # Check if likely an asset request first to avoid sending html for missing images
            if any(self.path.endswith(ext) for ext in ['.png', '.jpg', '.css', '.js', '.ico']):
                self.send_error(404, "File not found")
            else:
                self.path = '/dashboard.html'
                super().do_GET()

os.chdir(DIRECTORY)

with socketserver.TCPServer(("", PORT), SPAHandler) as httpd:
    print(f"✅ MineCode Server running at http://localhost:{PORT}")
    print(f"👉 Press Ctrl+C to stop")
    print(f"🚀 Supporting routes like /courses/python")
    httpd.serve_forever()
