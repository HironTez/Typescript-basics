import { GetAllByBoardT, GetByIdAndBoardT, UpdateTaskT, DeleteTaskT } from './task.types';
import { Task } from './task.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskDataDto } from './dto/task-data.dto';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) { };

    /**
     * Returns an array of tasks which have a board with the specified ID
     * @param {string} boardId ID board to search
     * @returns {Array<TaskT>} Array of tasks
     */
    getAllTasksByBoardId: GetAllByBoardT = async (boardId) => await this.tasksRepository.find({ boardId: boardId });

    /**
    /**
     * Returns the task with the specified ID which have a board with the specified ID
     * @param {string} id ID task to search
     * @param {string} boardId ID board to search
     * @returns {TaskT} Task
     */
    getByIdAndBoardId: GetByIdAndBoardT = async (id, boardId) => await this.tasksRepository.findOne({ id: id, boardId: boardId });

    /**
     * Adds a task to the DataBase
     * @param {TaskT} task Task to add to the DataBase
     * @returns {Promise<boolean>} Task added successfully
     */
    addTask = async (taskData: TaskDataDto, boardId: string): Promise<Task> => {
        const task = await this.tasksRepository.create({
            ...taskData,
            boardId,
        });
        console.log(10);
        this.tasksRepository.save(task)
        console.log(20);
        return task;
    };

    /**
     * Updates the data of the task with the specified ID
     * @param {string} id ID task
     * @param {string} boardId ID board
     * @param {TaskT} newTask Data to update
     * @returns {Promise<boolean>} Task updated successfully
     */
    updateTask: UpdateTaskT = async (id, boardId, newTask) => Boolean(this.tasksRepository.save({...(await this.getByIdAndBoardId(id, boardId)), ...newTask}));

    /**
     * Deletes the task with the specified ID
     * @param {string} id ID task to delete
     * @param {string} boardId ID board to delete
     * @returns {Promise<boolean>} Task deleted successfully
     */
    deleteTask: DeleteTaskT = (id, boardId) => this.tasksRepository.delete({ id: id, boardId: boardId });

};