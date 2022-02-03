package es.loyola.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Seccion.class)
public abstract class Seccion_ {

	public static volatile SingularAttribute<Seccion, String> descripcion;
	public static volatile SingularAttribute<Seccion, CodigoDESDE> codigoDESDE;
	public static volatile SingularAttribute<Seccion, String> codigo;
	public static volatile SingularAttribute<Seccion, Long> id;
	public static volatile SetAttribute<Seccion, Clasificador> clasificadors;
	public static volatile SingularAttribute<Seccion, String> nombre;

	public static final String DESCRIPCION = "descripcion";
	public static final String CODIGO_DE_SD_E = "codigoDESDE";
	public static final String CODIGO = "codigo";
	public static final String ID = "id";
	public static final String CLASIFICADORS = "clasificadors";
	public static final String NOMBRE = "nombre";

}

