package com.workingbit.conqcubes.web.rest;

import com.workingbit.conqcubes.ConqcubesApp;
import com.workingbit.conqcubes.domain.Cell;
import com.workingbit.conqcubes.repository.CellRepository;
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
 * Integration tests for the {@link CellResource} REST controller.
 */
@SpringBootTest(classes = ConqcubesApp.class)
public class CellResourceIT {

    private static final Integer DEFAULT_X = 1;
    private static final Integer UPDATED_X = 2;
    private static final Integer SMALLER_X = 1 - 1;

    private static final Integer DEFAULT_Y = 1;
    private static final Integer UPDATED_Y = 2;
    private static final Integer SMALLER_Y = 1 - 1;

    private static final Integer DEFAULT_W = 1;
    private static final Integer UPDATED_W = 2;
    private static final Integer SMALLER_W = 1 - 1;

    private static final Integer DEFAULT_H = 1;
    private static final Integer UPDATED_H = 2;
    private static final Integer SMALLER_H = 1 - 1;

    @Autowired
    private CellRepository cellRepository;

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

    private MockMvc restCellMockMvc;

    private Cell cell;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cell createEntity(EntityManager em) {
        Cell cell = new Cell()
            .x(DEFAULT_X)
            .y(DEFAULT_Y)
            .w(DEFAULT_W)
            .h(DEFAULT_H);
        return cell;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cell createUpdatedEntity(EntityManager em) {
        Cell cell = new Cell()
            .x(UPDATED_X)
            .y(UPDATED_Y)
            .w(UPDATED_W)
            .h(UPDATED_H);
        return cell;
    }

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CellResource cellResource = new CellResource(cellRepository);
        this.restCellMockMvc = MockMvcBuilders.standaloneSetup(cellResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    @BeforeEach
    public void initTest() {
        cell = createEntity(em);
    }

    @Test
    @Transactional
    public void createCell() throws Exception {
        int databaseSizeBeforeCreate = cellRepository.findAll().size();

        // Create the Cell
        restCellMockMvc.perform(post("/api/cells")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cell)))
            .andExpect(status().isCreated());

        // Validate the Cell in the database
        List<Cell> cellList = cellRepository.findAll();
        assertThat(cellList).hasSize(databaseSizeBeforeCreate + 1);
        Cell testCell = cellList.get(cellList.size() - 1);
        assertThat(testCell.getX()).isEqualTo(DEFAULT_X);
        assertThat(testCell.getY()).isEqualTo(DEFAULT_Y);
        assertThat(testCell.getW()).isEqualTo(DEFAULT_W);
        assertThat(testCell.getH()).isEqualTo(DEFAULT_H);
    }

    @Test
    @Transactional
    public void createCellWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cellRepository.findAll().size();

        // Create the Cell with an existing ID
        cell.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCellMockMvc.perform(post("/api/cells")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cell)))
            .andExpect(status().isBadRequest());

        // Validate the Cell in the database
        List<Cell> cellList = cellRepository.findAll();
        assertThat(cellList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCells() throws Exception {
        // Initialize the database
        cellRepository.saveAndFlush(cell);

        // Get all the cellList
        restCellMockMvc.perform(get("/api/cells?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cell.getId().intValue())))
            .andExpect(jsonPath("$.[*].x").value(hasItem(DEFAULT_X)))
            .andExpect(jsonPath("$.[*].y").value(hasItem(DEFAULT_Y)))
            .andExpect(jsonPath("$.[*].w").value(hasItem(DEFAULT_W)))
            .andExpect(jsonPath("$.[*].h").value(hasItem(DEFAULT_H)));
    }

    @Test
    @Transactional
    public void getCell() throws Exception {
        // Initialize the database
        cellRepository.saveAndFlush(cell);

        // Get the cell
        restCellMockMvc.perform(get("/api/cells/{id}", cell.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cell.getId().intValue()))
            .andExpect(jsonPath("$.x").value(DEFAULT_X))
            .andExpect(jsonPath("$.y").value(DEFAULT_Y))
            .andExpect(jsonPath("$.w").value(DEFAULT_W))
            .andExpect(jsonPath("$.h").value(DEFAULT_H));
    }

    @Test
    @Transactional
    public void getNonExistingCell() throws Exception {
        // Get the cell
        restCellMockMvc.perform(get("/api/cells/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCell() throws Exception {
        // Initialize the database
        cellRepository.saveAndFlush(cell);

        int databaseSizeBeforeUpdate = cellRepository.findAll().size();

        // Update the cell
        Cell updatedCell = cellRepository.findById(cell.getId()).get();
        // Disconnect from session so that the updates on updatedCell are not directly saved in db
        em.detach(updatedCell);
        updatedCell
            .x(UPDATED_X)
            .y(UPDATED_Y)
            .w(UPDATED_W)
            .h(UPDATED_H);

        restCellMockMvc.perform(put("/api/cells")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCell)))
            .andExpect(status().isOk());

        // Validate the Cell in the database
        List<Cell> cellList = cellRepository.findAll();
        assertThat(cellList).hasSize(databaseSizeBeforeUpdate);
        Cell testCell = cellList.get(cellList.size() - 1);
        assertThat(testCell.getX()).isEqualTo(UPDATED_X);
        assertThat(testCell.getY()).isEqualTo(UPDATED_Y);
        assertThat(testCell.getW()).isEqualTo(UPDATED_W);
        assertThat(testCell.getH()).isEqualTo(UPDATED_H);
    }

    @Test
    @Transactional
    public void updateNonExistingCell() throws Exception {
        int databaseSizeBeforeUpdate = cellRepository.findAll().size();

        // Create the Cell

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCellMockMvc.perform(put("/api/cells")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cell)))
            .andExpect(status().isBadRequest());

        // Validate the Cell in the database
        List<Cell> cellList = cellRepository.findAll();
        assertThat(cellList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCell() throws Exception {
        // Initialize the database
        cellRepository.saveAndFlush(cell);

        int databaseSizeBeforeDelete = cellRepository.findAll().size();

        // Delete the cell
        restCellMockMvc.perform(delete("/api/cells/{id}", cell.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Cell> cellList = cellRepository.findAll();
        assertThat(cellList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cell.class);
        Cell cell1 = new Cell();
        cell1.setId(1L);
        Cell cell2 = new Cell();
        cell2.setId(cell1.getId());
        assertThat(cell1).isEqualTo(cell2);
        cell2.setId(2L);
        assertThat(cell1).isNotEqualTo(cell2);
        cell1.setId(null);
        assertThat(cell1).isNotEqualTo(cell2);
    }
}
