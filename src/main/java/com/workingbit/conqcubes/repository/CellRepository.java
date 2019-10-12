package com.workingbit.conqcubes.repository;

import com.workingbit.conqcubes.domain.Cell;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cell entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CellRepository extends JpaRepository<Cell, Long> {

}
