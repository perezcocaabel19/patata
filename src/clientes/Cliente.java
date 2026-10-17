package clientes;

public class Cliente {
    private String nombre;
    private String personaje;
    private String busca;

    public Cliente(String nombre, String personaje, String busca) {
        this.nombre = nombre;
        this.personaje = personaje;
        this.busca = busca;
    }

    public String getNombre() { return nombre; }
    public String getPersonaje() { return personaje; }
    public String getBusca() { return busca; }
}