package lk.sliit.quick_task_manager.controller;

import lk.sliit.quick_task_manager.controller.dto.requestDto.TaskRequestDto;
import lk.sliit.quick_task_manager.controller.dto.respnseDto.TaskResponseDto;
import lk.sliit.quick_task_manager.exception.ResourceNotFoundException;
import lk.sliit.quick_task_manager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TaskController {

        @Autowired
        private  TaskService taskService;


        @PostMapping("/users/{userId}/tasks")
        public ResponseEntity<TaskResponseDto> addTask(@PathVariable Long userId,
                                                       @RequestBody TaskRequestDto requestDto) {
            try {
                TaskResponseDto responseDto = taskService.addTask(userId, requestDto);
                return ResponseEntity.ok(responseDto);
            } catch (ResourceNotFoundException e) {
                return ResponseEntity.notFound().build();
            }
        }

        ///users/${userId}/tasks
        // 2. Get all tasks for a user
        @GetMapping("/users/{userId}/tasks")
        public ResponseEntity<List<TaskResponseDto>> getUserTasks(@PathVariable Long userId) {
            try {
                List<TaskResponseDto> tasks = taskService.getUserTasks(userId);
                return ResponseEntity.ok(tasks);
            } catch (ResourceNotFoundException e) {
                return ResponseEntity.notFound().build();
            }
        }

        // 3. Update task status (Pending / Completed)
        @PutMapping("/tasks/{taskId}/status")
        public ResponseEntity<String> updateTaskStatus(@PathVariable Long taskId,
                                                       @RequestParam String status) {
            try {
                taskService.updateTaskStatus(taskId, status);
                return ResponseEntity.ok("Task status updated successfully.");
            } catch (ResourceNotFoundException e) {
                return ResponseEntity.notFound().build();
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
    }
