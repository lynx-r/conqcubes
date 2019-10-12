package com.workingbit.conqcubes.web.rest;

import com.workingbit.conqcubes.domain.Cell;
import com.workingbit.conqcubes.repository.CellRepository;
import com.workingbit.conqcubes.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.workingbit.conqcubes.domain.Cell}.
 */
@RestController
@RequestMapping("/api")
public class CellResource {

    private static final String ENTITY_NAME = "cell";
    private final Logger log = LoggerFactory.getLogger(CellResource.class);
    private final CellRepository cellRepository;
    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public CellResource(CellRepository cellRepository) {
        this.cellRepository = cellRepository;
    }

    /**
     * {@code POST  /cells} : Create a new cell.
     *
     * @param cell the cell to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cell, or with status {@code 400 (Bad Request)} if the cell has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cells")
    public ResponseEntity<Cell> createCell(@RequestBody Cell cell) throws URISyntaxException {
        log.debug("REST request to save Cell : {}", cell);
        if (cell.getId() != null) {
            throw new BadRequestAlertException("A new cell cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cell result = cellRepository.save(cell);
        return ResponseEntity.created(new URI("/api/cells/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cells} : Updates an existing cell.
     *
     * @param cell the cell to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cell,
     * or with status {@code 400 (Bad Request)} if the cell is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cell couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cells")
    public ResponseEntity<Cell> updateCell(@RequestBody Cell cell) throws URISyntaxException {
        log.debug("REST request to update Cell : {}", cell);
        if (cell.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cell result = cellRepository.save(cell);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cell.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cells} : get all the cells.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cells in body.
     */
    @GetMapping("/cells")
    public List<Cell> getAllCells() {
        log.debug("REST request to get all Cells");
        return cellRepository.findAll();
    }

    /**
     * {@code GET  /cells/:id} : get the "id" cell.
     *
     * @param id the id of the cell to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cell, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cells/{id}")
    public ResponseEntity<Cell> getCell(@PathVariable Long id) {
        log.debug("REST request to get Cell : {}", id);
        Optional<Cell> cell = cellRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cell);
    }

    /**
     * {@code DELETE  /cells/:id} : delete the "id" cell.
     *
     * @param id the id of the cell to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cells/{id}")
    public ResponseEntity<Void> deleteCell(@PathVariable Long id) {
        log.debug("REST request to delete Cell : {}", id);
        cellRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
