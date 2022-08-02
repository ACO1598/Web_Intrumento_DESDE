package es.loyola.web.rest;

import es.loyola.domain.Identificador;
import es.loyola.repository.IdentificadorRepository;
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
 * REST controller for managing {@link es.loyola.domain.Identificador}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class IdentificadorResource {

    private final Logger log = LoggerFactory.getLogger(IdentificadorResource.class);

    private static final String ENTITY_NAME = "identificador";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IdentificadorRepository identificadorRepository;

    public IdentificadorResource(IdentificadorRepository identificadorRepository) {
        this.identificadorRepository = identificadorRepository;
    }

    /**
     * {@code POST  /identificadors} : Create a new identificador.
     *
     * @param identificador the identificador to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new identificador, or with status {@code 400 (Bad Request)} if the identificador has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/identificadors")
    public ResponseEntity<Identificador> createIdentificador(@Valid @RequestBody Identificador identificador) throws URISyntaxException {
        log.debug("REST request to save Identificador : {}", identificador);
        if (identificador.getId() != null) {
            throw new BadRequestAlertException("A new identificador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Identificador result = identificadorRepository.save(identificador);
        return ResponseEntity
            .created(new URI("/api/identificadors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /identificadors/:id} : Updates an existing identificador.
     *
     * @param id the id of the identificador to save.
     * @param identificador the identificador to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated identificador,
     * or with status {@code 400 (Bad Request)} if the identificador is not valid,
     * or with status {@code 500 (Internal Server Error)} if the identificador couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/identificadors/{id}")
    public ResponseEntity<Identificador> updateIdentificador(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Identificador identificador
    ) throws URISyntaxException {
        log.debug("REST request to update Identificador : {}, {}", id, identificador);
        if (identificador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, identificador.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!identificadorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Identificador result = identificadorRepository.save(identificador);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, identificador.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /identificadors/:id} : Partial updates given fields of an existing identificador, field will ignore if it is null
     *
     * @param id the id of the identificador to save.
     * @param identificador the identificador to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated identificador,
     * or with status {@code 400 (Bad Request)} if the identificador is not valid,
     * or with status {@code 404 (Not Found)} if the identificador is not found,
     * or with status {@code 500 (Internal Server Error)} if the identificador couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/identificadors/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Identificador> partialUpdateIdentificador(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Identificador identificador
    ) throws URISyntaxException {
        log.debug("REST request to partial update Identificador partially : {}, {}", id, identificador);
        if (identificador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, identificador.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!identificadorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Identificador> result = identificadorRepository
            .findById(identificador.getId())
            .map(existingIdentificador -> {
                if (identificador.getNombre() != null) {
                    existingIdentificador.setNombre(identificador.getNombre());
                }
                if (identificador.getCodigo() != null) {
                    existingIdentificador.setCodigo(identificador.getCodigo());
                }
                if (identificador.getDescripcion() != null) {
                    existingIdentificador.setDescripcion(identificador.getDescripcion());
                }
                if (identificador.getEjemplos() != null) {
                    existingIdentificador.setEjemplos(identificador.getEjemplos());
                }

                return existingIdentificador;
            })
            .map(identificadorRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, identificador.getId().toString())
        );
    }

    /**
     * {@code GET  /identificadors} : get all the identificadors.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of identificadors in body.
     */
    @GetMapping("/identificadors")
    public ResponseEntity<List<Identificador>> getAllIdentificadors(Pageable pageable) {
        log.debug("REST request to get a page of Identificadors");
        Page<Identificador> page = identificadorRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /identificadors/:id} : get the "id" identificador.
     *
     * @param id the id of the identificador to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the identificador, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/identificadors/{id}")
    public ResponseEntity<Identificador> getIdentificador(@PathVariable Long id) {
        log.debug("REST request to get Identificador : {}", id);
        Optional<Identificador> identificador = identificadorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(identificador);
    }

    /**
     * {@code DELETE  /identificadors/:id} : delete the "id" identificador.
     *
     * @param id the id of the identificador to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/identificadors/{id}")
    public ResponseEntity<Void> deleteIdentificador(@PathVariable Long id) {
        log.debug("REST request to delete Identificador : {}", id);
        identificadorRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
