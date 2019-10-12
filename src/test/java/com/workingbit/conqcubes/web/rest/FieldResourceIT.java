package com.workingbit.conqcubes.web.rest;

import com.workingbit.conqcubes.ConqcubesApp;
import com.workingbit.conqcubes.domain.Field;
import com.workingbit.conqcubes.repository.FieldRepository;
import com.workingbit.conqcubes.web.rest.errors.ExceptionTranslator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.workingbit.conqcubes.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link FieldResource} REST controller.
 */
@SpringBootTest(classes = ConqcubesApp.class)
public class FieldResourceIT {

    private static final Integer DEFAULT_WIDTH = 1;
    private static final Integer UPDATED_WIDTH = 2;
    private static final Integer SMALLER_WIDTH = 1 - 1;

    private static final Integer DEFAULT_HEIGHT = 1;
    private static final Integer UPDATED_HEIGHT = 2;
    private static final Integer SMALLER_HEIGHT = 1 - 1;

    @Autowired
    private FieldRepository fieldRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restFieldMockMvc;

    private Field field;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Field createEntity(EntityManager em) {
        Field field = new Field()
            .width(DEFAULT_WIDTH)
            .height(DEFAULT_HEIGHT);
        return field;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Field createUpdatedEntity(EntityManager em) {
        Field field = new Field()
            .width(UPDATED_WIDTH)
            .height(UPDATED_HEIGHT);
        return field;
    }

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FieldResource fieldResource = new FieldResource(fieldRepository);
        this.restFieldMockMvc = MockMvcBuilders.standaloneSetup(fieldResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    @BeforeEach
    public void initTest() {
        field = createEntity(em);
    }

    @Test
    @Transactional
    public void createField() throws Exception {
        int databaseSizeBeforeCreate = fieldRepository.findAll().size();

        // Create the Field
        restFieldMockMvc.perform(post("/api/fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(field)))
            .andExpect(status().isCreated());

        // Validate the Field in the database
        List<Field> fieldList = fieldRepository.findAll();
        assertThat(fieldList).hasSize(databaseSizeBeforeCreate + 1);
        Field testField = fieldList.get(fieldList.size() - 1);
        assertThat(testField.getWidth()).isEqualTo(DEFAULT_WIDTH);
        assertThat(testField.getHeight()).isEqualTo(DEFAULT_HEIGHT);
    }

    @Test
    @Transactional
    public void createFieldWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fieldRepository.findAll().size();

        // Create the Field with an existing ID
        field.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFieldMockMvc.perform(post("/api/fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(field)))
            .andExpect(status().isBadRequest());

        // Validate the Field in the database
        List<Field> fieldList = fieldRepository.findAll();
        assertThat(fieldList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFields() throws Exception {
        // Initialize the database
        fieldRepository.saveAndFlush(field);

        // Get all the fieldList
        restFieldMockMvc.perform(get("/api/fields?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(field.getId().intValue())))
            .andExpect(jsonPath("$.[*].width").value(hasItem(DEFAULT_WIDTH)))
            .andExpect(jsonPath("$.[*].height").value(hasItem(DEFAULT_HEIGHT)));
    }

    @Test
    @Transactional
    public void getField() throws Exception {
        // Initialize the database
        fieldRepository.saveAndFlush(field);

        // Get the field
        restFieldMockMvc.perform(get("/api/fields/{id}", field.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(field.getId().intValue()))
            .andExpect(jsonPath("$.width").value(DEFAULT_WIDTH))
            .andExpect(jsonPath("$.height").value(DEFAULT_HEIGHT));
    }

    @Test
    @Transactional
    public void getNonExistingField() throws Exception {
        // Get the field
        restFieldMockMvc.perform(get("/api/fields/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateField() throws Exception {
        // Initialize the database
        fieldRepository.saveAndFlush(field);

        int databaseSizeBeforeUpdate = fieldRepository.findAll().size();

        // Update the field
        Field updatedField = fieldRepository.findById(field.getId()).get();
        // Disconnect from session so that the updates on updatedField are not directly saved in db
        em.detach(updatedField);
        updatedField
            .width(UPDATED_WIDTH)
            .height(UPDATED_HEIGHT);

        restFieldMockMvc.perform(put("/api/fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedField)))
            .andExpect(status().isOk());

        // Validate the Field in the database
        List<Field> fieldList = fieldRepository.findAll();
        assertThat(fieldList).hasSize(databaseSizeBeforeUpdate);
        Field testField = fieldList.get(fieldList.size() - 1);
        assertThat(testField.getWidth()).isEqualTo(UPDATED_WIDTH);
        assertThat(testField.getHeight()).isEqualTo(UPDATED_HEIGHT);
    }

    @Test
    @Transactional
    public void updateNonExistingField() throws Exception {
        int databaseSizeBeforeUpdate = fieldRepository.findAll().size();

        // Create the Field

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFieldMockMvc.perform(put("/api/fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(field)))
            .andExpect(status().isBadRequest());

        // Validate the Field in the database
        List<Field> fieldList = fieldRepository.findAll();
        assertThat(fieldList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteField() throws Exception {
        // Initialize the database
        fieldRepository.saveAndFlush(field);

        int databaseSizeBeforeDelete = fieldRepository.findAll().size();

        // Delete the field
        restFieldMockMvc.perform(delete("/api/fields/{id}", field.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Field> fieldList = fieldRepository.findAll();
        assertThat(fieldList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Field.class);
        Field field1 = new Field();
        field1.setId(1L);
        Field field2 = new Field();
        field2.setId(field1.getId());
        assertThat(field1).isEqualTo(field2);
        field2.setId(2L);
        assertThat(field1).isNotEqualTo(field2);
        field1.setId(null);
        assertThat(field1).isNotEqualTo(field2);
    }
}
