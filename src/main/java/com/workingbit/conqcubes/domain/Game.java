package com.workingbit.conqcubes.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;

/**
 * A Game.
 */
@Entity
@Table(name = "game")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Game implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Player player;

    @OneToOne
    @JoinColumn(unique = true)
    private Field gameField;

    @ManyToOne
    @JsonIgnoreProperties("gameHistories")
    private Player loggedPlayer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Game player(Player player) {
        this.player = player;
        return this;
    }

    public Field getGameField() {
        return gameField;
    }

    public void setGameField(Field field) {
        this.gameField = field;
    }

    public Game gameField(Field field) {
        this.gameField = field;
        return this;
    }

    public Player getLoggedPlayer() {
        return loggedPlayer;
    }

    public void setLoggedPlayer(Player player) {
        this.loggedPlayer = player;
    }

    public Game loggedPlayer(Player player) {
        this.loggedPlayer = player;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Game)) {
            return false;
        }
        return id != null && id.equals(((Game) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Game{" +
            "id=" + getId() +
            "}";
    }
}
