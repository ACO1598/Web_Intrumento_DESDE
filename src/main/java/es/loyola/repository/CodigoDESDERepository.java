package es.loyola.repository;

import es.loyola.domain.CodigoDESDE;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CodigoDESDE entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CodigoDESDERepository extends JpaRepository<CodigoDESDE, Long> {}
