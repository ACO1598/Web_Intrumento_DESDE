package es.loyola.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import es.loyola.IntegrationTest;
import es.loyola.domain.Clasificador;
import es.loyola.repository.ClasificadorRepository;
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
 * Integration tests for the {@link ClasificadorResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ClasificadorResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_EJEMPLOS = "AAAAAAAAAA";
    private static final String UPDATED_EJEMPLOS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/clasificadors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ClasificadorRepository clasificadorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restClasificadorMockMvc;

    private Clasificador clasificador;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Clasificador createEntity(EntityManager em) {
        Clasificador clasificador = new Clasificador().nombre(DEFAULT_NOMBRE).descripcion(DEFAULT_DESCRIPCION).ejemplos(DEFAULT_EJEMPLOS);
        return clasificador;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Clasificador createUpdatedEntity(EntityManager em) {
        Clasificador clasificador = new Clasificador().nombre(UPDATED_NOMBRE).descripcion(UPDATED_DESCRIPCION).ejemplos(UPDATED_EJEMPLOS);
        return clasificador;
    }

    @BeforeEach
    public void initTest() {
        clasificador = createEntity(em);
    }

    @Test
    @Transactional
    void createClasificador() throws Exception {
        int databaseSizeBeforeCreate = clasificadorRepository.findAll().size();
        // Create the Clasificador
        restClasificadorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(clasificador)))
            .andExpect(status().isCreated());

        // Validate the Clasificador in the database
        List<Clasificador> clasificadorList = clasificadorRepository.findAll();
        assertThat(clasificadorList).hasSize(databaseSizeBeforeCreate + 1);
        Clasificador testClasificador = clasificadorList.get(clasificadorList.size() - 1);
        assertThat(testClasificador.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testClasificador.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testClasificador.getEjemplos()).isEqualTo(DEFAULT_EJEMPLOS);
    }

    @Test
    @Transactional
    void createClasificadorWithExistingId() throws Exception {
        // Create the Clasificador with an existing ID
        clasificador.setId(1L);

        int databaseSizeBeforeCreate = clasificadorRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restClasificadorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(clasificador)))
            .andExpect(status().isBadRequest());

        // Validate the Clasificador in the database
        List<Clasificador> clasificadorList = clasificadorRepository.findAll();
        assertThat(clasificadorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = clasificadorRepository.findAll().size();
        // set the field null
        clasificador.setNombre(null);

        // Create the Clasificador, which fails.

        restClasificadorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(clasificador)))
            .andExpect(status().isBadRequest());

        List<Clasificador> clasificadorList = clasificadorRepository.findAll();
        assertThat(clasificadorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllClasificadors() throws Exception {
        // Initialize the database
        clasificadorRepository.saveAndFlush(clasificador);

        // Get all the clasificadorList
        restClasificadorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clasificador.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].ejemplos").value(hasItem(DEFAULT_EJEMPLOS)));
    }

    @Test
    @Transactional
    void getClasificador() throws Exception {
        // Initialize the database
        clasificadorRepository.saveAndFlush(clasificador);

        // Get the clasificador
        restClasificadorMockMvc
            .perform(get(ENTITY_API_URL_ID, clasificador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(clasificador.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.ejemplos").value(DEFAULT_EJEMPLOS));
    }

    @Test
    @Transactional
    void getNonExistingClasificador() throws Exception {
        // Get the clasificador
        restClasificadorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewClasificador() throws Exception {
        // Initialize the database
        clasificadorRepository.saveAndFlush(clasificador);

        int databaseSizeBeforeUpdate = clasificadorRepository.findAll().size();

        // Update the clasificador
        Clasificador updatedClasificador = clasificadorRepository.findById(clasificador.getId()).get();
        // Disconnect from session so that the updates on updatedClasificador are not directly saved in db
        em.detach(updatedClasificador);
        updatedClasificador.nombre(UPDATED_NOMBRE).descripcion(UPDATED_DESCRIPCION).ejemplos(UPDATED_EJEMPLOS);

        restClasificadorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedClasificador.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedClasificador))
            )
            .andExpect(status().isOk());

        // Validate the Clasificador in the database
        List<Clasificador> clasificadorList = clasificadorRepository.findAll();
        assertThat(clasificadorList).hasSize(databaseSizeBeforeUpdate);
        Clasificador testClasificador = clasificadorList.get(clasificadorList.size() - 1);
        assertThat(testClasificador.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testClasificador.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testClasificador.getEjemplos()).isEqualTo(UPDATED_EJEMPLOS);
    }

    @Test
    @Transactional
    void putNonExistingClasificador() throws Exception {
        int databaseSizeBeforeUpdate = clasificadorRepository.findAll().size();
        clasificador.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClasificadorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, clasificador.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(clasificador))
            )
            .andExpect(status().isBadRequest());

        // Validate the Clasificador in the database
        List<Clasificador> clasificadorList = clasificadorRepository.findAll();
        assertThat(clasificadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchClasificador() throws Exception {
        int databaseSizeBeforeUpdate = clasificadorRepository.findAll().size();
        clasificador.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClasificadorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(clasificador))
            )
            .andExpect(status().isBadRequest());

        // Validate the Clasificador in the database
        List<Clasificador> clasificadorList = clasificadorRepository.findAll();
        assertThat(clasificadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamClasificador() throws Exception {
        int databaseSizeBeforeUpdate = clasificadorRepository.findAll().size();
        clasificador.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClasificadorMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(clasificador)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Clasificador in the database
        List<Clasificador> clasificadorList = clasificadorRepository.findAll();
        assertThat(clasificadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateClasificadorWithPatch() throws Exception {
        // Initialize the database
        clasificadorRepository.saveAndFlush(clasificador);

        int databaseSizeBeforeUpdate = clasificadorRepository.findAll().size();

        // Update the clasificador using partial update
        Clasificador partialUpdatedClasificador = new Clasificador();
        partialUpdatedClasificador.setId(clasificador.getId());

        partialUpdatedClasificador.nombre(UPDATED_NOMBRE).descripcion(UPDATED_DESCRIPCION);

        restClasificadorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedClasificador.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedClasificador))
            )
            .andExpect(status().isOk());

        // Validate the Clasificador in the database
        List<Clasificador> clasificadorList = clasificadorRepository.findAll();
        assertThat(clasificadorList).hasSize(databaseSizeBeforeUpdate);
        Clasificador testClasificador = clasificadorList.get(clasificadorList.size() - 1);
        assertThat(testClasificador.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testClasificador.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testClasificador.getEjemplos()).isEqualTo(DEFAULT_EJEMPLOS);
    }

    @Test
    @Transactional
    void fullUpdateClasificadorWithPatch() throws Exception {
        // Initialize the database
        clasificadorRepository.saveAndFlush(clasificador);

        int databaseSizeBeforeUpdate = clasificadorRepository.findAll().size();

        // Update the clasificador using partial update
        Clasificador partialUpdatedClasificador = new Clasificador();
        partialUpdatedClasificador.setId(clasificador.getId());

        partialUpdatedClasificador.nombre(UPDATED_NOMBRE).descripcion(UPDATED_DESCRIPCION).ejemplos(UPDATED_EJEMPLOS);

        restClasificadorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedClasificador.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedClasificador))
            )
            .andExpect(status().isOk());

        // Validate the Clasificador in the database
        List<Clasificador> clasificadorList = clasificadorRepository.findAll();
        assertThat(clasificadorList).hasSize(databaseSizeBeforeUpdate);
        Clasificador testClasificador = clasificadorList.get(clasificadorList.size() - 1);
        assertThat(testClasificador.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testClasificador.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testClasificador.getEjemplos()).isEqualTo(UPDATED_EJEMPLOS);
    }

    @Test
    @Transactional
    void patchNonExistingClasificador() throws Exception {
        int databaseSizeBeforeUpdate = clasificadorRepository.findAll().size();
        clasificador.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClasificadorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, clasificador.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(clasificador))
            )
            .andExpect(status().isBadRequest());

        // Validate the Clasificador in the database
        List<Clasificador> clasificadorList = clasificadorRepository.findAll();
        assertThat(clasificadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchClasificador() throws Exception {
        int databaseSizeBeforeUpdate = clasificadorRepository.findAll().size();
        clasificador.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClasificadorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(clasificador))
            )
            .andExpect(status().isBadRequest());

        // Validate the Clasificador in the database
        List<Clasificador> clasificadorList = clasificadorRepository.findAll();
        assertThat(clasificadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamClasificador() throws Exception {
        int databaseSizeBeforeUpdate = clasificadorRepository.findAll().size();
        clasificador.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClasificadorMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(clasificador))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Clasificador in the database
        List<Clasificador> clasificadorList = clasificadorRepository.findAll();
        assertThat(clasificadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteClasificador() throws Exception {
        // Initialize the database
        clasificadorRepository.saveAndFlush(clasificador);

        int databaseSizeBeforeDelete = clasificadorRepository.findAll().size();

        // Delete the clasificador
        restClasificadorMockMvc
            .perform(delete(ENTITY_API_URL_ID, clasificador.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Clasificador> clasificadorList = clasificadorRepository.findAll();
        assertThat(clasificadorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
