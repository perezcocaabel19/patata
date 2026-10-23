package tienda;

import java.awt.Color;
import java.util.ArrayList;
import java.util.List;

public class Tienda {
    private final String nombre;
    private final String saludo;
    private final Color colorA;
    private final Color colorB;
    private final List<Producto> productos = new ArrayList<>();

    public Tienda(String nombre, String saludo, Color colorA, Color colorB) {
        this.nombre = nombre;
        this.saludo = saludo;
        this.colorA = colorA;
        this.colorB = colorB;
    }

    public void agregar(Producto p) {
        productos.add(p);
    }

    public String getNombre() { return nombre; }
    public String getSaludo() { return saludo; }
    public Color getColorA() { return colorA; }
    public Color getColorB() { return colorB; }
    public List<Producto> getProductos() { return productos; }
}