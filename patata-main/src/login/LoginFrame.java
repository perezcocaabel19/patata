package login;

import clientes.Cliente;
import clientes.RegistroClientes;
import tienda.CatalogoTiendas;
import tienda.PanelTienda;
import tienda.Tienda;
import ui.EstiloPixel;
import ui.SpritePersonaje;

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

public class LoginFrame extends JFrame {

    private JTextField txtNombre;
    private JComboBox<String> cmbBusca;
    private SelectorPersonaje selector;

    public LoginFrame() {
        setTitle("Sistema de Ventas");
        setSize(640, 620);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setResizable(false);

        EstiloPixel.Fondo fondo = new EstiloPixel.Fondo();
        fondo.setLayout(new GridBagLayout());

        EstiloPixel.Caja caja = new EstiloPixel.Caja(new BorderLayout(0, 14));
        caja.setPreferredSize(new Dimension(520, 520));

        JLabel titulo = EstiloPixel.etiqueta("SISTEMA DE VENTAS", 16f);
        titulo.setHorizontalAlignment(SwingConstants.CENTER);
        caja.add(titulo, BorderLayout.NORTH);

        JPanel form = new JPanel();
        form.setOpaque(false);
        form.setLayout(new BoxLayout(form, BoxLayout.Y_AXIS));

        form.add(izq(EstiloPixel.etiqueta("NOMBRE", 10f)));
        form.add(Box.createVerticalStrut(6));
        txtNombre = new JTextField();
        txtNombre.setFont(EstiloPixel.fuente(10f));
        txtNombre.setBackground(EstiloPixel.CREMA);
        txtNombre.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(EstiloPixel.NEGRO, 3),
                BorderFactory.createEmptyBorder(4, 6, 4, 6)));
        txtNombre.setMaximumSize(new Dimension(Integer.MAX_VALUE, 36));
        txtNombre.setPreferredSize(new Dimension(300, 36));
        form.add(izq(txtNombre));

        form.add(Box.createVerticalStrut(14));
        form.add(izq(EstiloPixel.etiqueta("ELIGE TU PERSONAJE", 10f)));
        form.add(Box.createVerticalStrut(6));
        selector = new SelectorPersonaje();
        form.add(izq(selector));

        form.add(Box.createVerticalStrut(14));
        form.add(izq(EstiloPixel.etiqueta("¿QUE BUSCAS?", 10f)));
        form.add(Box.createVerticalStrut(6));
        cmbBusca = new JComboBox<>(CatalogoTiendas.nombres());
        cmbBusca.setFont(EstiloPixel.fuente(10f));
        cmbBusca.setBackground(EstiloPixel.CREMA);
        cmbBusca.setBorder(BorderFactory.createLineBorder(EstiloPixel.NEGRO, 3));
        cmbBusca.setMaximumSize(new Dimension(Integer.MAX_VALUE, 36));
        cmbBusca.setPreferredSize(new Dimension(300, 36));
        form.add(izq(cmbBusca));

        caja.add(form, BorderLayout.CENTER);

        EstiloPixel.Boton btnEntrar = new EstiloPixel.Boton("ENTRAR", EstiloPixel.AMARILLO);
        btnEntrar.addActionListener(e -> entrar());
        caja.add(btnEntrar, BorderLayout.SOUTH);

        fondo.add(caja);
        setContentPane(fondo);
    }

    private <T extends JComponent> T izq(T c) {
        c.setAlignmentX(Component.LEFT_ALIGNMENT);
        return c;
    }

    private void entrar() {
        String nombre = txtNombre.getText().trim();
        if (nombre.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Escribe tu nombre para continuar.");
            return;
        }

        String busca = (String) cmbBusca.getSelectedItem();
        Cliente cliente = null;
        for (Cliente c : RegistroClientes.listar()) {
            if (c.getNombre().equalsIgnoreCase(nombre)) {
                cliente = c;
                break;
            }
        }
        if (cliente == null) {
            cliente = new Cliente(nombre, selector.getSeleccion(), busca);
            RegistroClientes.agregar(cliente);
        } else {
            // Al volver al login se conservan los puntos del cliente
            cliente.setPersonaje(selector.getSeleccion());
            cliente.setBusca(busca);
        }

        // Por ahora abre la tienda elegida; luego el mapa de tu companero llamara esto
        Tienda tienda = CatalogoTiendas.buscar(busca);
        new PanelTienda(cliente, tienda).setVisible(true);
        dispose();
    }

    // Tarjetas con los personajes; se elige con clic
    private static class SelectorPersonaje extends JPanel {
        private static final String[] NOMBRES = {"Chico", "Chica"};
        private static final int ESCALA = 5;
        private static final int ALTO_TARJETA = 128;
        private static final int ANCHO_MINIMO = 120;
        private static final int SEPARACION = 20;
        private final int[] anchos = new int[NOMBRES.length];
        private final int[] posiciones = new int[NOMBRES.length];
        private int elegido = 0;

        SelectorPersonaje() {
            int total = 0;
            for (int i = 0; i < NOMBRES.length; i++) {
                // El ancho de cada tarjeta depende del ancho real de su sprite
                anchos[i] = Math.max(ANCHO_MINIMO, SpritePersonaje.ancho(NOMBRES[i], ESCALA) + 40);
                posiciones[i] = total;
                total += anchos[i] + SEPARACION;
            }
            if (NOMBRES.length > 0) {
                total -= SEPARACION;
            }
            setOpaque(false);
            setPreferredSize(new Dimension(total, ALTO_TARJETA));
            setMaximumSize(new Dimension(total, ALTO_TARJETA));
            addMouseListener(new MouseAdapter() {
                @Override
                public void mousePressed(MouseEvent e) {
                    for (int i = 0; i < NOMBRES.length; i++) {
                        if (e.getX() >= posiciones[i] && e.getX() < posiciones[i] + anchos[i]) {
                            elegido = i;
                            repaint();
                            return;
                        }
                    }
                }
            });
        }

        String getSeleccion() {
            return NOMBRES[elegido];
        }

        @Override
        protected void paintComponent(Graphics g0) {
            Graphics2D g = (Graphics2D) g0;
            for (int i = 0; i < NOMBRES.length; i++) {
                int x = posiciones[i];
                int anchoTarjeta = anchos[i];
                g.setColor(EstiloPixel.NEGRO);
                g.fillRect(x, 0, anchoTarjeta, ALTO_TARJETA);
                g.setColor(i == elegido ? EstiloPixel.AMARILLO : EstiloPixel.CREMA);
                g.fillRect(x + 3, 3, anchoTarjeta - 6, ALTO_TARJETA - 6);
                g.setColor(EstiloPixel.CREMA);
                g.fillRect(x + 7, 7, anchoTarjeta - 14, ALTO_TARJETA - 14);

                int ancho = SpritePersonaje.ancho(NOMBRES[i], ESCALA);
                SpritePersonaje.dibujar(g, x + (anchoTarjeta - ancho) / 2, 12, ESCALA, NOMBRES[i]);

                g.setFont(EstiloPixel.fuente(8f));
                g.setColor(EstiloPixel.NEGRO);
                String texto = NOMBRES[i].toUpperCase();
                int anchoTexto = g.getFontMetrics().stringWidth(texto);
                g.drawString(texto, x + (anchoTarjeta - anchoTexto) / 2, 112);
            }
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new LoginFrame().setVisible(true));
    }
}