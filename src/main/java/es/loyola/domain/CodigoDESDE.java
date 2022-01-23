package es.loyola.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CodigoDESDE.
 */
@Entity
@Table(name = "codigo_desde")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CodigoDESDE implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "version", nullable = false)
    private String version;

    @NotNull
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Column(name = "introduccion")
    private String introduccion;

    @Column(name = "terminologia_comun")
    private String terminologiaComun;

    @Column(name = "importancia_contexto")
    private String importanciaContexto;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "poblacion_objetivo")
    private String poblacionObjetivo;

    @Column(name = "referencia")
    private String referencia;

    @OneToMany(mappedBy = "codigoDESDE")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "clasificadors", "codigoDESDE" }, allowSetters = true)
    private Set<Seccion> seccions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CodigoDESDE id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVersion() {
        return this.version;
    }

    public CodigoDESDE version(String version) {
        this.setVersion(version);
        return this;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public LocalDate getFecha() {
        return this.fecha;
    }

    public CodigoDESDE fecha(LocalDate fecha) {
        this.setFecha(fecha);
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getIntroduccion() {
        return this.introduccion;
    }

    public CodigoDESDE introduccion(String introduccion) {
        this.setIntroduccion(introduccion);
        return this;
    }

    public void setIntroduccion(String introduccion) {
        this.introduccion = introduccion;
    }

    public String getTerminologiaComun() {
        return this.terminologiaComun;
    }

    public CodigoDESDE terminologiaComun(String terminologiaComun) {
        this.setTerminologiaComun(terminologiaComun);
        return this;
    }

    public void setTerminologiaComun(String terminologiaComun) {
        this.terminologiaComun = terminologiaComun;
    }

    public String getImportanciaContexto() {
        return this.importanciaContexto;
    }

    public CodigoDESDE importanciaContexto(String importanciaContexto) {
        this.setImportanciaContexto(importanciaContexto);
        return this;
    }

    public void setImportanciaContexto(String importanciaContexto) {
        this.importanciaContexto = importanciaContexto;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public CodigoDESDE descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getPoblacionObjetivo() {
        return this.poblacionObjetivo;
    }

    public CodigoDESDE poblacionObjetivo(String poblacionObjetivo) {
        this.setPoblacionObjetivo(poblacionObjetivo);
        return this;
    }

    public void setPoblacionObjetivo(String poblacionObjetivo) {
        this.poblacionObjetivo = poblacionObjetivo;
    }

    public String getReferencia() {
        return this.referencia;
    }

    public CodigoDESDE referencia(String referencia) {
        this.setReferencia(referencia);
        return this;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }

    public Set<Seccion> getSeccions() {
        return this.seccions;
    }

    public void setSeccions(Set<Seccion> seccions) {
        if (this.seccions != null) {
            this.seccions.forEach(i -> i.setCodigoDESDE(null));
        }
        if (seccions != null) {
            seccions.forEach(i -> i.setCodigoDESDE(this));
        }
        this.seccions = seccions;
    }

    public CodigoDESDE seccions(Set<Seccion> seccions) {
        this.setSeccions(seccions);
        return this;
    }

    public CodigoDESDE addSeccion(Seccion seccion) {
        this.seccions.add(seccion);
        seccion.setCodigoDESDE(this);
        return this;
    }

    public CodigoDESDE removeSeccion(Seccion seccion) {
        this.seccions.remove(seccion);
        seccion.setCodigoDESDE(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CodigoDESDE)) {
            return false;
        }
        return id != null && id.equals(((CodigoDESDE) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CodigoDESDE{" +
            "id=" + getId() +
            ", version='" + getVersion() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", introduccion='" + getIntroduccion() + "'" +
            ", terminologiaComun='" + getTerminologiaComun() + "'" +
            ", importanciaContexto='" + getImportanciaContexto() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", poblacionObjetivo='" + getPoblacionObjetivo() + "'" +
            ", referencia='" + getReferencia() + "'" +
            "}";
    }
}
