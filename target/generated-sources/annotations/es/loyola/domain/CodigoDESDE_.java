package es.loyola.domain;

import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(CodigoDESDE.class)
public abstract class CodigoDESDE_ {

	public static volatile SingularAttribute<CodigoDESDE, String> descripcion;
	public static volatile SingularAttribute<CodigoDESDE, LocalDate> fecha;
	public static volatile SingularAttribute<CodigoDESDE, String> terminologiaComun;
	public static volatile SingularAttribute<CodigoDESDE, String> poblacionObjetivo;
	public static volatile SingularAttribute<CodigoDESDE, String> introduccion;
	public static volatile SingularAttribute<CodigoDESDE, Long> id;
	public static volatile SingularAttribute<CodigoDESDE, String> version;
	public static volatile SetAttribute<CodigoDESDE, Seccion> seccions;
	public static volatile SingularAttribute<CodigoDESDE, String> importanciaContexto;
	public static volatile SingularAttribute<CodigoDESDE, String> referencia;

	public static final String DESCRIPCION = "descripcion";
	public static final String FECHA = "fecha";
	public static final String TERMINOLOGIA_COMUN = "terminologiaComun";
	public static final String POBLACION_OBJETIVO = "poblacionObjetivo";
	public static final String INTRODUCCION = "introduccion";
	public static final String ID = "id";
	public static final String VERSION = "version";
	public static final String SECCIONS = "seccions";
	public static final String IMPORTANCIA_CONTEXTO = "importanciaContexto";
	public static final String REFERENCIA = "referencia";

}

