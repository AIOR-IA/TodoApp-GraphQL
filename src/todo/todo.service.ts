import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/inputs/todo.entity';
import { CreateTodoInput } from './dto/create-todo.dto';
import { UpdateTodoInput } from './dto/update-todo.dto';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {
    private todos: Todo[] = [
        {
            id: 1,
            description:'Piedra del alma',
            done: false,
        },
        {
            id: 2,
            description:'Piedra del Espacio',
            done: true,
        },{
            id: 3,
            description:'Piedra del Poder',
            done: false,
        },
        
    ]

    get totalTodos() {
        return this.todos.length;
    }

    get completedTodos() {
        return this.todos.filter( todo => todo.done ).length;
    }

    get pendingTodos() {
        return this.todos.filter( todo => !todo.done ).length;
    }
    findAll( statusArgs:StatusArgs):Todo[] {
        const {  isFinished } = statusArgs;
        if( isFinished !== undefined  ) {
            return this.todos.filter( todo => todo.done === isFinished);
        }
        return this.todos;
    }

    findOne( id: number ):Todo {
        const todo = this.todos.find( todo => todo.id === id);
        
        if(!todo) throw new NotFoundException(`Todo with id ${id} not found`);

        return todo;
    }

    create( createTodoInput: CreateTodoInput ):Todo {
        const todo = new Todo();
        todo.id = this.todos.length + 1;
        todo.description = createTodoInput.description;
        this.todos.push(todo);
        return todo;
    }

    update( updateTodoInput:UpdateTodoInput) {
        const { id, description, done } = updateTodoInput;
        const todoToUpdate = this.findOne( id );

        if( description ) todoToUpdate.description = description;
        if( done !== undefined ) todoToUpdate.done = done;

        this.todos = this.todos.map( todo => {
            if( todo.id === id ) {
                return todoToUpdate;
            }
            return todo;
        })

        return todoToUpdate;
    }
    
    delete(id: number):Todo {
        const todo = this.findOne( id );

        this.todos = this.todos.filter( todo => todo.id !== id);

        return todo;

    }
}
