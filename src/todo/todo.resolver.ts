import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { Param } from '@nestjs/common';

@Resolver()
export class TodoResolver {

    constructor(
        private readonly todoService:TodoService
    ) {}

    @Query( () => [Todo], { name: 'AllTodos' })
    findAll(): Todo[] {
        return this.todoService.findAll();
    }

    @Query( () => Todo, { name: 'Todo'})
    findOne(@Args('id', { type: () => Int }) id: number ) {
        return this.todoService.findOne( id )
    }

    createTodo(){

    }

    updateTodo(){

    }

    deleteTodo(){

    }
}
