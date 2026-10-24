package ui;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.HashMap;
import java.util.Map;

// Dibuja el personaje. Si existe el frame real en assets/PERSONAJE/frames usa esa imagen;
// si no, dibuja un sprite pixel art de prueba hecho con codigo.
public class SpritePersonaje {

    public static final int ANCHO = 12;
    public static final int ALTO = 15;

    // K = contorno, H = pelo, S = piel, C = camisa, P = pantalon
    private static final String[] DISENO = {
        "....KKKK....",
        "...KHHHHK...",
        "..KHHHHHHK..",
        "..KHHHHHHK..",
        "..KSSSSSSK..",
        "..KSKSSKSK..",
        "..KSSSSSSK..",
        "...KSSSSK...",
        "..KCCCCCCK..",
        ".KCCCCCCCCK.",
        ".KSCCCCCCSK.",
        "..KCCCCCCK..",
        "..KPPPPPPK..",
        "..KPPKKPPK..",
        "..KKK..KKK.."
    };

    private static final Map<String, BufferedImage> cache = new HashMap<>();

    // Ruta del frame real de cada personaje
    private static String ruta(String tipo) {
        if ("Chico".equals(tipo)) {
            return "assets/PERSONAJE/frames/p1-f1.png";
        }
        if ("Chica".equals(tipo)) {
            return "assets/PERSONAJE/frames/p2-f1.png";
        }
        return null;
    }

    private static BufferedImage imagen(String tipo) {
        String ruta = ruta(tipo);
        if (ruta == null) {
            return null;
        }
        if (!cache.containsKey(ruta)) {
            BufferedImage img = null;
            try {
                File f = new File(ruta);
                if (f.exists()) {
                    img = ImageIO.read(f);
                }
            } catch (Exception e) {
                img = null;
            }
            cache.put(ruta, img);
        }
        return cache.get(ruta);
    }

    // Alto final del sprite al dibujarse con la escala elegida
    public static int alto(String tipo, int escala) {
        return ALTO * escala;
    }

    // Ancho final calculado con la proporcion real de la imagen, sin deformarla
    public static int ancho(String tipo, int escala) {
        BufferedImage img = imagen(tipo);
        int alto = alto(tipo, escala);
        if (img != null && img.getHeight() > 0) {
            return Math.max(1, Math.round(img.getWidth() * (float) alto / img.getHeight()));
        }
        return ANCHO * escala;
    }

    public static void dibujar(Graphics g0, int x, int y, int escala, String tipo) {
        Graphics2D g = (Graphics2D) g0;

        BufferedImage img = imagen(tipo);
        if (img != null) {
            // Sin suavizado para que los pixeles se vean cuadrados
            g.setRenderingHint(RenderingHints.KEY_INTERPOLATION,
                    RenderingHints.VALUE_INTERPOLATION_NEAREST_NEIGHBOR);
            g.drawImage(img, x, y, ancho(tipo, escala), alto(tipo, escala), null);
            return;
        }

        Color contorno = new Color(0x202020);
        Color piel = new Color(0xF8C8A0);
        Color pelo;
        Color camisa;
        Color pantalon;
        switch (tipo) {
            case "Chica":
                pelo = new Color(0xD87820);
                camisa = new Color(0xF080A0);
                pantalon = new Color(0x4060B0);
                break;
            default:
                pelo = new Color(0x604020);
                camisa = new Color(0xE04030);
                pantalon = new Color(0x3050A0);
        }

        for (int fila = 0; fila < ALTO; fila++) {
            for (int col = 0; col < ANCHO; col++) {
                Color color;
                switch (DISENO[fila].charAt(col)) {
                    case 'K': color = contorno; break;
                    case 'H': color = pelo; break;
                    case 'S': color = piel; break;
                    case 'C': color = camisa; break;
                    case 'P': color = pantalon; break;
                    default: continue;
                }
                g.setColor(color);
                g.fillRect(x + col * escala, y + fila * escala, escala, escala);
            }
        }
    }
}