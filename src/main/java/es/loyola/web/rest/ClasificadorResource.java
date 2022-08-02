package es.loyola.web.rest;

import es.loyola.domain.Clasificador;
import es.loyola.repository.ClasificadorRepository;
import es.loyola.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link es.loyola.domain.Clasificador}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ClasificadorResource {

    private final Logger log = LoggerFactory.getLogger(ClasificadorResource.class);

    private static final String ENTITY_NAME = "clasificador";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClasificadorRepository clasificadorRepository;

    public ClasificadorResource(ClasificadorRepository clasificadorRepository) {
        this.clasificadorRepository = clasificadorRepository;
    }

    /**
     * {@code POST  /clasificadors} : Create a new clasificador.
     *
     * @param clasificador the clasificador to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new clasificador, or with status {@code 400 (Bad Request)} if the clasificador has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/clasificadors")
    public ResponseEntity<Clasificador> createClasificador(@Valid @RequestBody Clasificador clasificador) throws URISyntaxException {
        log.debug("REST request to save Clasificador : {}", clasificador);
        if (clasificador.getId() != null) {
            throw new BadRequestAlertException("A new clasificador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Clasificador result = clasificadorRepository.save(clasificador);
        return ResponseEntity
            .created(new URI("/api/clasificadors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /clasificadors/:id} : Updates an existing clasificador.
     *
     * @param id the id of the clasificador to save.
     * @param clasificador the clasificador to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clasificador,
     * or with status {@code 400 (Bad Request)} if the clasificador is not valid,
     * or with status {@code 500 (Internal Server Error)} if the clasificador couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/clasificadors/{id}")
    public ResponseEntity<Clasificador> updateClasificador(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Clasificador clasificador
    ) throws URISyntaxException {
        log.debug("REST request to update Clasificador : {}, {}", id, clasificador);
        if (clasificador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, clasificador.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!clasificadorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Clasificador result = clasificadorRepository.save(clasificador);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, clasificador.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /clasificadors/:id} : Partial updates given fields of an existing clasificador, field will ignore if it is null
     *
     * @param id the id of the clasificador to save.
     * @param clasificador the clasificador to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clasificador,
     * or with status {@code 400 (Bad Request)} if the clasificador is not valid,
     * or with status {@code 404 (Not Found)} if the clasificador is not found,
     * or with status {@code 500 (Internal Server Error)} if the clasificador couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/clasificadors/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Clasificador> partialUpdateClasificador(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Clasificador clasificador
    ) throws URISyntaxException {
        log.debug("REST request to partial update Clasificador partially : {}, {}", id, clasificador);
        if (clasificador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, clasificador.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!clasificadorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Clasificador> result = clasificadorRepository
            .findById(clasificador.getId())
            .map(existingClasificador -> {
                if (clasificador.getNombre() != null) {
                    existingClasificador.setNombre(clasificador.getNombre());
                }
                if (clasificador.getDescripcion() != null) {
                    existingClasificador.setDescripcion(clasificador.getDescripcion());
                }
                if (clasificador.getEjemplos() != null) {
                    existingClasificador.setEjemplos(clasificador.getEjemplos());
                }

                return existingClasificador;
            })
            .map(clasificadorRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, clasificador.getId().toString())
        );
    }

    /**
     * {@code GET  /clasificadors} : get all the clasificadors.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of clasificadors in body.
     */
    @GetMapping("/clasificadors")
    public ResponseEntity<List<Clasificador>> getAllClasificadors(Pageable pageable) {
        log.debug("REST request to get a page of Clasificadors");
        Page<Clasificador> page = clasificadorRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /clasificadors/:id} : get the "id" clasificador.
     *
     * @param id the id of the clasificador to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the clasificador, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/clasificadors/{id}")
    public ResponseEntity<Clasificador> getClasificador(@PathVariable Long id) {
        log.debug("REST request to get Clasificador : {}", id);
        Optional<Clasificador> clasificador = clasificadorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(clasificador);
    }

    /**
     * {@code DELETE  /clasificadors/:id} : delete the "id" clasificador.
     *
     * @param id the id of the clasificador to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/clasificadors/{id}")
    public ResponseEntity<Void> deleteClasificador(@PathVariable Long id) {
        log.debug("REST request to delete Clasificador : {}", id);
        clasificadorRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
