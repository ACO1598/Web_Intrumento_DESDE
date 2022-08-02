package es.loyola.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Identificador.
 */
@Entity
@Table(name = "identificador")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Identificador implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @NotNull
    @Column(name = "codigo", nullable = false)
    private String codigo;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "ejemplos")
    private String ejemplos;

    @OneToMany(mappedBy = "hijoI")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "parentIS", "clasificador", "hijoI" }, allowSetters = true)
    private Set<Identificador> parentIS = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "identificadors", "parentCS", "seccion", "hijoC" }, allowSetters = true)
    private Clasificador clasificador;

    @ManyToOne
    @JsonIgnoreProperties(value = { "parentIS", "clasificador", "hijoI" }, allowSetters = true)
    private Identificador hijoI;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Identificador id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Identificador nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public Identificador codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Identificador descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getEjemplos() {
        return this.ejemplos;
    }

    public Identificador ejemplos(String ejemplos) {
        this.setEjemplos(ejemplos);
        return this;
    }

    public void setEjemplos(String ejemplos) {
        this.ejemplos = ejemplos;
    }

    public Set<Identificador> getParentIS() {
        return this.parentIS;
    }

    public void setParentIS(Set<Identificador> identificadors) {
        if (this.parentIS != null) {
            this.parentIS.forEach(i -> i.setHijoI(null));
        }
        if (identificadors != null) {
            identificadors.forEach(i -> i.setHijoI(this));
        }
        this.parentIS = identificadors;
    }

    public Identificador parentIS(Set<Identificador> identificadors) {
        this.setParentIS(identificadors);
        return this;
    }

    public Identificador addParentI(Identificador identificador) {
        this.parentIS.add(identificador);
        identificador.setHijoI(this);
        return this;
    }

    public Identificador removeParentI(Identificador identificador) {
        this.parentIS.remove(identificador);
        identificador.setHijoI(null);
        return this;
    }

    public Clasificador getClasificador() {
        return this.clasificador;
    }

    public void setClasificador(Clasificador clasificador) {
        this.clasificador = clasificador;
    }

    public Identificador clasificador(Clasificador clasificador) {
        this.setClasificador(clasificador);
        return this;
    }

    public Identificador getHijoI() {
        return this.hijoI;
    }

    public void setHijoI(Identificador identificador) {
        this.hijoI = identificador;
    }

    public Identificador hijoI(Identificador identificador) {
        this.setHijoI(identificador);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Identificador)) {
            return false;
        }
        return id != null && id.equals(((Identificador) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Identificador{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", ejemplos='" + getEjemplos() + "'" +
            "}";
    }
}
