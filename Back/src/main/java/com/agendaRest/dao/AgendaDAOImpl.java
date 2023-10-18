package com.agendaRest.dao;


import com.agendaRest.model.Patient;
import com.agendaRest.model.PatientMapper;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;


import java.util.Arrays;

import java.util.List;

@Repository
public class AgendaDAOImpl implements AgendaDAO {


    @Autowired
    private JdbcTemplate jdbc;
    private String sql;

    @Override
    public Patient insertPatient(Patient patient) throws Exception {
        SimpleJdbcInsert insert = new SimpleJdbcInsert(jdbc);
        insert.setTableName("PATIENT");
        insert.setColumnNames(Arrays.asList("nome","horario","procedimento","dia"));
        insert.setGeneratedKeyName("idPaciente");
        Number key = insert.executeAndReturnKey(new BeanPropertySqlParameterSource(patient));
        patient.setIdPaciente(key.longValue());
        return patient;

    }

    @Override
    public void deletePatient(long id) throws Exception {
        sql = "DELETE FROM PATIENT WHERE idPaciente = ?";
        jdbc.update(sql, id);
    }

    @Override
    public Patient editPatient(Patient patient) throws Exception {
        sql = "UPDATE PATIENT SET nome = ?, horario = ?, procedimento= ?,dia = ? " + "WHERE idPaciente = ?";
        jdbc.update(sql, patient.getNome(), patient.getHorario(),
                patient.getProcedimento(), patient.getDia(),patient.getIdPaciente());

        return patient;
    }

    @Override
    public List<Patient> searchAll() throws Exception {
        sql = "SELECT * FROM PATIENT";
        List<Patient> list = jdbc.query(sql, new PatientMapper());
        return list;
    }

    @Override
    public List<Patient> searchById(long id) throws Exception {
        sql = "SELECT  * FROM PATIENT WHERE idPaciente = ?";
        return jdbc.query(sql, new PatientMapper(), id);
    }
}