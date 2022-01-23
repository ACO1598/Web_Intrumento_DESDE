package es.loyola.domain;

import static org.assertj.core.api.Assertions.assertThat;

import es.loyola.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CodigoDESDETest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CodigoDESDE.class);
        CodigoDESDE codigoDESDE1 = new CodigoDESDE();
        codigoDESDE1.setId(1L);
        CodigoDESDE codigoDESDE2 = new CodigoDESDE();
        codigoDESDE2.setId(codigoDESDE1.getId());
        assertThat(codigoDESDE1).isEqualTo(codigoDESDE2);
        codigoDESDE2.setId(2L);
        assertThat(codigoDESDE1).isNotEqualTo(codigoDESDE2);
        codigoDESDE1.setId(null);
        assertThat(codigoDESDE1).isNotEqualTo(codigoDESDE2);
    }
}
