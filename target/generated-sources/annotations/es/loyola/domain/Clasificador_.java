package es.loyola.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Clasificador.class)
public abstract class Clasificador_ {

	public static volatile SingularAttribute<Clasificador, String> descripcion;
	public static volatile SetAttribute<Clasificador, Identificador> identificadors;
	public static volatile SetAttribute<Clasificador, Clasificador> parentCS;
	public static volatile SingularAttribute<Clasificador, Seccion> seccion;
	public static volatile SingularAttribute<Clasificador, String> ejemplos;
	public static volatile SingularAttribute<Clasificador, Clasificador> hijoC;
	public static volatile SingularAttribute<Clasificador, Long> id;
	public static volatile SingularAttribute<Clasificador, String> nombre;

	public static final String DESCRIPCION = "descripcion";
	public static final String IDENTIFICADORS = "identificadors";
	public static final String PARENT_CS = "parentCS";
	public static final String SECCION = "seccion";
	public static final String EJEMPLOS = "ejemplos";
	public static final String HIJO_C = "hijoC";
	public static final String ID = "id";
	public static final String NOMBRE = "nombre";

}

