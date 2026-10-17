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
        Cliente cliente = new Cliente(nombre, selector.getSeleccion(), busca);
        RegistroClientes.agregar(cliente);

        // Por ahora abre la tienda elegida; luego el mapa de tu companero llamara esto
        Tienda tienda = CatalogoTiendas.buscar(busca);
        new PanelTienda(cliente, tienda).setVisible(true);
        dispose();
    }

    // Tarjetas con los personajes; se elige con clic
    private static class SelectorPersonaje extends JPanel {
        private static final String[] NOMBRES = {"Chico", "Chica", "Veterano"};
        private int elegido = 0;

        SelectorPersonaje() {
            setOpaque(false);
            setPreferredSize(new Dimension(420, 130));
            setMaximumSize(new Dimension(420, 130));
            addMouseListener(new MouseAdapter() {
                @Override
                public void mousePressed(MouseEvent e) {
                    int i = e.getX() / 140;
                    if (i >= 0 && i < NOMBRES.length) {
                        elegido = i;
                        repaint();
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
            int escala = 5;
            for (int i = 0; i < NOMBRES.length; i++) {
                int x = i * 140;
                g.setColor(EstiloPixel.NEGRO);
                g.fillRect(x + 10, 0, 120, 128);
                g.setColor(i == elegido ? EstiloPixel.AMARILLO : EstiloPixel.CREMA);
                g.fillRect(x + 13, 3, 114, 122);
                g.setColor(EstiloPixel.CREMA);
                g.fillRect(x + 17, 7, 106, 114);

                int ancho = SpritePersonaje.ANCHO * escala;
                SpritePersonaje.dibujar(g, x + 10 + (120 - ancho) / 2, 12, escala, NOMBRES[i]);

                g.setFont(EstiloPixel.fuente(8f));
                g.setColor(EstiloPixel.NEGRO);
                String texto = NOMBRES[i].toUpperCase();
                int anchoTexto = g.getFontMetrics().stringWidth(texto);
                g.drawString(texto, x + 10 + (120 - anchoTexto) / 2, 112);
            }
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new LoginFrame().setVisible(true));
    }
}