import http.server
import socketserver
import webbrowser
import sys

PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}/index.html"
        print("=" * 60)
        print(f" Servidor Ventas GO iniciado: {url}")
        print(" Presiona Ctrl + C para detener el servidor.")
        print("=" * 60)
        webbrowser.open(url)
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServidor detenido.")
    sys.exit(0)
except Exception as e:
    print(f"Error al iniciar el servidor: {e}")
    sys.exit(1)
