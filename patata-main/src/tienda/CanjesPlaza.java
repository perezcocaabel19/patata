package tienda;

import java.util.ArrayList;
import java.util.List;

// Premios que se pueden canjear en la Plaza de Armas, igual que CANJES_PLAZA en datos.js
public class CanjesPlaza {

    public static class Premio {
        private final String nombre;
        private final int costoPuntos;
        private final String descripcion;

        public Premio(String nombre, int costoPuntos, String descripcion) {
            this.nombre = nombre;
            this.costoPuntos = costoPuntos;
            this.descripcion = descripcion;
        }

        public String getNombre() { return nombre; }
        public int getCostoPuntos() { return costoPuntos; }
        public String getDescripcion() { return descripcion; }
    }

    private static final List<Premio> premios = new ArrayList<>();

    static {
        premios.add(new Premio("Helado Tradicional de Lúcuma", 30,
                "Clásico helado artesanal huachano en la glorieta"));
        premios.add(new Premio("Postal de la Plaza de Armas", 40,
                "Recuerdo fotográfico oficial con marco conmemorativo"));
        premios.add(new Premio("Porción de Salchicha Huachana", 60,
                "Salchicha típica ahumada empaquetada al vacío"));
        premios.add(new Premio("Gorra Bordada Huacho GO", 100,
                "Gorra oficial de la aventura con visera curva"));
        premios.add(new Premio("Polo Conmemorativo Plaza de Huacho", 150,
                "Polo 100% algodón con diseño exclusivo"));
        premios.add(new Premio("Pase Turístico al Mirador de Huacho", 200,
                "Boleto VIP para recorrer el mirador de la bahía"));
    }

    public static List<Premio> listar() {
        return premios;
    }
}
