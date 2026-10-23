package clientes;

import java.util.ArrayList;
import java.util.List;

public class RegistroClientes {
    private static final List<Cliente> lista = new ArrayList<>();

    public static void agregar(Cliente c) {
        lista.add(c);
    }

    public static List<Cliente> listar() {
        return lista;
    }
}