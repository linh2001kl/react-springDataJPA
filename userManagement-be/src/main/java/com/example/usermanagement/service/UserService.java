package com.example.usermanagement.service;

import com.example.usermanagement.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUser();

    User addUser(User request);

    User getUserById(Integer userId);

    User updateUser(Integer userId, User request);

    void deleteUser(Integer userId);
}
