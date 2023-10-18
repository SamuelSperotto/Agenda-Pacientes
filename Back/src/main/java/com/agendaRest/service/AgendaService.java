package com.agendaRest.service;

import com.agendaRest.model.Patient;

import java.util.List;

public interface AgendaService {
    public Patient insertPatient(Patient patient) throws Exception;

    public void deletePatient(long id) throws Exception;

    public Patient editPatient(Patient patient) throws Exception;

    public List<Patient> searchAll() throws Exception;

    public List<Patient> searchById(long id) throws Exception;
}
