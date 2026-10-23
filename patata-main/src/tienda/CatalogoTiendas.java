package tienda;

import java.awt.Color;
import java.util.ArrayList;
import java.util.List;

// Aqui estan todas las tiendas. Tus companeros pueden agregar las suyas con
// CatalogoTiendas.registrar(...) y aparecen solas en el login.
public class CatalogoTiendas {

    private static final List<Tienda> tiendas = new ArrayList<>();

    static {
        Tienda bodega = new Tienda("Bodega",
                "¡Bienvenido a la bodega! ¿Que desea llevar?",
                new Color(0x78C850), new Color(0x68B840));
        bodega.agregar(new Producto("Arroz 1kg", 4.50, 20));
        bodega.agregar(new Producto("Azucar 1kg", 3.80, 20));
        bodega.agregar(new Producto("Aceite 1L", 9.90, 15));
        bodega.agregar(new Producto("Leche 400g", 4.20, 30));
        bodega.agregar(new Producto("Pan (unidad)", 0.30, 50));
        registrar(bodega);

        Tienda botica = new Tienda("Botica",
                "¡Hola! ¿En que le puedo ayudar?",
                new Color(0x88C8E8), new Color(0x78B8D8));
        botica.agregar(new Producto("Paracetamol", 0.80, 40));
        botica.agregar(new Producto("Alcohol 250ml", 4.00, 25));
        botica.agregar(new Producto("Curitas x10", 2.50, 30));
        botica.agregar(new Producto("Vitamina C", 6.00, 20));
        botica.agregar(new Producto("Mascarilla", 1.00, 60));
        registrar(botica);

        Tienda ropa = new Tienda("Ropa",
                "¡Bienvenido! Mira con calma.",
                new Color(0xF0A8C0), new Color(0xE098B0));
        ropa.agregar(new Producto("Polera", 35.00, 12));
        ropa.agregar(new Producto("Pantalon", 80.00, 10));
        ropa.agregar(new Producto("Gorra", 25.00, 15));
        ropa.agregar(new Producto("Zapatillas", 120.00, 8));
        ropa.agregar(new Producto("Medias", 10.00, 30));
        registrar(ropa);

        Tienda ferreteria = new Tienda("Ferreteria",
                "¡Buenas! ¿Que herramienta busca?",
                new Color(0xC8A878), new Color(0xB89868));
        ferreteria.agregar(new Producto("Martillo", 25.00, 10));
        ferreteria.agregar(new Producto("Destornillador", 12.00, 15));
        ferreteria.agregar(new Producto("Clavos 1kg", 9.00, 20));
        ferreteria.agregar(new Producto("Cinta metrica", 15.00, 12));
        ferreteria.agregar(new Producto("Pintura 1gal", 45.00, 8));
        registrar(ferreteria);
    }

    public static void registrar(Tienda t) {
        tiendas.add(t);
    }

    public static String[] nombres() {
        String[] n = new String[tiendas.size()];
        for (int i = 0; i < n.length; i++) {
            n[i] = tiendas.get(i).getNombre();
        }
        return n;
    }

    public static Tienda buscar(String nombre) {
        for (Tienda t : tiendas) {
            if (t.getNombre().equalsIgnoreCase(nombre)) {
                return t;
            }
        }
        return tiendas.get(0);
    }
}