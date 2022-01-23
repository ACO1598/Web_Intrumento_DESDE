package es.loyola.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import es.loyola.IntegrationTest;
import es.loyola.domain.Identificador;
import es.loyola.repository.IdentificadorRepository;
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
 * Integration tests for the {@link IdentificadorResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class IdentificadorResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/identificadors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private IdentificadorRepository identificadorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restIdentificadorMockMvc;

    private Identificador identificador;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Identificador createEntity(EntityManager em) {
        Identificador identificador = new Identificador().nombre(DEFAULT_NOMBRE).codigo(DEFAULT_CODIGO).descripcion(DEFAULT_DESCRIPCION);
        return identificador;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Identificador createUpdatedEntity(EntityManager em) {
        Identificador identificador = new Identificador().nombre(UPDATED_NOMBRE).codigo(UPDATED_CODIGO).descripcion(UPDATED_DESCRIPCION);
        return identificador;
    }

    @BeforeEach
    public void initTest() {
        identificador = createEntity(em);
    }

    @Test
    @Transactional
    void createIdentificador() throws Exception {
        int databaseSizeBeforeCreate = identificadorRepository.findAll().size();
        // Create the Identificador
        restIdentificadorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(identificador)))
            .andExpect(status().isCreated());

        // Validate the Identificador in the database
        List<Identificador> identificadorList = identificadorRepository.findAll();
        assertThat(identificadorList).hasSize(databaseSizeBeforeCreate + 1);
        Identificador testIdentificador = identificadorList.get(identificadorList.size() - 1);
        assertThat(testIdentificador.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testIdentificador.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testIdentificador.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    void createIdentificadorWithExistingId() throws Exception {
        // Create the Identificador with an existing ID
        identificador.setId(1L);

        int databaseSizeBeforeCreate = identificadorRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restIdentificadorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(identificador)))
            .andExpect(status().isBadRequest());

        // Validate the Identificador in the database
        List<Identificador> identificadorList = identificadorRepository.findAll();
        assertThat(identificadorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = identificadorRepository.findAll().size();
        // set the field null
        identificador.setNombre(null);

        // Create the Identificador, which fails.

        restIdentificadorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(identificador)))
            .andExpect(status().isBadRequest());

        List<Identificador> identificadorList = identificadorRepository.findAll();
        assertThat(identificadorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCodigoIsRequired() throws Exception {
        int databaseSizeBeforeTest = identificadorRepository.findAll().size();
        // set the field null
        identificador.setCodigo(null);

        // Create the Identificador, which fails.

        restIdentificadorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(identificador)))
            .andExpect(status().isBadRequest());

        List<Identificador> identificadorList = identificadorRepository.findAll();
        assertThat(identificadorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllIdentificadors() throws Exception {
        // Initialize the database
        identificadorRepository.saveAndFlush(identificador);

        // Get all the identificadorList
        restIdentificadorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(identificador.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));
    }

    @Test
    @Transactional
    void getIdentificador() throws Exception {
        // Initialize the database
        identificadorRepository.saveAndFlush(identificador);

        // Get the identificador
        restIdentificadorMockMvc
            .perform(get(ENTITY_API_URL_ID, identificador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(identificador.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION));
    }

    @Test
    @Transactional
    void getNonExistingIdentificador() throws Exception {
        // Get the identificador
        restIdentificadorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewIdentificador() throws Exception {
        // Initialize the database
        identificadorRepository.saveAndFlush(identificador);

        int databaseSizeBeforeUpdate = identificadorRepository.findAll().size();

        // Update the identificador
        Identificador updatedIdentificador = identificadorRepository.findById(identificador.getId()).get();
        // Disconnect from session so that the updates on updatedIdentificador are not directly saved in db
        em.detach(updatedIdentificador);
        updatedIdentificador.nombre(UPDATED_NOMBRE).codigo(UPDATED_CODIGO).descripcion(UPDATED_DESCRIPCION);

        restIdentificadorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedIdentificador.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedIdentificador))
            )
            .andExpect(status().isOk());

        // Validate the Identificador in the database
        List<Identificador> identificadorList = identificadorRepository.findAll();
        assertThat(identificadorList).hasSize(databaseSizeBeforeUpdate);
        Identificador testIdentificador = identificadorList.get(identificadorList.size() - 1);
        assertThat(testIdentificador.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testIdentificador.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testIdentificador.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    void putNonExistingIdentificador() throws Exception {
        int databaseSizeBeforeUpdate = identificadorRepository.findAll().size();
        identificador.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIdentificadorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, identificador.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(identificador))
            )
            .andExpect(status().isBadRequest());

        // Validate the Identificador in the database
        List<Identificador> identificadorList = identificadorRepository.findAll();
        assertThat(identificadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchIdentificador() throws Exception {
        int databaseSizeBeforeUpdate = identificadorRepository.findAll().size();
        identificador.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIdentificadorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(identificador))
            )
            .andExpect(status().isBadRequest());

        // Validate the Identificador in the database
        List<Identificador> identificadorList = identificadorRepository.findAll();
        assertThat(identificadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamIdentificador() throws Exception {
        int databaseSizeBeforeUpdate = identificadorRepository.findAll().size();
        identificador.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIdentificadorMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(identificador)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Identificador in the database
        List<Identificador> identificadorList = identificadorRepository.findAll();
        assertThat(identificadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateIdentificadorWithPatch() throws Exception {
        // Initialize the database
        identificadorRepository.saveAndFlush(identificador);

        int databaseSizeBeforeUpdate = identificadorRepository.findAll().size();

        // Update the identificador using partial update
        Identificador partialUpdatedIdentificador = new Identificador();
        partialUpdatedIdentificador.setId(identificador.getId());

        restIdentificadorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedIdentificador.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedIdentificador))
            )
            .andExpect(status().isOk());

        // Validate the Identificador in the database
        List<Identificador> identificadorList = identificadorRepository.findAll();
        assertThat(identificadorList).hasSize(databaseSizeBeforeUpdate);
        Identificador testIdentificador = identificadorList.get(identificadorList.size() - 1);
        assertThat(testIdentificador.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testIdentificador.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testIdentificador.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    void fullUpdateIdentificadorWithPatch() throws Exception {
        // Initialize the database
        identificadorRepository.saveAndFlush(identificador);

        int databaseSizeBeforeUpdate = identificadorRepository.findAll().size();

        // Update the identificador using partial update
        Identificador partialUpdatedIdentificador = new Identificador();
        partialUpdatedIdentificador.setId(identificador.getId());

        partialUpdatedIdentificador.nombre(UPDATED_NOMBRE).codigo(UPDATED_CODIGO).descripcion(UPDATED_DESCRIPCION);

        restIdentificadorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedIdentificador.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedIdentificador))
            )
            .andExpect(status().isOk());

        // Validate the Identificador in the database
        List<Identificador> identificadorList = identificadorRepository.findAll();
        assertThat(identificadorList).hasSize(databaseSizeBeforeUpdate);
        Identificador testIdentificador = identificadorList.get(identificadorList.size() - 1);
        assertThat(testIdentificador.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testIdentificador.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testIdentificador.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    void patchNonExistingIdentificador() throws Exception {
        int databaseSizeBeforeUpdate = identificadorRepository.findAll().size();
        identificador.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIdentificadorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, identificador.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(identificador))
            )
            .andExpect(status().isBadRequest());

        // Validate the Identificador in the database
        List<Identificador> identificadorList = identificadorRepository.findAll();
        assertThat(identificadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchIdentificador() throws Exception {
        int databaseSizeBeforeUpdate = identificadorRepository.findAll().size();
        identificador.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIdentificadorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(identificador))
            )
            .andExpect(status().isBadRequest());

        // Validate the Identificador in the database
        List<Identificador> identificadorList = identificadorRepository.findAll();
        assertThat(identificadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamIdentificador() throws Exception {
        int databaseSizeBeforeUpdate = identificadorRepository.findAll().size();
        identificador.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIdentificadorMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(identificador))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Identificador in the database
        List<Identificador> identificadorList = identificadorRepository.findAll();
        assertThat(identificadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteIdentificador() throws Exception {
        // Initialize the database
        identificadorRepository.saveAndFlush(identificador);

        int databaseSizeBeforeDelete = identificadorRepository.findAll().size();

        // Delete the identificador
        restIdentificadorMockMvc
            .perform(delete(ENTITY_API_URL_ID, identificador.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Identificador> identificadorList = identificadorRepository.findAll();
        assertThat(identificadorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
