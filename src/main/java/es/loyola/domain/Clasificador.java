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
 * A Clasificador.
 */
@Entity
@Table(name = "clasificador")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Clasificador implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "ejemplos")
    private String ejemplos;

    @OneToMany(mappedBy = "clasificador")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "parentIS", "clasificador", "hijoI" }, allowSetters = true)
    private Set<Identificador> identificadors = new HashSet<>();

    @OneToMany(mappedBy = "hijoC")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "identificadors", "parentCS", "seccion", "hijoC" }, allowSetters = true)
    private Set<Clasificador> parentCS = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "clasificadors", "codigoDESDE" }, allowSetters = true)
    private Seccion seccion;

    @ManyToOne
    @JsonIgnoreProperties(value = { "identificadors", "parentCS", "seccion", "hijoC" }, allowSetters = true)
    private Clasificador hijoC;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Clasificador id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Clasificador nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Clasificador descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getEjemplos() {
        return this.ejemplos;
    }

    public Clasificador ejemplos(String ejemplos) {
        this.setEjemplos(ejemplos);
        return this;
    }

    public void setEjemplos(String ejemplos) {
        this.ejemplos = ejemplos;
    }

    public Set<Identificador> getIdentificadors() {
        return this.identificadors;
    }

    public void setIdentificadors(Set<Identificador> identificadors) {
        if (this.identificadors != null) {
            this.identificadors.forEach(i -> i.setClasificador(null));
        }
        if (identificadors != null) {
            identificadors.forEach(i -> i.setClasificador(this));
        }
        this.identificadors = identificadors;
    }

    public Clasificador identificadors(Set<Identificador> identificadors) {
        this.setIdentificadors(identificadors);
        return this;
    }

    public Clasificador addIdentificador(Identificador identificador) {
        this.identificadors.add(identificador);
        identificador.setClasificador(this);
        return this;
    }

    public Clasificador removeIdentificador(Identificador identificador) {
        this.identificadors.remove(identificador);
        identificador.setClasificador(null);
        return this;
    }

    public Set<Clasificador> getParentCS() {
        return this.parentCS;
    }

    public void setParentCS(Set<Clasificador> clasificadors) {
        if (this.parentCS != null) {
            this.parentCS.forEach(i -> i.setHijoC(null));
        }
        if (clasificadors != null) {
            clasificadors.forEach(i -> i.setHijoC(this));
        }
        this.parentCS = clasificadors;
    }

    public Clasificador parentCS(Set<Clasificador> clasificadors) {
        this.setParentCS(clasificadors);
        return this;
    }

    public Clasificador addParentC(Clasificador clasificador) {
        this.parentCS.add(clasificador);
        clasificador.setHijoC(this);
        return this;
    }

    public Clasificador removeParentC(Clasificador clasificador) {
        this.parentCS.remove(clasificador);
        clasificador.setHijoC(null);
        return this;
    }

    public Seccion getSeccion() {
        return this.seccion;
    }

    public void setSeccion(Seccion seccion) {
        this.seccion = seccion;
    }

    public Clasificador seccion(Seccion seccion) {
        this.setSeccion(seccion);
        return this;
    }

    public Clasificador getHijoC() {
        return this.hijoC;
    }

    public void setHijoC(Clasificador clasificador) {
        this.hijoC = clasificador;
    }

    public Clasificador hijoC(Clasificador clasificador) {
        this.setHijoC(clasificador);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Clasificador)) {
            return false;
        }
        return id != null && id.equals(((Clasificador) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Clasificador{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", ejemplos='" + getEjemplos() + "'" +
            "}";
    }
}
