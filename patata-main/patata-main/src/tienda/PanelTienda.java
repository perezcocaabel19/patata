package tienda;

import clientes.Cliente;
import login.LoginFrame;
import ui.EstiloPixel;
import ui.SpritePersonaje;

import javax.swing.*;
import java.awt.*;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

public class PanelTienda extends JFrame {

    private final Cliente cliente;
    private final Tienda tienda;
    private final Map<Producto, Integer> carrito = new LinkedHashMap<>();

    private final DefaultListModel<Producto> modeloProductos = new DefaultListModel<>();
    private final DefaultListModel<String> modeloCarrito = new DefaultListModel<>();
    private JList<Producto> listaProductos;
    private JList<String> listaCarrito;
    private JLabel lblTotal;
    private JLabel lblDialogo;
    private JLabel lblPuntos;
    private Timer timerTexto;

    public PanelTienda(Cliente cliente, Tienda tienda) {
        this.cliente = cliente;
        this.tienda = tienda;

        setTitle(tienda.getNombre());
        setSize(920, 680);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(DISPOSE_ON_CLOSE);

        EstiloPixel.Fondo fondo = new EstiloPixel.Fondo(tienda.getColorA(), tienda.getColorB());
        fondo.setLayout(new BorderLayout(12, 12));
        fondo.setBorder(BorderFactory.createEmptyBorder(14, 14, 14, 14));

        // Cabecera: personaje + nombre de la tienda + cliente
        EstiloPixel.Caja cabecera = new EstiloPixel.Caja(new BorderLayout(12, 0));
        cabecera.add(new IconoPersonaje(cliente.getPersonaje()), BorderLayout.WEST);
        JPanel textos = new JPanel(new GridLayout(3, 1, 0, 6));
        textos.setOpaque(false);
        textos.add(EstiloPixel.etiqueta(tienda.getNombre().toUpperCase(), 16f));
        textos.add(EstiloPixel.etiqueta("CLIENTE: " + cliente.getNombre(), 10f));
        lblPuntos = EstiloPixel.etiqueta("", 10f);
        textos.add(lblPuntos);
        cabecera.add(textos, BorderLayout.CENTER);
        fondo.add(cabecera, BorderLayout.NORTH);

        // Centro: productos y carrito
        JPanel centro = new JPanel(new GridLayout(1, 2, 14, 0));
        centro.setOpaque(false);

        EstiloPixel.Caja cajaProductos = new EstiloPixel.Caja(new BorderLayout(0, 8));
        cajaProductos.add(EstiloPixel.etiqueta("PRODUCTOS", 12f), BorderLayout.NORTH);
        for (Producto p : tienda.getProductos()) {
            modeloProductos.addElement(p);
        }
        listaProductos = new JList<>(modeloProductos);
        configurarLista(listaProductos);
        // Enter agrega el producto seleccionado, igual que el boton AGREGAR
        listaProductos.addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                if (e.getKeyCode() == KeyEvent.VK_ENTER) {
                    agregar();
                }
            }
        });
        cajaProductos.add(crearScroll(listaProductos), BorderLayout.CENTER);
        centro.add(cajaProductos);

        EstiloPixel.Caja cajaCarrito = new EstiloPixel.Caja(new BorderLayout(0, 8));
        cajaCarrito.add(EstiloPixel.etiqueta("CARRITO", 12f), BorderLayout.NORTH);
        listaCarrito = new JList<>(modeloCarrito);
        configurarLista(listaCarrito);
        cajaCarrito.add(crearScroll(listaCarrito), BorderLayout.CENTER);
        lblTotal = EstiloPixel.etiqueta("TOTAL: S/ 0.00", 12f);
        cajaCarrito.add(lblTotal, BorderLayout.SOUTH);
        centro.add(cajaCarrito);

        fondo.add(centro, BorderLayout.CENTER);

        // Abajo: cuadro de dialogo estilo Pokemon + botones
        EstiloPixel.Caja cajaDialogo = new EstiloPixel.Caja(new BorderLayout());
        cajaDialogo.setPreferredSize(new Dimension(0, 100));
        lblDialogo = EstiloPixel.etiqueta("", 10f);
        lblDialogo.setVerticalAlignment(SwingConstants.TOP);
        cajaDialogo.add(lblDialogo, BorderLayout.CENTER);

        JPanel botones = new JPanel(new GridLayout(1, 5, 10, 0));
        botones.setOpaque(false);
        EstiloPixel.Boton btnAgregar = new EstiloPixel.Boton("AGREGAR", EstiloPixel.VERDE);
        EstiloPixel.Boton btnQuitar = new EstiloPixel.Boton("QUITAR", EstiloPixel.AMARILLO);
        EstiloPixel.Boton btnPagar = new EstiloPixel.Boton("PAGAR", EstiloPixel.CELESTE);
        EstiloPixel.Boton btnCanjes = new EstiloPixel.Boton("CANJES", EstiloPixel.AMARILLO);
        EstiloPixel.Boton btnSalir = new EstiloPixel.Boton("SALIR", EstiloPixel.GRIS);
        btnAgregar.addActionListener(e -> agregar());
        btnQuitar.addActionListener(e -> quitar());
        btnPagar.addActionListener(e -> pagar());
        btnCanjes.addActionListener(e -> canjear());
        btnSalir.addActionListener(e -> salir());
        botones.add(btnAgregar);
        botones.add(btnQuitar);
        botones.add(btnPagar);
        botones.add(btnCanjes);
        botones.add(btnSalir);

        JPanel sur = new JPanel(new BorderLayout(0, 10));
        sur.setOpaque(false);
        sur.add(cajaDialogo, BorderLayout.CENTER);
        sur.add(botones, BorderLayout.SOUTH);
        fondo.add(sur, BorderLayout.SOUTH);

        setContentPane(fondo);
        actualizarPuntos();
        decir(tienda.getSaludo());
    }

    // ---------- Logica de ventas ----------

    private void agregar() {
        Producto p = listaProductos.getSelectedValue();
        if (p == null) {
            decir("Primero elige un producto de la lista.");
            return;
        }
        int actual = carrito.getOrDefault(p, 0);
        if (actual >= p.getStock()) {
            decir("Lo siento, ya no hay mas stock de " + p.getNombre() + ".");
            return;
        }
        carrito.put(p, actual + 1);
        refrescarCarrito();
        decir("Agregaste " + p.getNombre() + " al carrito.");
    }

    private void quitar() {
        int indice = listaCarrito.getSelectedIndex();
        if (indice < 0) {
            decir("Elige un producto del carrito para quitarlo.");
            return;
        }
        Producto elegido = null;
        int k = 0;
        for (Producto p : carrito.keySet()) {
            if (k == indice) {
                elegido = p;
                break;
            }
            k++;
        }
        if (elegido == null) {
            return;
        }
        int cantidad = carrito.get(elegido);
        if (cantidad > 1) {
            carrito.put(elegido, cantidad - 1);
        } else {
            carrito.remove(elegido);
        }
        refrescarCarrito();
        decir("Quitaste " + elegido.getNombre() + " del carrito.");
    }

    private void pagar() {
        if (carrito.isEmpty()) {
            decir("Tu carrito esta vacio.");
            return;
        }
        double total = calcularTotal();
        for (Map.Entry<Producto, Integer> e : carrito.entrySet()) {
            e.getKey().restarStock(e.getValue());
        }
        // Puntos como en la web: 1 punto por cada sol gastado
        int ganados = (int) Math.round(total);
        cliente.agregarPuntos(ganados);
        carrito.clear();
        refrescarCarrito();
        // Refrescar la lista para mostrar el stock actualizado
        listaProductos.revalidate();
        listaProductos.repaint();
        actualizarPuntos();
        decir("¡Gracias por tu compra, " + cliente.getNombre() + "! Total pagado: S/ "
                + String.format(Locale.US, "%.2f", total) + ". Ganaste " + ganados
                + " puntos. Ahora tienes " + cliente.getPuntos() + " puntos.");
    }

    private double calcularTotal() {
        double total = 0;
        for (Map.Entry<Producto, Integer> e : carrito.entrySet()) {
            total += e.getKey().getPrecio() * e.getValue();
        }
        return total;
    }

    // ---------- Puntos y canjes ----------

    private void actualizarPuntos() {
        if (lblPuntos != null) {
            lblPuntos.setText("PUNTOS: " + cliente.getPuntos() + " ⭐");
        }
    }

    private void canjear() {
        List<CanjesPlaza.Premio> premios = CanjesPlaza.listar();
        if (premios.isEmpty()) {
            decir("No hay premios disponibles por ahora.");
            return;
        }
        String[] opciones = new String[premios.size()];
        for (int i = 0; i < premios.size(); i++) {
            CanjesPlaza.Premio p = premios.get(i);
            opciones[i] = p.getNombre() + " - " + p.getCostoPuntos() + " pts";
        }
        String elegido = (String) JOptionPane.showInputDialog(this,
                "Tus puntos: " + cliente.getPuntos() + "\nElige el premio que deseas canjear:",
                "Canjes de la Plaza de Armas",
                JOptionPane.PLAIN_MESSAGE, null, opciones, opciones[0]);
        if (elegido == null) {
            return;
        }
        int indice = -1;
        for (int i = 0; i < opciones.length; i++) {
            if (opciones[i].equals(elegido)) {
                indice = i;
                break;
            }
        }
        if (indice < 0) {
            return;
        }
        CanjesPlaza.Premio premio = premios.get(indice);
        if (cliente.getPuntos() < premio.getCostoPuntos()) {
            int faltan = premio.getCostoPuntos() - cliente.getPuntos();
            decir("Te faltan " + faltan + " puntos para canjear " + premio.getNombre() + ".");
            return;
        }
        int respuesta = JOptionPane.showConfirmDialog(this,
                "¿Canjear \"" + premio.getNombre() + "\" por " + premio.getCostoPuntos() + " puntos?",
                "Confirmar canje", JOptionPane.YES_NO_OPTION);
        if (respuesta != JOptionPane.YES_OPTION) {
            return;
        }
        cliente.restarPuntos(premio.getCostoPuntos());
        actualizarPuntos();
        decir("¡Canjeaste " + premio.getNombre() + "! Te quedan " + cliente.getPuntos() + " puntos.");
    }

    // SALIR vuelve al login para cambiar de personaje sin cerrar la aplicacion
    private void salir() {
        new LoginFrame().setVisible(true);
        dispose();
    }

    private void refrescarCarrito() {
        modeloCarrito.clear();
        for (Map.Entry<Producto, Integer> e : carrito.entrySet()) {
            Producto p = e.getKey();
            int cant = e.getValue();
            modeloCarrito.addElement(String.format(Locale.US, "%-16s x%-2d S/%6.2f",
                    p.getNombre(), cant, p.getPrecio() * cant));
        }
        lblTotal.setText(String.format(Locale.US, "TOTAL: S/ %.2f", calcularTotal()));
    }

    // ---------- Parte visual ----------

    // Texto que se escribe letra por letra, como en los juegos
    private void decir(String texto) {
        if (timerTexto != null) {
            timerTexto.stop();
        }
        lblDialogo.setText("");
        final int[] i = {0};
        timerTexto = new Timer(25, e -> {
            i[0]++;
            lblDialogo.setText("<html>" + texto.substring(0, i[0]) + "</html>");
            if (i[0] >= texto.length()) {
                ((Timer) e.getSource()).stop();
            }
        });
        timerTexto.start();
    }

    private <T> void configurarLista(JList<T> lista) {
        lista.setCellRenderer(new RenderizadorLista());
        lista.setBackground(EstiloPixel.CREMA);
        lista.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
    }

    private JScrollPane crearScroll(JComponent c) {
        JScrollPane s = new JScrollPane(c);
        s.setBorder(BorderFactory.createLineBorder(EstiloPixel.NEGRO, 3));
        s.getViewport().setBackground(EstiloPixel.CREMA);
        return s;
    }

    // Muestra el cursor ">" en el elemento elegido, como el menu de Pokemon
    private static class RenderizadorLista extends DefaultListCellRenderer {
        @Override
        public Component getListCellRendererComponent(JList<?> list, Object value, int index,
                                                      boolean seleccionado, boolean foco) {
            super.getListCellRendererComponent(list, value, index, seleccionado, false);
            setText((seleccionado ? "> " : "  ") + value);
            setFont(EstiloPixel.fuente(10f));
            setBackground(seleccionado ? EstiloPixel.AMARILLO : EstiloPixel.CREMA);
            setForeground(EstiloPixel.NEGRO);
            setBorder(BorderFactory.createEmptyBorder(4, 4, 4, 4));
            return this;
        }
    }

    private static class IconoPersonaje extends JComponent {
        private final String tipo;

        IconoPersonaje(String tipo) {
            this.tipo = tipo;
            setPreferredSize(new Dimension(SpritePersonaje.ANCHO * 3, SpritePersonaje.ALTO * 3));
        }

        @Override
        protected void paintComponent(Graphics g) {
            SpritePersonaje.dibujar(g, 0, 0, 3, tipo);
        }
    }
}