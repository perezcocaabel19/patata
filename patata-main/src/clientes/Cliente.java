package clientes;

public class Cliente {
    private String nombre;
    private String personaje;
    private String busca;
    private int puntos = 50;

    public Cliente(String nombre, String personaje, String busca) {
        this.nombre = nombre;
        this.personaje = personaje;
        this.busca = busca;
    }

    public String getNombre() { return nombre; }
    public String getPersonaje() { return personaje; }
    public String getBusca() { return busca; }
    public int getPuntos() { return puntos; }

    public void setPersonaje(String personaje) { this.personaje = personaje; }
    public void setBusca(String busca) { this.busca = busca; }

    public void agregarPuntos(int cantidad) {
        puntos += Math.max(0, cantidad);
    }

    public void restarPuntos(int cantidad) {
        puntos = Math.max(0, puntos - Math.max(0, cantidad));
    }
}
