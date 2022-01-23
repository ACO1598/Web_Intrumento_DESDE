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
 * A Seccion.
 */
@Entity
@Table(name = "seccion")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Seccion implements Serializable {

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

    @NotNull
    @Column(name = "codigo", nullable = false)
    private String codigo;

    @OneToMany(mappedBy = "seccion")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "identificadors", "parentCS", "seccion", "hijoC" }, allowSetters = true)
    private Set<Clasificador> clasificadors = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "seccions" }, allowSetters = true)
    private CodigoDESDE codigoDESDE;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Seccion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Seccion nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Seccion descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public Seccion codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Set<Clasificador> getClasificadors() {
        return this.clasificadors;
    }

    public void setClasificadors(Set<Clasificador> clasificadors) {
        if (this.clasificadors != null) {
            this.clasificadors.forEach(i -> i.setSeccion(null));
        }
        if (clasificadors != null) {
            clasificadors.forEach(i -> i.setSeccion(this));
        }
        this.clasificadors = clasificadors;
    }

    public Seccion clasificadors(Set<Clasificador> clasificadors) {
        this.setClasificadors(clasificadors);
        return this;
    }

    public Seccion addClasificador(Clasificador clasificador) {
        this.clasificadors.add(clasificador);
        clasificador.setSeccion(this);
        return this;
    }

    public Seccion removeClasificador(Clasificador clasificador) {
        this.clasificadors.remove(clasificador);
        clasificador.setSeccion(null);
        return this;
    }

    public CodigoDESDE getCodigoDESDE() {
        return this.codigoDESDE;
    }

    public void setCodigoDESDE(CodigoDESDE codigoDESDE) {
        this.codigoDESDE = codigoDESDE;
    }

    public Seccion codigoDESDE(CodigoDESDE codigoDESDE) {
        this.setCodigoDESDE(codigoDESDE);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Seccion)) {
            return false;
        }
        return id != null && id.equals(((Seccion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Seccion{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", codigo='" + getCodigo() + "'" +
            "}";
    }
}
