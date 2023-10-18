package com.agendaRest.model;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PatientMapper implements RowMapper {

    @Override
    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
        Patient patient = new Patient();
        patient.setIdPaciente(rs.getLong("idPaciente"));
        patient.setNome(rs.getString("nome"));
        patient.setHorario(rs.getString("horario"));
        patient.setProcedimento(rs.getString("procedimento"));
        patient.setDia(rs.getString("dia"));
        return patient;
    }
}