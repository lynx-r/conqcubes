package com.workingbit.conqcubes.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Player.
 */
@Entity
@Table(name = "player")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Player implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @OneToMany(mappedBy = "player")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Cell> capturedCells = new HashSet<>();

    @OneToMany(mappedBy = "loggedPlayer")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Game> gameHistories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Player firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Player lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public Set<Cell> getCapturedCells() {
        return capturedCells;
    }

    public void setCapturedCells(Set<Cell> cells) {
        this.capturedCells = cells;
    }

    public Player capturedCells(Set<Cell> cells) {
        this.capturedCells = cells;
        return this;
    }

    public Player addCapturedCell(Cell cell) {
        this.capturedCells.add(cell);
        cell.setPlayer(this);
        return this;
    }

    public Player removeCapturedCell(Cell cell) {
        this.capturedCells.remove(cell);
        cell.setPlayer(null);
        return this;
    }

    public Set<Game> getGameHistories() {
        return gameHistories;
    }

    public void setGameHistories(Set<Game> games) {
        this.gameHistories = games;
    }

    public Player gameHistories(Set<Game> games) {
        this.gameHistories = games;
        return this;
    }

    public Player addGameHistory(Game game) {
        this.gameHistories.add(game);
        game.setLoggedPlayer(this);
        return this;
    }

    public Player removeGameHistory(Game game) {
        this.gameHistories.remove(game);
        game.setLoggedPlayer(null);
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Player)) {
            return false;
        }
        return id != null && id.equals(((Player) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Player{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            "}";
    }
}
