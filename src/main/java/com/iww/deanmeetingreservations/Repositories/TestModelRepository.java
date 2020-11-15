package com.iww.deanmeetingreservations.Repositories;

import com.iww.deanmeetingreservations.Models.TestModel;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

//Interface for interacting with the database
//https://www.baeldung.com/spring-data-jpa-query

@Repository
public interface TestModelRepository extends CrudRepository<TestModel, UUID> {

    //Declared method name defines behaviour / Implementation is auto generated
    Optional<TestModel> getFirstByTestStringIsLikeIgnoreCase(String likeString);

    //JPQL query
    @Query("select t from TestModel t where t.testString like ?1")
    List<TestModel> customJPQLquery(String likeString, Sort sort);

    //native query
    @Query(value = "SELECT * FROM TEST_MODEL WHERE TESTSTRING LIKE ?1",nativeQuery = true)
    List<TestModel> customNativeQuery(String likeString);
}
