package es.loyola.domain;

import static org.assertj.core.api.Assertions.assertThat;

import es.loyola.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class IdentificadorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Identificador.class);
        Identificador identificador1 = new Identificador();
        identificador1.setId(1L);
        Identificador identificador2 = new Identificador();
        identificador2.setId(identificador1.getId());
        assertThat(identificador1).isEqualTo(identificador2);
        identificador2.setId(2L);
        assertThat(identificador1).isNotEqualTo(identificador2);
        identificador1.setId(null);
        assertThat(identificador1).isNotEqualTo(identificador2);
    }
}
