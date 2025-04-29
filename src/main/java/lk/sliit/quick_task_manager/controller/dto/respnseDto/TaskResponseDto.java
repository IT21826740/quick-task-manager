package lk.sliit.quick_task_manager.controller.dto.respnseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskResponseDto {
    private Long id;
    private String title;
    private String description;
    private LocalDate dueDate;
    private String status;
}
