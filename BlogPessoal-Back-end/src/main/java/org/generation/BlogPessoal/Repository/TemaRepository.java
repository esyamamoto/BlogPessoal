package org.generation.BlogPessoal.Repository;

import java.util.List;
import java.util.Optional;

import org.generation.BlogPessoal.Model.Tema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TemaRepository extends JpaRepository<Tema, Long> {
	
	public List<Tema> findAllByDescricaoContainingIgnoreCase(String descricao);

	public Optional<Tema> findByDescricao(String string);
}
