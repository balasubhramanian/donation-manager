package com.bala.donation.user.controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bala.donation.user.rest.model.PermissionModel;
import com.bala.donation.user.rest.model.RoleModel;
import com.bala.donation.user.service.RolePermissionService;

@RestController
public class RolePermissionController {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired RolePermissionService rolePermissionService;

    @RequestMapping(path = "/role", method = RequestMethod.POST)
    public void saveRole(@Valid @RequestBody RoleModel roleModel) {
        rolePermissionService.saveRole(roleModel);
        // Resource<RoleModel> resource = new Resource<RoleModel>(roleModel);
        // resource.add(linkTo(methodOn(UserControllerImpl.class).getAllRoles()).withRel("roles"));
        // return resource;
    }

    @RequestMapping(path = "/role", method = RequestMethod.GET)
    public ResponseEntity<?> getAllRoles() {
        List<RoleModel> rolesModels = rolePermissionService.getAllRoles();
        return ResponseEntity.ok(rolesModels);
    }

    @RequestMapping(path = "/permission", method = RequestMethod.POST)
    public void savePermission(@Valid @RequestBody PermissionModel permissionModel) {
        rolePermissionService.savePermission(permissionModel);
    }

    @RequestMapping(path = "/permission/{id}", method = RequestMethod.DELETE)
    public void disablePermission(@PathVariable("id") Long permissionId) {
        rolePermissionService.disablePermission(permissionId);
    }

    @RequestMapping(path = "/permission", method = RequestMethod.GET)
    public List<PermissionModel> getAllPermissions() {
        List<PermissionModel> permissionModels = rolePermissionService.getAllPermission();
        return permissionModels;
    }

    @RequestMapping(path = "/role/{id}/permission", method = RequestMethod.POST)
    public void addPermissionToRole(@PathVariable("id") Long roleId,
            @Valid @RequestBody List<PermissionModel> permissionModels) {
        rolePermissionService.addPermissionToRole(roleId, permissionModels);
    }

    @RequestMapping(path = "/role/{id}/permission", method = RequestMethod.DELETE)
    public void removePermission(@PathVariable("id") Long roleId,
            @Valid @RequestBody List<PermissionModel> permissionModels) {
        rolePermissionService.removePermissionFromRole(roleId, permissionModels);
    }

    @RequestMapping(path = "/role/{id}/permission", method = RequestMethod.GET)
    public List<PermissionModel> getAllPermissionForRole(@PathVariable("id") Long roleId) {
        List<PermissionModel> permissions = rolePermissionService.getAllPermissionforRole(roleId);
        return permissions;
    }

}
