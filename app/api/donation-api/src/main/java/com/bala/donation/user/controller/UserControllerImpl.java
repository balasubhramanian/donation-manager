package com.bala.donation.user.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bala.donation.common.exception.AppException;
import com.bala.donation.common.exception.UserError;
import com.bala.donation.user.entity.PermissionEntity;
import com.bala.donation.user.entity.RoleEntity;
import com.bala.donation.user.entity.RolePermissionEntity;
import com.bala.donation.user.entity.UserEntity;
import com.bala.donation.user.entity.UserRoleEntity;
import com.bala.donation.user.repo.PermisssionRepo;
import com.bala.donation.user.repo.RolePermissionRepo;
import com.bala.donation.user.repo.RoleRepo;
import com.bala.donation.user.repo.UserRepo;
import com.bala.donation.user.repo.UserRoleRepo;
import com.bala.donation.user.rest.model.PermissionModel;
import com.bala.donation.user.rest.model.RoleModel;
import com.bala.donation.user.rest.model.User;
import com.bala.donation.user.service.UserService;

@RestController
public class UserControllerImpl implements UserController {

    private static final String STATUS_ACTIVE = "D";

    org.slf4j.Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    UserService userService;

    @Autowired
    UserRepo userRepo;

    @Autowired
    RoleRepo roleRepo;
    @Autowired
    PermisssionRepo permissionRepo;
    @Autowired
    RolePermissionRepo rolePermissionRepo;
    @Autowired
    UserRoleRepo userRoleRepo;

