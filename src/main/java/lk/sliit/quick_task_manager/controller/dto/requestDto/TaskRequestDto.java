package lk.sliit.quick_task_manager.controller.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequestDto {
    
    private String title;

    private String description;

    private LocalDate dueDate;
}
