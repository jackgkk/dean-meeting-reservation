package com.iww.deanmeetingreservations.Models;


import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Objects;
import java.util.UUID;

//https://docs.jboss.org/hibernate/orm/5.4/javadocs/
//https://thorben-janssen.com/key-jpa-hibernate-annotations/

@Entity
//@Table(name = "TESTMODEL", schema = "DEAN", catalog = "")
//@DynamicUpdate
public class TestModel {

    @Id
    @GeneratedValue
    private UUID testid;
    private String testString;

    // Most methods are auto-generated through IDE / can be automated with lombok

    public TestModel() {
    }

    public TestModel(String testString) {
        this.testString = testString;
    }

    public void setTestid(UUID testid) {
        this.testid = testid;
    }

    public UUID getTestid() {
        return testid;
    }

    public String getTestString() {
        return testString;
    }

    public void setTestString(String testString) {
        this.testString = testString;
    }

    //Watch out for recursive method calls in connected entities
    //hashcode and equals may be required for collection methods and serializing

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TestModel)) return false;
        TestModel testModel = (TestModel) o;
        return testid.equals(testModel.testid) &&
                Objects.equals(testString, testModel.testString);
    }

    @Override
    public int hashCode() {
        return Objects.hash(testid, testString);
    }

    @Override
    public String toString() {
        return "TestModel{" +
                "testid=" + testid +
                ", testString='" + testString + '\'' +
                '}';
    }
}
