package com.agendaRest.service;

import com.agendaRest.dao.AgendaDAO;
import com.agendaRest.model.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
public class AgendaServiceImpl implements AgendaService{

    @Autowired
    private AgendaDAO agendaDAO;

    @Override
    public Patient insertPatient(Patient patient) throws Exception {
        return agendaDAO.insertPatient(patient);
    }

    @Override
    public void deletePatient(long id) throws Exception {
        agendaDAO.deletePatient(id);
    }

    @Override
    public Patient editPatient(Patient patient) throws Exception {
        return agendaDAO.editPatient(patient);
    }

    @Override
    public List<Patient> searchAll() throws Exception {
        return agendaDAO.searchAll();
    }

    @Override
    public List<Patient> searchById(long id) throws Exception {
        return agendaDAO.searchById(id);
    }
}
