package tienda;

import java.util.Locale;

public class Producto {
    private final String nombre;
    private final double precio;
    private int stock;

    public Producto(String nombre, double precio, int stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    public String getNombre() { return nombre; }
    public double getPrecio() { return precio; }
    public int getStock() { return stock; }

    public void restarStock(int cantidad) {
        stock -= cantidad;
    }

    @Override
    public String toString() {
        return String.format(Locale.US, "%-16s S/%6.2f  x%d", nombre, precio, stock);
    }
}