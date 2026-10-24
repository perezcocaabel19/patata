package ui;

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.File;

public class EstiloPixel {

    // Paleta de pocos colores, sin degradados
    public static final Color NEGRO = new Color(0x202020);
    public static final Color CREMA = new Color(0xF8F8E0);
    public static final Color AZUL = new Color(0x3068B0);
    public static final Color CELESTE = new Color(0x70B8E8);
    public static final Color ROJO = new Color(0xE04030);
    public static final Color AMARILLO = new Color(0xF8D030);
    public static final Color VERDE = new Color(0x58B848);
    public static final Color GRIS = new Color(0xC0C0C0);
    public static final Color PASTO_A = new Color(0x78C850);
    public static final Color PASTO_B = new Color(0x68B840);

    private static Font base;

    // Carga la fuente pixelada; si no esta el archivo usa una fuente del sistema
    public static Font fuente(float tamano) {
        if (base == null) {
            try {
                base = Font.createFont(Font.TRUETYPE_FONT,
                        new File("assets/ui/PressStart2P-Regular.ttf"));
            } catch (Exception e) {
                base = new Font(Font.MONOSPACED, Font.BOLD, 12);
            }
        }
        return base.deriveFont(tamano);
    }

    public static JLabel etiqueta(String texto, float tamano) {
        JLabel l = new JLabel(texto);
        l.setFont(fuente(tamano));
        l.setForeground(NEGRO);
        return l;
    }

    // Fondo de cuadros como el pasto de los juegos
    public static class Fondo extends JPanel {
        private final Color a;
        private final Color b;

        public Fondo() {
            this(PASTO_A, PASTO_B);
        }

        public Fondo(Color a, Color b) {
            this.a = a;
            this.b = b;
        }

        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            int t = 32;
            for (int y = 0; y < getHeight(); y += t) {
                for (int x = 0; x < getWidth(); x += t) {
                    g.setColor(((x / t + y / t) % 2 == 0) ? a : b);
                    g.fillRect(x, y, t, t);
                }
            }
        }
    }

    // Cuadro de dialogo: borde negro, linea azul, relleno crema y sombra
    public static class Caja extends JPanel {
        private final Color relleno;

        public Caja(LayoutManager layout) {
            this(layout, CREMA);
        }

        public Caja(LayoutManager layout, Color relleno) {
            super(layout);
            this.relleno = relleno;
            setOpaque(false);
            setBorder(BorderFactory.createEmptyBorder(14, 14, 18, 18));
        }

        @Override
        protected void paintComponent(Graphics g) {
            int w = getWidth();
            int h = getHeight();
            g.setColor(new Color(0, 0, 0, 70));
            g.fillRect(6, 6, w - 6, h - 6);
            g.setColor(NEGRO);
            g.fillRect(0, 0, w - 6, h - 6);
            g.setColor(AZUL);
            g.fillRect(3, 3, w - 12, h - 12);
            g.setColor(relleno);
            g.fillRect(6, 6, w - 18, h - 18);
            super.paintComponent(g);
        }
    }

    // Boton cuadrado con borde negro y barra inferior oscura
    public static class Boton extends JButton {
        private final Color color;
        private boolean encima = false;

        public Boton(String texto, Color color) {
            super(texto);
            this.color = color;
            setFont(fuente(10f));
            setForeground(NEGRO);
            setOpaque(false);
            setContentAreaFilled(false);
            setBorderPainted(false);
            setFocusPainted(false);
            setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
            setPreferredSize(new Dimension(120, 44));
            addMouseListener(new MouseAdapter() {
                @Override
                public void mouseEntered(MouseEvent e) {
                    encima = true;
                    repaint();
                }

                @Override
                public void mouseExited(MouseEvent e) {
                    encima = false;
                    repaint();
                }
            });
        }

        @Override
        protected void paintComponent(Graphics g) {
            int w = getWidth();
            int h = getHeight();
            g.setColor(NEGRO);
            g.fillRect(0, 0, w, h);
            g.setColor(color.darker());
            g.fillRect(3, 3, w - 6, h - 6);
            g.setColor(encima ? color.brighter() : color);
            g.fillRect(3, 3, w - 6, h - 10);
            ((Graphics2D) g).setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING,
                    RenderingHints.VALUE_TEXT_ANTIALIAS_OFF);
            super.paintComponent(g);
        }
    }
}