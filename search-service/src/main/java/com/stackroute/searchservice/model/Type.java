package com.stackroute.searchservice.model;

public enum Type {

    PERSON("Person"),
    NN("Nn"),
    NNS("Nns"),
    NNP("Nnp"),
    NNPS("Nnps");

    private String type;

    Type(String type) {
        this.type = type;
    }

    public String getName() {
        return type;
    }
}

