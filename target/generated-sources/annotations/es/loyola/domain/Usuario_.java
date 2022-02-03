package es.loyola.domain;

import es.loyola.domain.enumeration.Rol;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Usuario.class)
public abstract class Usuario_ {

	public static volatile SingularAttribute<Usuario, String> apellido;
	public static volatile SingularAttribute<Usuario, String> contrasena;
	public static volatile SingularAttribute<Usuario, Long> id;
	public static volatile SingularAttribute<Usuario, String> nombreUsuario;
	public static volatile SingularAttribute<Usuario, String> nombre;
	public static volatile SingularAttribute<Usuario, String> email;
	public static volatile SingularAttribute<Usuario, Rol> rol;

	public static final String APELLIDO = "apellido";
	public static final String CONTRASENA = "contrasena";
	public static final String ID = "id";
	public static final String NOMBRE_USUARIO = "nombreUsuario";
	public static final String NOMBRE = "nombre";
	public static final String EMAIL = "email";
	public static final String ROL = "rol";

}

