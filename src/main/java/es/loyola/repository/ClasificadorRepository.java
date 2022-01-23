package es.loyola.repository;

import es.loyola.domain.Clasificador;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Clasificador entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClasificadorRepository extends JpaRepository<Clasificador, Long> {}
