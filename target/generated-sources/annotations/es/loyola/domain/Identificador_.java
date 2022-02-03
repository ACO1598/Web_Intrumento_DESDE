package es.loyola.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Identificador.class)
public abstract class Identificador_ {

	public static volatile SingularAttribute<Identificador, String> descripcion;
	public static volatile SingularAttribute<Identificador, String> codigo;
	public static volatile SingularAttribute<Identificador, Identificador> hijoI;
	public static volatile SingularAttribute<Identificador, Long> id;
	public static volatile SingularAttribute<Identificador, Clasificador> clasificador;
	public static volatile SingularAttribute<Identificador, String> nombre;
	public static volatile SetAttribute<Identificador, Identificador> parentIS;

	public static final String DESCRIPCION = "descripcion";
	public static final String CODIGO = "codigo";
	public static final String HIJO_I = "hijoI";
	public static final String ID = "id";
	public static final String CLASIFICADOR = "clasificador";
	public static final String NOMBRE = "nombre";
	public static final String PARENT_IS = "parentIS";

}

