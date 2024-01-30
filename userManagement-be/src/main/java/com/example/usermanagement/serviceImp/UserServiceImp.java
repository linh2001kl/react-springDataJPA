package com.example.usermanagement.serviceImp;

import com.example.usermanagement.model.User;
import com.example.usermanagement.repository.UserRepository;
import com.example.usermanagement.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImp implements UserService {
    private UserRepository userRepository;
    @Override
    public List<User> getAllUser() {
        List<User> userList = userRepository.findAll();
        return userList;
    }

    @Override
    public User addUser(User request) {
        User newUser = User.builder()
                .name(request.getName())
                .cls(request.getCls())
                .birthDay(request.getBirthDay())
                .email(request.getEmail())
                .address(request.getAddress())
                .build();
        return userRepository.save(newUser);
    }

    @Override
    public User getUserById(Integer userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()){
            throw new RuntimeException("User not found");
        }
        return userOptional.get();
    }

    @Override
    public User updateUser(Integer userId, User request) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User existingUser = userOptional.get();

            // Cập nhật thông tin
            existingUser.setName(request.getName());
            existingUser.setCls(request.getCls());
            existingUser.setBirthDay(request.getBirthDay());
            existingUser.setEmail(request.getEmail());
            existingUser.setAddress(request.getAddress());

            // Lưu người dùng đã được cập nhật vào cơ sở dữ liệu
            return userRepository.save(existingUser);
        } else {
            // Trả về null nếu không tìm thấy người dùng với id tương ứng
            return null;
        }
    }

    @Override
    public void deleteUser(Integer userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()){
            userRepository.deleteById(userId);
        }else {
            throw new RuntimeException("User not found");
        }
    }

}
