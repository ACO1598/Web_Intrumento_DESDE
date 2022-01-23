package es.loyola.repository;

import es.loyola.domain.Identificador;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Identificador entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IdentificadorRepository extends JpaRepository<Identificador, Long> {}
