"""Servidor local para el proyecto Ventas GO.

Uso:
    python servidor.py              -> abre el navegador
    python servidor.py --no-browser -> no abre el navegador

Sirve los archivos del proyecto y desactiva la cache, para que al
reemplazar zonas.js (o cualquier archivo) se vea el cambio al recargar.
"""

import http.server
import os
import socketserver
import sys
import threading
import webbrowser

PUERTO_INICIAL = 8000


class Manejador(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, formato, *args):
        # silenciar el ruido de cada peticion
        pass


def main():
    raiz = os.path.dirname(os.path.abspath(__file__))
    os.chdir(raiz)

    puerto = PUERTO_INICIAL
    servidor = None
    for intento in range(10):
        try:
            servidor = socketserver.TCPServer(("127.0.0.1", puerto), Manejador)
            break
        except OSError:
            puerto += 1

    if servidor is None:
        print("No se pudo abrir ningun puerto entre 8000 y 8009.")
        sys.exit(1)

    url = "http://localhost:%d/index.html" % puerto
    print("Servidor Ventas GO en marcha: %s" % url)
    print("Mapa 2D:      %s/js/mapa/mapa2d.html" % url.rsplit("/", 1)[0])
    print("Editor zonas: %s/js/mapa/editor-zonas.html" % url.rsplit("/", 1)[0])
    print("Ctrl+C para detener.")

    if "--no-browser" not in sys.argv:
        threading.Timer(0.7, lambda: webbrowser.open(url)).start()

    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
    finally:
        servidor.server_close()


if __name__ == "__main__":
    main()
