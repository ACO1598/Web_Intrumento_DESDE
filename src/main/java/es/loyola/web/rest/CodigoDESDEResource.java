package es.loyola.web.rest;

import es.loyola.domain.CodigoDESDE;
import es.loyola.repository.CodigoDESDERepository;
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
 * REST controller for managing {@link es.loyola.domain.CodigoDESDE}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CodigoDESDEResource {

    private final Logger log = LoggerFactory.getLogger(CodigoDESDEResource.class);

    private static final String ENTITY_NAME = "codigoDESDE";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CodigoDESDERepository codigoDESDERepository;

    public CodigoDESDEResource(CodigoDESDERepository codigoDESDERepository) {
        this.codigoDESDERepository = codigoDESDERepository;
    }

    /**
     * {@code POST  /codigo-desdes} : Create a new codigoDESDE.
     *
     * @param codigoDESDE the codigoDESDE to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new codigoDESDE, or with status {@code 400 (Bad Request)} if the codigoDESDE has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/codigo-desdes")
    public ResponseEntity<CodigoDESDE> createCodigoDESDE(@Valid @RequestBody CodigoDESDE codigoDESDE) throws URISyntaxException {
        log.debug("REST request to save CodigoDESDE : {}", codigoDESDE);
        if (codigoDESDE.getId() != null) {
            throw new BadRequestAlertException("A new codigoDESDE cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CodigoDESDE result = codigoDESDERepository.save(codigoDESDE);
        return ResponseEntity
            .created(new URI("/api/codigo-desdes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /codigo-desdes/:id} : Updates an existing codigoDESDE.
     *
     * @param id the id of the codigoDESDE to save.
     * @param codigoDESDE the codigoDESDE to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated codigoDESDE,
     * or with status {@code 400 (Bad Request)} if the codigoDESDE is not valid,
     * or with status {@code 500 (Internal Server Error)} if the codigoDESDE couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/codigo-desdes/{id}")
    public ResponseEntity<CodigoDESDE> updateCodigoDESDE(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CodigoDESDE codigoDESDE
    ) throws URISyntaxException {
        log.debug("REST request to update CodigoDESDE : {}, {}", id, codigoDESDE);
        if (codigoDESDE.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, codigoDESDE.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!codigoDESDERepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CodigoDESDE result = codigoDESDERepository.save(codigoDESDE);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, codigoDESDE.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /codigo-desdes/:id} : Partial updates given fields of an existing codigoDESDE, field will ignore if it is null
     *
     * @param id the id of the codigoDESDE to save.
     * @param codigoDESDE the codigoDESDE to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated codigoDESDE,
     * or with status {@code 400 (Bad Request)} if the codigoDESDE is not valid,
     * or with status {@code 404 (Not Found)} if the codigoDESDE is not found,
     * or with status {@code 500 (Internal Server Error)} if the codigoDESDE couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/codigo-desdes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CodigoDESDE> partialUpdateCodigoDESDE(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CodigoDESDE codigoDESDE
    ) throws URISyntaxException {
        log.debug("REST request to partial update CodigoDESDE partially : {}, {}", id, codigoDESDE);
        if (codigoDESDE.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, codigoDESDE.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!codigoDESDERepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CodigoDESDE> result = codigoDESDERepository
            .findById(codigoDESDE.getId())
            .map(existingCodigoDESDE -> {
                if (codigoDESDE.getVersion() != null) {
                    existingCodigoDESDE.setVersion(codigoDESDE.getVersion());
                }
                if (codigoDESDE.getFecha() != null) {
                    existingCodigoDESDE.setFecha(codigoDESDE.getFecha());
                }
                if (codigoDESDE.getIntroduccion() != null) {
                    existingCodigoDESDE.setIntroduccion(codigoDESDE.getIntroduccion());
                }
                if (codigoDESDE.getTerminologiaComun() != null) {
                    existingCodigoDESDE.setTerminologiaComun(codigoDESDE.getTerminologiaComun());
                }
                if (codigoDESDE.getImportanciaContexto() != null) {
                    existingCodigoDESDE.setImportanciaContexto(codigoDESDE.getImportanciaContexto());
                }
                if (codigoDESDE.getDescripcion() != null) {
                    existingCodigoDESDE.setDescripcion(codigoDESDE.getDescripcion());
                }
                if (codigoDESDE.getPoblacionObjetivo() != null) {
                    existingCodigoDESDE.setPoblacionObjetivo(codigoDESDE.getPoblacionObjetivo());
                }
                if (codigoDESDE.getReferencia() != null) {
                    existingCodigoDESDE.setReferencia(codigoDESDE.getReferencia());
                }

                return existingCodigoDESDE;
            })
            .map(codigoDESDERepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, codigoDESDE.getId().toString())
        );
    }

    /**
     * {@code GET  /codigo-desdes} : get all the codigoDESDES.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of codigoDESDES in body.
     */
    @GetMapping("/codigo-desdes")
    public ResponseEntity<List<CodigoDESDE>> getAllCodigoDESDES(Pageable pageable) {
        log.debug("REST request to get a page of CodigoDESDES");
        Page<CodigoDESDE> page = codigoDESDERepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /codigo-desdes/:id} : get the "id" codigoDESDE.
     *
     * @param id the id of the codigoDESDE to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the codigoDESDE, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/codigo-desdes/{id}")
    public ResponseEntity<CodigoDESDE> getCodigoDESDE(@PathVariable Long id) {
        log.debug("REST request to get CodigoDESDE : {}", id);
        Optional<CodigoDESDE> codigoDESDE = codigoDESDERepository.findById(id);
        return ResponseUtil.wrapOrNotFound(codigoDESDE);
    }

    /**
     * {@code DELETE  /codigo-desdes/:id} : delete the "id" codigoDESDE.
     *
     * @param id the id of the codigoDESDE to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/codigo-desdes/{id}")
    public ResponseEntity<Void> deleteCodigoDESDE(@PathVariable Long id) {
        log.debug("REST request to delete CodigoDESDE : {}", id);
        codigoDESDERepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
