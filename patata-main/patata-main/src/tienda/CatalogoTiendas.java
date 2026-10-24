package tienda;

import java.awt.Color;
import java.util.ArrayList;
import java.util.List;

// Aqui estan todas las tiendas. Tus companeros pueden agregar las suyas con
// CatalogoTiendas.registrar(...) y aparecen solas en el login.
public class CatalogoTiendas {

    private static final List<Tienda> tiendas = new ArrayList<>();

    static {
        Tienda norkys = new Tienda("Norky's",
                "¡Bienvenido a Norky's! El mejor pollo a la brasa de Huacho te espera.",
                new Color(0xE86040), new Color(0xD85030));
        norkys.agregar(new Producto("1 Pollo a la Brasa + Papas + Ensalada", 55.00, 20));
        norkys.agregar(new Producto("1/2 Pollo a la Brasa + Papas", 32.00, 20));
        norkys.agregar(new Producto("1/4 Pollo a la Brasa + Papas", 18.50, 25));
        norkys.agregar(new Producto("Porción de Anticuchos con Choclo", 24.00, 20));
        norkys.agregar(new Producto("Porción de Tequeños con Guacamole", 16.00, 20));
        norkys.agregar(new Producto("Papas Fritas Familiares", 14.00, 20));
        norkys.agregar(new Producto("Jarra de Chicha Morada 1L", 12.00, 15));
        norkys.agregar(new Producto("Gaseosa Inca Kola 1.5L", 9.50, 20));
        registrar(norkys);

        Tienda tambo = new Tienda("Tambo",
                "¡Hola! En Tambo encuentras de todo, rápido y cerca.",
                new Color(0x58A8D8), new Color(0x4898C8));
        tambo.agregar(new Producto("Empanada Mixta Jamón y Queso", 6.50, 25));
        tambo.agregar(new Producto("Empanada de Carne Tradicional", 6.50, 25));
        tambo.agregar(new Producto("Sandwich Triple Pollo y Palta", 7.50, 20));
        tambo.agregar(new Producto("Enrollado Hotdog con Queso", 6.00, 20));
        tambo.agregar(new Producto("Bebida Energizante Volt 300ml", 4.50, 30));
        tambo.agregar(new Producto("Cifrut Granadilla 500ml", 2.50, 30));
        tambo.agregar(new Producto("Galletas Rellenas Chocomanía", 2.00, 40));
        tambo.agregar(new Producto("Papas Lays Clásicas", 3.50, 35));
        tambo.agregar(new Producto("Helado Sin Parar D'Onofrio", 5.50, 20));
        tambo.agregar(new Producto("Agua San Mateo 600ml", 2.50, 40));
        registrar(tambo);

        Tienda brujas = new Tienda("Brujas",
                "Bienvenido a Brujas, el restobar mágico de Huacho. ¿Qué poción probarás?",
                new Color(0x9060C0), new Color(0x8050B0));
        brujas.agregar(new Producto("Poción Pisco Sour Huachano", 22.00, 20));
        brujas.agregar(new Producto("Poción Chilcano Clásico", 18.00, 20));
        brujas.agregar(new Producto("Poción Mágica Sangre de Bruja", 26.00, 15));
        brujas.agregar(new Producto("Poción Azul Mística", 24.00, 15));
        brujas.agregar(new Producto("Cerveza Artesanal Huachana", 14.00, 20));
        brujas.agregar(new Producto("Elixir de la Pasión", 20.00, 20));
        brujas.agregar(new Producto("Tabla Maki Acevichado (10 cortes)", 28.00, 15));
        brujas.agregar(new Producto("Tabla Maki Furai Crocante (10 cortes)", 26.00, 15));
        brujas.agregar(new Producto("Tabla Maki California Roll (10 cortes)", 25.00, 15));
        brujas.agregar(new Producto("Tabla Maki Especial Brujas (10 cortes)", 30.00, 12));
        brujas.agregar(new Producto("Dúo de Makis Brujas (20 cortes surtidos)", 50.00, 10));
        brujas.agregar(new Producto("Alitas BBQ Huachanas (x6)", 22.00, 15));
        brujas.agregar(new Producto("Alitas Acevichadas (x6)", 24.00, 15));
        brujas.agregar(new Producto("Alitas Picantes Diabla (x6)", 23.00, 15));
        brujas.agregar(new Producto("Alitas Crispy con Papas Nativas (x8)", 28.00, 12));
        registrar(brujas);

        Tienda beijing = new Tienda("Chifa Beijing",
                "¡Bienvenido al Chifa Beijing! El wok está listo para servirte.",
                new Color(0xD05040), new Color(0xC04030));
        beijing.agregar(new Producto("Arroz Chaufa Especial de Chancho y Pollo", 24.00, 20));
        beijing.agregar(new Producto("Aeropuerto de Pollo Saltado", 26.00, 20));
        beijing.agregar(new Producto("Docena de Wantán Frito", 14.00, 20));
        beijing.agregar(new Producto("Tallarín Saltado Chifa con Pollo", 25.00, 20));
        beijing.agregar(new Producto("Pollo Chi Jau Kay con Arroz", 27.00, 15));
        beijing.agregar(new Producto("Pollo Ti Pa Kay Agridulce", 27.00, 15));
        beijing.agregar(new Producto("Sopa Wantán Especial Familiar", 20.00, 15));
        beijing.agregar(new Producto("Inka Kola Gordita 500ml", 4.00, 30));
        registrar(beijing);

        Tienda yoshi = new Tienda("Chifa Yoshi",
                "¡Hola! Pasa al Chifa Yoshi, tenemos las mejores sopas de la plaza.",
                new Color(0x58A868), new Color(0x489858));
        yoshi.agregar(new Producto("Sopa Fuchifú Especial de Pollo", 18.00, 20));
        yoshi.agregar(new Producto("Kam Lu Wantán Tradicional", 29.00, 15));
        yoshi.agregar(new Producto("Tallarín Saltado de Carne y Verduras", 25.00, 20));
        yoshi.agregar(new Producto("Chaufa de Mariscos Huachano", 28.00, 15));
        yoshi.agregar(new Producto("Wantán Sancochado Relleno (x8)", 16.00, 20));
        yoshi.agregar(new Producto("Pollo Limonkay Crocante", 26.00, 15));
        yoshi.agregar(new Producto("Chancho con Tamarindo y Piña", 28.00, 15));
        yoshi.agregar(new Producto("Gaseosa Inka Kola 1L", 7.50, 25));
        registrar(yoshi);

        Tienda compumark = new Tienda("Compumark",
                "¡Bienvenido a Compumark! Videojuegos y accesorios para verdaderos gamers.",
                new Color(0x5070C0), new Color(0x4060B0));
        compumark.agregar(new Producto("Minecraft", 89.90, 15));
        compumark.agregar(new Producto("Hollow Knight", 29.90, 15));
        compumark.agregar(new Producto("GTA V", 59.90, 15));
        compumark.agregar(new Producto("The Last of Us", 79.90, 10));
        compumark.agregar(new Producto("Ghost of Tsushima", 99.90, 10));
        compumark.agregar(new Producto("Red Dead Redemption 2", 89.90, 10));
        compumark.agregar(new Producto("Elden Ring", 119.90, 10));
        compumark.agregar(new Producto("God of War Ragnarok", 129.90, 8));
        compumark.agregar(new Producto("Mouse Gamer RGB 6400 DPI", 45.00, 20));
        compumark.agregar(new Producto("Teclado Mecánico RGB Switch Blue", 120.00, 12));
        compumark.agregar(new Producto("Headset Gamer con Micrófono 7.1", 85.00, 15));
        compumark.agregar(new Producto("Mando Inalámbrico DualSense", 249.90, 8));
        registrar(compumark);
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
