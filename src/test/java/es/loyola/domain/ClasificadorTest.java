package es.loyola.domain;

import static org.assertj.core.api.Assertions.assertThat;

import es.loyola.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ClasificadorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Clasificador.class);
        Clasificador clasificador1 = new Clasificador();
        clasificador1.setId(1L);
        Clasificador clasificador2 = new Clasificador();
        clasificador2.setId(clasificador1.getId());
        assertThat(clasificador1).isEqualTo(clasificador2);
        clasificador2.setId(2L);
        assertThat(clasificador1).isNotEqualTo(clasificador2);
        clasificador1.setId(null);
        assertThat(clasificador1).isNotEqualTo(clasificador2);
    }
}