    @Override
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @RequestMapping(path = "/user", method = RequestMethod.POST)
    public ResponseEntity<?> save(@Valid @RequestBody User user) {
        userService.saveUser(user);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(path = "/user/{id}", method = RequestMethod.GET)
    public User getUser(@PathVariable("id") Long id) {
        return userService.getUsers(id);
    }

    @RequestMapping(path = "/user/{id}", method = RequestMethod.POST)
    public void updateUser(@PathVariable("id") Long id, @Valid @RequestBody User user) {
        userService.updateUser(id, user);
    }

    @RequestMapping(path = "/user/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
    }

    @RequestMapping(path = "/role", method = RequestMethod.POST)
    public Resource<RoleModel> saveRole(@Valid @RequestBody RoleModel roleModel) {
        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setName(roleModel.getName());
        roleEntity.setDescription(roleModel.getDescription());
        roleRepo.save(roleEntity);

        roleModel.setId(roleEntity.getId());

        Resource<RoleModel> resource = new Resource<RoleModel>(roleModel);
        resource.add(linkTo(methodOn(UserControllerImpl.class).getAllRoles()).withRel("roles"));

        return resource;
    }

    @Override
    @RequestMapping(path = "/role", method = RequestMethod.GET)
    public ResponseEntity<?> getAllRoles() {
        List<RoleEntity> roles = roleRepo.findAll();

        List<RoleModel> rolesModels = roles.stream().map((role) -> {
            RoleModel roleModel = new RoleModel();
            roleModel.setId(role.getId());
            roleModel.setName(role.getName());
            roleModel.setDescription(role.getDescription());
            return roleModel;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(rolesModels);
    }

    @RequestMapping(path = "/permission", method = RequestMethod.POST)
    public PermissionModel savePermission(@Valid @RequestBody PermissionModel permissionModel) {
        PermissionEntity permissionEntity = new PermissionEntity();
        permissionEntity.setName(permissionModel.getName());
        permissionEntity.setDescription(permissionModel.getDescription());
        permissionRepo.save(permissionEntity);

        permissionModel.setId(permissionEntity.getId());

        return permissionModel;
    }

    @RequestMapping(path = "/permission/{id}", method = RequestMethod.DELETE)
    public void disablePermission(@PathVariable("id") Long permissionId) {
        PermissionEntity permissionEntity = permissionRepo.findOne(permissionId);
        if (permissionEntity == null) {
            throw new AppException(UserError.PERMISSION_NOT_FOUND);
        }

        permissionEntity.setStatus(STATUS_ACTIVE);
        permissionRepo.save(permissionEntity);

    }

    @RequestMapping(path = "/permission", method = RequestMethod.GET)
    public List<PermissionModel> getAllPermissions() {
        List<PermissionEntity> permissionEntities = permissionRepo.findAll();

        List<PermissionModel> permissionModels = permissionEntities.stream().map((permission) -> {
            PermissionModel permissionModel = new PermissionModel();
            permissionModel.setId(permission.getId());
            permissionModel.setName(permission.getName());
            permissionModel.setDescription(permission.getDescription());
            return permissionModel;
        }).collect(Collectors.toList());

        return permissionModels;
    }

    @RequestMapping(path = "/role/{id}/permission", method = RequestMethod.POST)
    public void addPermissionToRole(@PathVariable("id") Long roleId,
            @Valid @RequestBody List<PermissionModel> permissionModels) {

        RoleEntity roleEntity = roleRepo.findOne(roleId);
        if (roleEntity == null) {
            throw new AppException(UserError.ROLE_NOT_FOUND);
        }

        permissionModels.forEach((permissionModel) -> {
            PermissionEntity permissionEntity = permissionRepo.findOne(permissionModel.getId());
            if (permissionEntity == null) {
                throw new AppException(UserError.PERMISSION_NOT_FOUND);
            }

            RolePermissionEntity rolePermissionEntity = new RolePermissionEntity();
            rolePermissionEntity.setRole(roleEntity);
            rolePermissionEntity.setPermission(permissionEntity);
            rolePermissionRepo.save(rolePermissionEntity);
        });
    }

    @RequestMapping(path = "/role/{id}/permission", method = RequestMethod.DELETE)
    public void removePermission(@PathVariable("id") Long roleId,
            @Valid @RequestBody List<PermissionModel> permissionModels) {

        RoleEntity roleEntity = roleRepo.findOne(roleId);
        if (roleEntity == null) {
            throw new AppException(UserError.ROLE_NOT_FOUND);
        }

        permissionModels.forEach((permissionModel) -> {
            PermissionEntity permissionEntity = permissionRepo.findOne(permissionModel.getId());
            if (permissionEntity == null) {
                throw new AppException(UserError.PERMISSION_NOT_FOUND);
            }

            RolePermissionEntity rolePermissionEntity = rolePermissionRepo
                    .findByRoleIdAndPermissionId(roleEntity.getId(), permissionEntity.getId());

            if (rolePermissionEntity == null) {
                throw new AppException(UserError.PERMISSION_NOT_AVAILABLE_FOR_ROLE);
            }

            rolePermissionRepo.delete(rolePermissionEntity);
        });
    }

    @RequestMapping(path = "/role/{id}/permission", method = RequestMethod.GET)
    public List<PermissionModel> getAllPermissionForRole(@PathVariable("id") Long roleId) {
        List<RolePermissionEntity> rolePermissionEntities = rolePermissionRepo.findByRoleId(roleId);
        if (CollectionUtils.isEmpty(rolePermissionEntities)) {
            return new ArrayList<>();
        }

        List<PermissionModel> permissions = rolePermissionEntities.stream().map((rolePermission) -> {
            PermissionModel model = new PermissionModel();
            PermissionEntity permission = rolePermission.getPermission();
            model.setId(permission.getId());
            model.setName(permission.getName());
            model.setDescription(permission.getDescription());
            return model;
        }).collect(Collectors.toList());

        return permissions;
    }

    @RequestMapping(path = "/user/{id}/role", method = RequestMethod.POST)
    public void addRoleToUser(@PathVariable("id") Long userId, @Valid @RequestBody List<RoleModel> roleModels) {

        UserEntity userEntity = userRepo.findOne(userId);
        if (userEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }

        roleModels.forEach((roleModel) -> {
            RoleEntity roleEntity = roleRepo.findOne(roleModel.getId());
            if (roleEntity == null) {
                throw new AppException(UserError.ROLE_NOT_FOUND);
            }

            UserRoleEntity userRoleEntity = new UserRoleEntity();
            userRoleEntity.setUser(userEntity);
            userRoleEntity.setRole(roleEntity);
            userRoleRepo.save(userRoleEntity);
        });
    }

    @RequestMapping(path = "/user/{id}/role", method = RequestMethod.DELETE)
    public void removeRoleFromUser(@PathVariable("id") Long userId, @Valid @RequestBody List<RoleModel> roleModels) {

        UserEntity userEntity = userRepo.findOne(userId);
        if (userEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }

        roleModels.forEach((roleModel) -> {
            RoleEntity roleEntity = roleRepo.findOne(roleModel.getId());
            if (roleEntity == null) {
                throw new AppException(UserError.ROLE_NOT_FOUND);
            }

            UserRoleEntity userRoleEntity = userRoleRepo.findByUserIdAndRoleId(userEntity.getId(), roleEntity.getId());
            if (userRoleEntity == null) {
                throw new AppException(UserError.ROLE_NOT_AVAILABLE_FOR_USER);
            }
            userRoleRepo.delete(userRoleEntity);
        });
    }

    @RequestMapping(path = "/user/{id}/role", method = RequestMethod.GET)
    public List<RoleModel> getAllRoleForUser(@PathVariable("id") Long userId) {

        UserEntity userEntity = userRepo.findOne(userId);
        if (userEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }

        List<UserRoleEntity> userRoleEntities = userRoleRepo.findByUserId(userEntity.getId());

        List<RoleModel> roleModels = userRoleEntities.stream().map((userRole) -> {
            RoleModel roleModel = new RoleModel();
            roleModel.setId(userRole.getRole().getId());
            roleModel.setName(userRole.getRole().getName());
            roleModel.setDescription(userRole.getRole().getDescription());
            return roleModel;
        }).collect(Collectors.toList());

        return roleModels;
    }

}
