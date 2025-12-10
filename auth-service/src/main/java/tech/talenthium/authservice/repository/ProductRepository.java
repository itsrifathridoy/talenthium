package tech.talenthium.authservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.talenthium.authservice.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
