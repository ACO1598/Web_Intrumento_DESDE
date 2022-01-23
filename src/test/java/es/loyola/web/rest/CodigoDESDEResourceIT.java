package es.loyola.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import es.loyola.IntegrationTest;
import es.loyola.domain.CodigoDESDE;
import es.loyola.repository.CodigoDESDERepository;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link CodigoDESDEResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CodigoDESDEResourceIT {

    private static final String DEFAULT_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_VERSION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_INTRODUCCION = "AAAAAAAAAA";
    private static final String UPDATED_INTRODUCCION = "BBBBBBBBBB";

    private static final String DEFAULT_TERMINOLOGIA_COMUN = "AAAAAAAAAA";
    private static final String UPDATED_TERMINOLOGIA_COMUN = "BBBBBBBBBB";

    private static final String DEFAULT_IMPORTANCIA_CONTEXTO = "AAAAAAAAAA";
    private static final String UPDATED_IMPORTANCIA_CONTEXTO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_POBLACION_OBJETIVO = "AAAAAAAAAA";
    private static final String UPDATED_POBLACION_OBJETIVO = "BBBBBBBBBB";

    private static final String DEFAULT_REFERENCIA = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCIA = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/codigo-desdes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CodigoDESDERepository codigoDESDERepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCodigoDESDEMockMvc;

    private CodigoDESDE codigoDESDE;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CodigoDESDE createEntity(EntityManager em) {
        CodigoDESDE codigoDESDE = new CodigoDESDE()
            .version(DEFAULT_VERSION)
            .fecha(DEFAULT_FECHA)
            .introduccion(DEFAULT_INTRODUCCION)
            .terminologiaComun(DEFAULT_TERMINOLOGIA_COMUN)
            .importanciaContexto(DEFAULT_IMPORTANCIA_CONTEXTO)
            .descripcion(DEFAULT_DESCRIPCION)
            .poblacionObjetivo(DEFAULT_POBLACION_OBJETIVO)
            .referencia(DEFAULT_REFERENCIA);
        return codigoDESDE;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CodigoDESDE createUpdatedEntity(EntityManager em) {
        CodigoDESDE codigoDESDE = new CodigoDESDE()
            .version(UPDATED_VERSION)
            .fecha(UPDATED_FECHA)
            .introduccion(UPDATED_INTRODUCCION)
            .terminologiaComun(UPDATED_TERMINOLOGIA_COMUN)
            .importanciaContexto(UPDATED_IMPORTANCIA_CONTEXTO)
            .descripcion(UPDATED_DESCRIPCION)
            .poblacionObjetivo(UPDATED_POBLACION_OBJETIVO)
            .referencia(UPDATED_REFERENCIA);
        return codigoDESDE;
    }

    @BeforeEach
    public void initTest() {
        codigoDESDE = createEntity(em);
    }

    @Test
    @Transactional
    void createCodigoDESDE() throws Exception {
        int databaseSizeBeforeCreate = codigoDESDERepository.findAll().size();
        // Create the CodigoDESDE
        restCodigoDESDEMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(codigoDESDE)))
            .andExpect(status().isCreated());

        // Validate the CodigoDESDE in the database
        List<CodigoDESDE> codigoDESDEList = codigoDESDERepository.findAll();
        assertThat(codigoDESDEList).hasSize(databaseSizeBeforeCreate + 1);
        CodigoDESDE testCodigoDESDE = codigoDESDEList.get(codigoDESDEList.size() - 1);
        assertThat(testCodigoDESDE.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testCodigoDESDE.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testCodigoDESDE.getIntroduccion()).isEqualTo(DEFAULT_INTRODUCCION);
        assertThat(testCodigoDESDE.getTerminologiaComun()).isEqualTo(DEFAULT_TERMINOLOGIA_COMUN);
        assertThat(testCodigoDESDE.getImportanciaContexto()).isEqualTo(DEFAULT_IMPORTANCIA_CONTEXTO);
        assertThat(testCodigoDESDE.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testCodigoDESDE.getPoblacionObjetivo()).isEqualTo(DEFAULT_POBLACION_OBJETIVO);
        assertThat(testCodigoDESDE.getReferencia()).isEqualTo(DEFAULT_REFERENCIA);
    }

    @Test
    @Transactional
    void createCodigoDESDEWithExistingId() throws Exception {
        // Create the CodigoDESDE with an existing ID
        codigoDESDE.setId(1L);

        int databaseSizeBeforeCreate = codigoDESDERepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCodigoDESDEMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(codigoDESDE)))
            .andExpect(status().isBadRequest());

        // Validate the CodigoDESDE in the database
        List<CodigoDESDE> codigoDESDEList = codigoDESDERepository.findAll();
        assertThat(codigoDESDEList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkVersionIsRequired() throws Exception {
        int databaseSizeBeforeTest = codigoDESDERepository.findAll().size();
        // set the field null
        codigoDESDE.setVersion(null);

        // Create the CodigoDESDE, which fails.

        restCodigoDESDEMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(codigoDESDE)))
            .andExpect(status().isBadRequest());

        List<CodigoDESDE> codigoDESDEList = codigoDESDERepository.findAll();
        assertThat(codigoDESDEList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkFechaIsRequired() throws Exception {
        int databaseSizeBeforeTest = codigoDESDERepository.findAll().size();
        // set the field null
        codigoDESDE.setFecha(null);

        // Create the CodigoDESDE, which fails.

        restCodigoDESDEMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(codigoDESDE)))
            .andExpect(status().isBadRequest());

        List<CodigoDESDE> codigoDESDEList = codigoDESDERepository.findAll();
        assertThat(codigoDESDEList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCodigoDESDES() throws Exception {
        // Initialize the database
        codigoDESDERepository.saveAndFlush(codigoDESDE);

        // Get all the codigoDESDEList
        restCodigoDESDEMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(codigoDESDE.getId().intValue())))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION)))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].introduccion").value(hasItem(DEFAULT_INTRODUCCION)))
            .andExpect(jsonPath("$.[*].terminologiaComun").value(hasItem(DEFAULT_TERMINOLOGIA_COMUN)))
            .andExpect(jsonPath("$.[*].importanciaContexto").value(hasItem(DEFAULT_IMPORTANCIA_CONTEXTO)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].poblacionObjetivo").value(hasItem(DEFAULT_POBLACION_OBJETIVO)))
            .andExpect(jsonPath("$.[*].referencia").value(hasItem(DEFAULT_REFERENCIA)));
    }

    @Test
    @Transactional
    void getCodigoDESDE() throws Exception {
        // Initialize the database
        codigoDESDERepository.saveAndFlush(codigoDESDE);

        // Get the codigoDESDE
        restCodigoDESDEMockMvc
            .perform(get(ENTITY_API_URL_ID, codigoDESDE.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(codigoDESDE.getId().intValue()))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.introduccion").value(DEFAULT_INTRODUCCION))
            .andExpect(jsonPath("$.terminologiaComun").value(DEFAULT_TERMINOLOGIA_COMUN))
            .andExpect(jsonPath("$.importanciaContexto").value(DEFAULT_IMPORTANCIA_CONTEXTO))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.poblacionObjetivo").value(DEFAULT_POBLACION_OBJETIVO))
            .andExpect(jsonPath("$.referencia").value(DEFAULT_REFERENCIA));
    }

    @Test
    @Transactional
    void getNonExistingCodigoDESDE() throws Exception {
        // Get the codigoDESDE
        restCodigoDESDEMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCodigoDESDE() throws Exception {
        // Initialize the database
        codigoDESDERepository.saveAndFlush(codigoDESDE);

        int databaseSizeBeforeUpdate = codigoDESDERepository.findAll().size();

        // Update the codigoDESDE
        CodigoDESDE updatedCodigoDESDE = codigoDESDERepository.findById(codigoDESDE.getId()).get();
        // Disconnect from session so that the updates on updatedCodigoDESDE are not directly saved in db
        em.detach(updatedCodigoDESDE);
        updatedCodigoDESDE
            .version(UPDATED_VERSION)
            .fecha(UPDATED_FECHA)
            .introduccion(UPDATED_INTRODUCCION)
            .terminologiaComun(UPDATED_TERMINOLOGIA_COMUN)
            .importanciaContexto(UPDATED_IMPORTANCIA_CONTEXTO)
            .descripcion(UPDATED_DESCRIPCION)
            .poblacionObjetivo(UPDATED_POBLACION_OBJETIVO)
            .referencia(UPDATED_REFERENCIA);

        restCodigoDESDEMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCodigoDESDE.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCodigoDESDE))
            )
            .andExpect(status().isOk());

        // Validate the CodigoDESDE in the database
        List<CodigoDESDE> codigoDESDEList = codigoDESDERepository.findAll();
        assertThat(codigoDESDEList).hasSize(databaseSizeBeforeUpdate);
        CodigoDESDE testCodigoDESDE = codigoDESDEList.get(codigoDESDEList.size() - 1);
        assertThat(testCodigoDESDE.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testCodigoDESDE.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testCodigoDESDE.getIntroduccion()).isEqualTo(UPDATED_INTRODUCCION);
        assertThat(testCodigoDESDE.getTerminologiaComun()).isEqualTo(UPDATED_TERMINOLOGIA_COMUN);
        assertThat(testCodigoDESDE.getImportanciaContexto()).isEqualTo(UPDATED_IMPORTANCIA_CONTEXTO);
        assertThat(testCodigoDESDE.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testCodigoDESDE.getPoblacionObjetivo()).isEqualTo(UPDATED_POBLACION_OBJETIVO);
        assertThat(testCodigoDESDE.getReferencia()).isEqualTo(UPDATED_REFERENCIA);
    }

    @Test
    @Transactional
    void putNonExistingCodigoDESDE() throws Exception {
        int databaseSizeBeforeUpdate = codigoDESDERepository.findAll().size();
        codigoDESDE.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCodigoDESDEMockMvc
            .perform(
                put(ENTITY_API_URL_ID, codigoDESDE.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(codigoDESDE))
            )
            .andExpect(status().isBadRequest());

        // Validate the CodigoDESDE in the database
        List<CodigoDESDE> codigoDESDEList = codigoDESDERepository.findAll();
        assertThat(codigoDESDEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCodigoDESDE() throws Exception {
        int databaseSizeBeforeUpdate = codigoDESDERepository.findAll().size();
        codigoDESDE.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCodigoDESDEMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(codigoDESDE))
            )
            .andExpect(status().isBadRequest());

        // Validate the CodigoDESDE in the database
        List<CodigoDESDE> codigoDESDEList = codigoDESDERepository.findAll();
        assertThat(codigoDESDEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCodigoDESDE() throws Exception {
        int databaseSizeBeforeUpdate = codigoDESDERepository.findAll().size();
        codigoDESDE.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCodigoDESDEMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(codigoDESDE)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CodigoDESDE in the database
        List<CodigoDESDE> codigoDESDEList = codigoDESDERepository.findAll();
        assertThat(codigoDESDEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCodigoDESDEWithPatch() throws Exception {
        // Initialize the database
        codigoDESDERepository.saveAndFlush(codigoDESDE);

        int databaseSizeBeforeUpdate = codigoDESDERepository.findAll().size();

        // Update the codigoDESDE using partial update
        CodigoDESDE partialUpdatedCodigoDESDE = new CodigoDESDE();
        partialUpdatedCodigoDESDE.setId(codigoDESDE.getId());

        partialUpdatedCodigoDESDE
            .introduccion(UPDATED_INTRODUCCION)
            .terminologiaComun(UPDATED_TERMINOLOGIA_COMUN)
            .descripcion(UPDATED_DESCRIPCION)
            .poblacionObjetivo(UPDATED_POBLACION_OBJETIVO)
            .referencia(UPDATED_REFERENCIA);

        restCodigoDESDEMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCodigoDESDE.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCodigoDESDE))
            )
            .andExpect(status().isOk());

        // Validate the CodigoDESDE in the database
        List<CodigoDESDE> codigoDESDEList = codigoDESDERepository.findAll();
        assertThat(codigoDESDEList).hasSize(databaseSizeBeforeUpdate);
        CodigoDESDE testCodigoDESDE = codigoDESDEList.get(codigoDESDEList.size() - 1);
        assertThat(testCodigoDESDE.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testCodigoDESDE.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testCodigoDESDE.getIntroduccion()).isEqualTo(UPDATED_INTRODUCCION);
        assertThat(testCodigoDESDE.getTerminologiaComun()).isEqualTo(UPDATED_TERMINOLOGIA_COMUN);
        assertThat(testCodigoDESDE.getImportanciaContexto()).isEqualTo(DEFAULT_IMPORTANCIA_CONTEXTO);
        assertThat(testCodigoDESDE.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testCodigoDESDE.getPoblacionObjetivo()).isEqualTo(UPDATED_POBLACION_OBJETIVO);
        assertThat(testCodigoDESDE.getReferencia()).isEqualTo(UPDATED_REFERENCIA);
    }

    @Test
    @Transactional
    void fullUpdateCodigoDESDEWithPatch() throws Exception {
        // Initialize the database
        codigoDESDERepository.saveAndFlush(codigoDESDE);

        int databaseSizeBeforeUpdate = codigoDESDERepository.findAll().size();

        // Update the codigoDESDE using partial update
        CodigoDESDE partialUpdatedCodigoDESDE = new CodigoDESDE();
        partialUpdatedCodigoDESDE.setId(codigoDESDE.getId());

        partialUpdatedCodigoDESDE
            .version(UPDATED_VERSION)
            .fecha(UPDATED_FECHA)
            .introduccion(UPDATED_INTRODUCCION)
            .terminologiaComun(UPDATED_TERMINOLOGIA_COMUN)
            .importanciaContexto(UPDATED_IMPORTANCIA_CONTEXTO)
            .descripcion(UPDATED_DESCRIPCION)
            .poblacionObjetivo(UPDATED_POBLACION_OBJETIVO)
            .referencia(UPDATED_REFERENCIA);

        restCodigoDESDEMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCodigoDESDE.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCodigoDESDE))
            )
            .andExpect(status().isOk());

        // Validate the CodigoDESDE in the database
        List<CodigoDESDE> codigoDESDEList = codigoDESDERepository.findAll();
        assertThat(codigoDESDEList).hasSize(databaseSizeBeforeUpdate);
        CodigoDESDE testCodigoDESDE = codigoDESDEList.get(codigoDESDEList.size() - 1);
        assertThat(testCodigoDESDE.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testCodigoDESDE.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testCodigoDESDE.getIntroduccion()).isEqualTo(UPDATED_INTRODUCCION);
        assertThat(testCodigoDESDE.getTerminologiaComun()).isEqualTo(UPDATED_TERMINOLOGIA_COMUN);
        assertThat(testCodigoDESDE.getImportanciaContexto()).isEqualTo(UPDATED_IMPORTANCIA_CONTEXTO);
        assertThat(testCodigoDESDE.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testCodigoDESDE.getPoblacionObjetivo()).isEqualTo(UPDATED_POBLACION_OBJETIVO);
        assertThat(testCodigoDESDE.getReferencia()).isEqualTo(UPDATED_REFERENCIA);
    }

    @Test
    @Transactional
    void patchNonExistingCodigoDESDE() throws Exception {
        int databaseSizeBeforeUpdate = codigoDESDERepository.findAll().size();
        codigoDESDE.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCodigoDESDEMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, codigoDESDE.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(codigoDESDE))
            )
            .andExpect(status().isBadRequest());

        // Validate the CodigoDESDE in the database
        List<CodigoDESDE> codigoDESDEList = codigoDESDERepository.findAll();
        assertThat(codigoDESDEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCodigoDESDE() throws Exception {
        int databaseSizeBeforeUpdate = codigoDESDERepository.findAll().size();
        codigoDESDE.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCodigoDESDEMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(codigoDESDE))
            )
            .andExpect(status().isBadRequest());

        // Validate the CodigoDESDE in the database
        List<CodigoDESDE> codigoDESDEList = codigoDESDERepository.findAll();
        assertThat(codigoDESDEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCodigoDESDE() throws Exception {
        int databaseSizeBeforeUpdate = codigoDESDERepository.findAll().size();
        codigoDESDE.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCodigoDESDEMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(codigoDESDE))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CodigoDESDE in the database
        List<CodigoDESDE> codigoDESDEList = codigoDESDERepository.findAll();
        assertThat(codigoDESDEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCodigoDESDE() throws Exception {
        // Initialize the database
        codigoDESDERepository.saveAndFlush(codigoDESDE);

        int databaseSizeBeforeDelete = codigoDESDERepository.findAll().size();

        // Delete the codigoDESDE
        restCodigoDESDEMockMvc
            .perform(delete(ENTITY_API_URL_ID, codigoDESDE.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CodigoDESDE> codigoDESDEList = codigoDESDERepository.findAll();
        assertThat(codigoDESDEList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
