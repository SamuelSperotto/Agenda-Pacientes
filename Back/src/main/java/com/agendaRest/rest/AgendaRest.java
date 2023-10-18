package com.agendaRest.rest;

import com.agendaRest.model.Patient;
import com.agendaRest.service.AgendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("patient")
@CrossOrigin(origins = "*")
public class AgendaRest {

    @Autowired
    private AgendaService agendaService;

    @PostMapping()
    public Patient insertPatient(@RequestBody Patient patient){
        try {
            return agendaService.insertPatient(patient);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }

    }
    @DeleteMapping(path = "/delete/{id}")
    public void deletePatient(@PathVariable("id") long id) {
        try {
            agendaService.deletePatient(id);
        }catch (Exception e){
            e.printStackTrace();

        }

    }
    @PutMapping()
    public Patient editPatient(@RequestBody Patient patient){
        try {
            return agendaService.editPatient(patient);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }

    }
    @GetMapping("/all")
    public List<Patient> searchAll() {
        try {
            return agendaService.searchAll();
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }

    }
    @GetMapping(path = "/searchById/{id}")
    public List<Patient> searchById(@PathVariable("id") long id){
        try {
            return agendaService.searchById(id);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }

    }
}
